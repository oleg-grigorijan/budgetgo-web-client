import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserDetails} from '../entity/user-details';
import {BasicAuthenticationService} from './basic-authentication.service';

@Injectable({providedIn: 'root'})
export class UserDetailsService {

    private apiUrl = environment.apiBaseUrl + '/me';

    private _userDetails: UserDetails | null;
    get userDetails(): UserDetails | null {
        return this._userDetails;
    }

    private _isLoading = false;
    get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private http: HttpClient, private authenticationService: BasicAuthenticationService) {
        if (authenticationService.isAuthenticated) {
            this.fetch();
        }
        authenticationService.onSignIn.subscribe(() => {
            this.fetch();
        });
        authenticationService.onSignOut.subscribe(() => {
            this._userDetails = null;
        });
    }

    fetch() {
        this._isLoading = true;
        this.http.get<UserDetails>(this.apiUrl).subscribe((userDetails) => {
                this._userDetails = userDetails;
                this._isLoading = false;
            },
            () => {
                this._isLoading = false;
            });
    }
}
