import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageUser} from '../entity/storage-user';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class StorageUsersService {

    private apiUrl(storageId: number): string {
        return environment.apiBaseUrl + '/storages/' + storageId + '/users';
    }

    constructor(private readonly http: HttpClient) {
    }

    getByStorageId(id: number): Observable<StorageUser[]> {
        return this.http.get<StorageUser[]>(this.apiUrl(id));
    }

    patch(storageId: number, userId: number, patches): Observable<StorageUser> {
        return this.http.patch<StorageUser>(this.apiUrl(storageId) + '/' + userId, patches);
    }

    create(storageId: number, source): Observable<StorageUser> {
        return this.http.post<StorageUser>(this.apiUrl(storageId), source);
    }

    delete(storageId: number, userId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl(storageId) + '/' + userId);
    }
}
