import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Operation} from '../entity/operation';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OperationsService {

    private readonly operationCreationSubject = new Subject<Operation>();
    operationCreation$ = this.operationCreationSubject.asObservable();

    private readonly operationPatchSubject = new Subject<{ operation: Operation, patchedOperation: Operation }>();
    operationPatch$ = this.operationPatchSubject.asObservable();

    private readonly operationDeleteSubject = new Subject<Operation>();
    operationDelete$ = this.operationDeleteSubject.asObservable();

    private apiUrl(storageId: number): string {
        return environment.apiBaseUrl + '/storages/' + storageId + '/operations';
    }

    constructor(private readonly http: HttpClient) {
    }

    getByStorageId(storageId: number): Observable<Operation[]> {
        return this.http.get<Operation[]>(this.apiUrl(storageId)).pipe(map(operations => operations.map(operation => {
            operation.storageId = storageId;
            return operation;
        })));
    }

    create(storageId: number, source): Observable<Operation> {
        return this.http.post<Operation>(this.apiUrl(storageId), source).pipe(map(operation => {
            operation.storageId = storageId;
            return operation;
        }), tap(operation => {
            this.operationCreationSubject.next(operation);
        }));
    }

    patch(operation: Operation, patches): Observable<Operation> {
        return this.http.patch<Operation>(this.apiUrl(operation.storageId) + '/' + operation.id, patches).pipe(map(patchedOperation => {
            patchedOperation.storageId = operation.storageId;
            return patchedOperation;
        }), tap(patchedOperation => {
            this.operationPatchSubject.next({operation, patchedOperation});
        }));
    }

    delete(operation: Operation): Observable<void> {
        return this.http.delete<void>(this.apiUrl(operation.storageId) + '/' + operation.id).pipe(tap(() => {
            this.operationDeleteSubject.next(operation);
        }));
    }
}
