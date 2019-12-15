import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserDetails} from '../entity/user-details';
import {BasicAuthenticationService} from './basic-authentication.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserDetailsService {

    private readonly apiUrl = environment.apiBaseUrl + '/me';

    private readonly userDetailsSubject: Subject<UserDetails> = new ReplaySubject<UserDetails>(1);
    readonly userDetails$ = this.userDetailsSubject.asObservable();

    constructor(private http: HttpClient, private authenticationService: BasicAuthenticationService) {
        authenticationService.authentication$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.fetch();
            } else {
                this.userDetailsSubject.next(null);
            }
        });
    }

    private fetch(): void {
        this.http.get<UserDetails>(this.apiUrl).subscribe((userDetails) => {
            this.userDetailsSubject.next(userDetails);
        });
    }

    patch(patches): Observable<UserDetails> {
        return this.http.patch<UserDetails>(this.apiUrl, patches).pipe(tap((patchedUserDetails) => {
            if (patches.login) {
                this.authenticationService.updateLogin(patches.login);
            }
            if (patches.password) {
                this.authenticationService.updatePassword(patches.password);
            }
            this.userDetailsSubject.next(patchedUserDetails);
        }));
    }
}
