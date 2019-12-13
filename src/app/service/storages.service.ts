import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicAuthenticationService} from './basic-authentication.service';
import {environment} from '../../environments/environment';
import {ReplaySubject, Subject} from 'rxjs';
import {Storage} from '../entity/storage';
import {tap} from 'rxjs/operators';
import {StorageSettings} from '../entity/storage-settings';

@Injectable({providedIn: 'root'})
export class StoragesService {

    private readonly apiUrl = environment.apiBaseUrl + '/storages';
    private storages: Storage[];

    private storagesSubject: Subject<Storage[]> = new ReplaySubject<Storage[]>(1);
    storages$ = this.storagesSubject.asObservable();

    private invitationsFirst = (s1, s2): number => {
        if (s1.settings.isInvitation === s2.settings.isInvitation) {
            return 0;
        } else if (s1.settings.isInvitation && !s2.settings.isInvitation) {
            return -1;
        } else {
            return 1;
        }
    }

    constructor(private readonly http: HttpClient, private readonly authenticationService: BasicAuthenticationService) {
        authenticationService.authentication$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.fetch();
            } else {
                this.storages = null;
                this.storagesSubject.next(this.storages);
            }
        });
    }

    private fetch(): void {
        this.http.get<Storage[]>(this.apiUrl).subscribe(storages => {
            this.storages = storages.sort(this.invitationsFirst);
            this.storagesSubject.next(storages);
        });
    }

    create(source): Promise<Storage> {
        return this.http.post<Storage>(this.apiUrl, source).pipe(tap(storage => {
                this.storages.push(storage);
                this.storages = this.storages.sort(this.invitationsFirst);
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
                    const storage = Object.assign({}, s);
                    storage.settings = settings;
                    return storage;
                } else {
                    return s;
                }
            }).sort(this.invitationsFirst);
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
