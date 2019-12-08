import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageUser} from '../entity/storage-user';

@Injectable({providedIn: 'root'})
export class StorageUsersService {

    private apiUrl(storageId: number): string {
        return environment.apiBaseUrl + '/storages/' + storageId + '/users';
    }

    constructor(private readonly http: HttpClient) {
    }

    getByStorageId(id: number): Promise<StorageUser[]> {
        return this.http.get<StorageUser[]>(this.apiUrl(id)).toPromise();
    }

    patch(storageId: number, userId: number, patches): Promise<StorageUser> {
        return this.http.patch<StorageUser>(this.apiUrl(storageId) + '/' + userId, patches).toPromise();
    }

    create(storageId: number, source): Promise<StorageUser> {
        return this.http.post<StorageUser>(this.apiUrl(storageId), source).toPromise();
    }

    delete(storageId: number, userId: number): Promise<void> {
        return this.http.delete<void>(this.apiUrl(storageId) + '/' + userId).toPromise();
    }
}
