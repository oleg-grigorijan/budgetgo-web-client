import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class BasicAuthenticationService {

    private apiUrl = environment.apiBaseUrl + '/login';
    private options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    private localStorageKey = 'token';

    private _isAuthenticated: boolean;
    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    private _token: string;
    get token(): string {
        return this._token;
    }

    constructor(private http: HttpClient) {
        this._token = localStorage.getItem(this.localStorageKey);
        this._isAuthenticated = this._token != null;
    }

    authenticate(login: string, password: string, callback: () => void): void {
        const body = new HttpParams().set('username', login).set('password', password);
        const observable = this.http.post(this.apiUrl, body, this.options);
        observable.subscribe(
            () => {
                this.setAuthentication(login, password);
                callback();
            },
            error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    callback();
                }
            }
        );
    }

    private setAuthentication(login: string, password: string): void {
        this._isAuthenticated = true;
        this._token = window.btoa(login + ':' + password);
        localStorage.setItem(this.localStorageKey, this._token);
    }

    removeAuthentication(): void {
        this._isAuthenticated = false;
        this._token = null;
        localStorage.removeItem(this.localStorageKey);
    }

}
