import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/Operators';
import { throwError, Subject } from 'rxjs';

import { User } from './user.model';

// The interface code is not essential, but it's a good idea in Angular to define the types of data you're working with
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    // The question mark makes it optional, because sign up doesn't use it but login does
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAai_GCKmLGBP75ysGondnpOg9jc6DyNUw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAai_GCKmLGBP75ysGondnpOg9jc6DyNUw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            );
        })
);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
    ) {
        // JavaScript fetches the time in milliseconds, so it has to be multiplied by 1000 to get the seconds
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkonwn error has occurred.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'There is already an account with this email address';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no account with that email address';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'That password is incorrect';
                break;
        }
        return throwError(errorMessage);
    }
}
