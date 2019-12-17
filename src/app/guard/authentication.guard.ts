import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import {WelcomeViewComponent} from '../componen/welcome-view/welcome-view.component';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: BasicAuthenticationService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authenticationService.isAuthenticated) {
            this.router.navigate([WelcomeViewComponent.PATH], {queryParams: {returnUrl: state.url}});
        }
        return this.authenticationService.isAuthenticated;
    }

}
