import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicAuthenticationService} from './basic-authentication.service';
import {environment} from '../../environments/environment';
import {ReplaySubject, Subject} from 'rxjs';
import {Storage} from '../entity/storage';
import {tap} from 'rxjs/operators';
import {StorageSettings} from '../entity/storage-settings';
import {OperationsService} from './operations.service';

@Injectable({providedIn: 'root'})
export class StoragesService {

    private readonly apiUrl = environment.apiBaseUrl + '/storages';
    private storages: Storage[];

    private storagesSubject: Subject<Storage[]> = new ReplaySubject<Storage[]>(1);
    storages$ = this.storagesSubject.asObservable();

    constructor(
        private readonly http: HttpClient,
        private readonly authenticationService: BasicAuthenticationService,
        private readonly operationsService: OperationsService
    ) {
        authenticationService.authentication$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.fetch();
            } else {
                this.storages = null;
                this.storagesSubject.next(this.storages);
            }
        });

        operationsService.operationCreation$.subscribe(operation => {
            const storage = this.storages.find(s => s.id === operation.storageId);
            storage.balance = storage.balance + operation.moneyDelta;
            this.storagesSubject.next(this.storages);
        });
        operationsService.operationPatch$.subscribe(next => {
            if (next.operation.storageId !== next.patchedOperation.storageId) {
                throw new Error('Storage was changed while patching operation');
            }
            if (next.operation.moneyDelta !== next.patchedOperation.moneyDelta) {
                const storage = this.storages.find(s => s.id === next.operation.storageId);
                storage.balance = storage.balance - next.operation.moneyDelta + next.patchedOperation.moneyDelta;
                this.storagesSubject.next(this.storages);
            }
        });
        operationsService.operationDelete$.subscribe(operation => {
            const storage = this.storages.find(s => s.id === operation.storageId);
            storage.balance = storage.balance - operation.moneyDelta;
            this.storagesSubject.next(this.storages);
        });
    }

    private fetch(): void {
        this.http.get<Storage[]>(this.apiUrl).subscribe(storages => {
            this.storages = storages;
            this.storagesSubject.next(storages);
        });
    }

    create(source): Promise<Storage> {
        return this.http.post<Storage>(this.apiUrl, source).pipe(tap(storage => {
                this.storages.push(storage);
                this.storagesSubject.next(this.storages);
            }
        )).toPromise();
    }

    patch(id: number, patches): Promise<Storage> {
        return this.http.patch<Storage>(this.apiUrl + '/' + id, patches).pipe(tap(storage => {
            this.storages = this.storages.map(s => {
                if (s.id === id) {
                    return storage;
                } else {
                    return s;
                }
            });
            this.storagesSubject.next(this.storages);
        })).toPromise();
    }

    patchSettings(id: number, patches): Promise<StorageSettings> {
        return this.http.patch<StorageSettings>(this.apiUrl + '/' + id + '/settings', patches).pipe(tap(settings => {
            this.storages = this.storages.map(s => {
                if (s.id === id) {
                    s.settings = settings;
                }
                return s;
            });
            this.storagesSubject.next(this.storages);
        })).toPromise();
    }

    delete(id: number): Promise<void> {
        return this.http.delete<void>(this.apiUrl + '/' + id + '/settings').pipe(tap(() => {
            this.storages = this.storages.filter(s => s.id !== id);
            this.storagesSubject.next(this.storages);
        })).toPromise();
    }
}
