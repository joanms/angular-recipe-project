import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// {providedIn: 'root'} is an alternative to adding it to providers in the app module
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient) {}
}