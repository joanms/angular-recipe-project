import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';

// The interface code is not essential, but it's a good idea in Angular to define the types of data you're working with
interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
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
            catchError(errorRes => {
                let errorMessage = 'An unkonwn error has occurred.';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                            errorMessage = 'There is already an account with this email address';
                }
                return throwError(errorMessage);
            })
        );
    }
}
