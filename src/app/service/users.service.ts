import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../entity/user';

@Injectable({providedIn: 'root'})
export class UsersService {

    private readonly apiUrl = environment.apiBaseUrl + '/users';

    constructor(private readonly http: HttpClient) {
    }

    getByLogin(login: string): Promise<User> {
        return this.http.get<User>(this.apiUrl, {params: new HttpParams().set('login', login)}).toPromise();
    }
}