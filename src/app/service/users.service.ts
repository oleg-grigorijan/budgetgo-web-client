import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../entity/user';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {

    private readonly apiUrl = environment.apiBaseUrl + '/users';

    constructor(private readonly http: HttpClient) {
    }

    create(source: { login: string, password: string }): Observable<User> {
        return this.http.post<User>(this.apiUrl, source);
    }

    getByLogin(login: string): Observable<User> {
        return this.http.get<User>(this.apiUrl, {params: new HttpParams().set('login', login)});
    }

    getByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.apiUrl, {params: new HttpParams().set('email', email)});
    }
}
