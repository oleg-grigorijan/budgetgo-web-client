import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Operation} from '../entity/operation';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OperationsService {

    private readonly operationCreationSubject = new Subject<Operation>();

    private apiUrl(storageId: number): string {
        return environment.apiBaseUrl + '/storages/' + storageId + '/operations';
    }

    constructor(private readonly http: HttpClient) {
    }

    getByStorageId(storageId: number): Observable<Operation[]> {
        return this.http.get<Operation[]>(this.apiUrl(storageId));
    }

    create(storageId: number, source): Observable<Operation> {
        return this.http.post<Operation>(this.apiUrl(storageId), source).pipe(tap(operation => {
            this.operationCreationSubject.next(operation);
        }));
    }

    patch(storageId: number, operationId: number, patches): Observable<Operation> {
        return this.http.patch<Operation>(this.apiUrl(storageId) + '/' + operationId, patches);
    }

    delete(storageId: number, operationId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl(storageId) + '/' + operationId);
    }
}
