import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ReplaySubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BasicAuthenticationService {

    private readonly apiUrl = environment.apiBaseUrl + '/login';
    private readonly options = {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    private readonly localStorageKey = 'token';
    private login: string;
    private password: string;

    private readonly authenticationSubject: Subject<boolean> = new ReplaySubject<boolean>(1);
    readonly authentication$ = this.authenticationSubject.asObservable();

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
        if (this.isAuthenticated) {
            const credentials = window.atob(this._token).split(':');
            this.password = credentials.pop();
            this.login = credentials.pop();
        }
        this.authenticationSubject.next(this.isAuthenticated);
    }

    private updateToken(): void {
        this._token = window.btoa(this.login + ':' + this.password);
        localStorage.setItem(this.localStorageKey, this._token);
    }

    authenticate(login: string, password: string): Promise<void> {
        const body = new HttpParams().set('username', login).set('password', password);
        return this.http.post<void>(this.apiUrl, body, this.options).pipe(tap(() => {
            this.login = login;
            this.password = password;
            this.updateToken();
            this._isAuthenticated = true;
            this.authenticationSubject.next(true);
        })).toPromise();
    }

    updateLogin(login: string) {
        if (!this.login) {
            throw new Error('Updating login without authenticated user');
        }
        this.login = login;
        this.updateToken();
    }

    updatePassword(password: string) {
        if (!this.password) {
            throw new Error('Updating password without authenticated user');
        }
        this.password = password;
        this.updateToken();
    }

    removeAuthentication(): void {
        this._isAuthenticated = false;
        this.authenticationSubject.next(false);
        this.login = null;
        this.password = null;
        this._token = null;
        localStorage.removeItem(this.localStorageKey);
    }
}
