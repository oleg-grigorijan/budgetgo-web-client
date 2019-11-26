import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import {WelcomeComponent} from '../component/welcome/welcome.component';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: BasicAuthenticationService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authenticationService.isAuthenticated) {
            this.router.navigate([WelcomeComponent.PATH], {queryParams: {returnUrl: state.url}});
        }
        return this.authenticationService.isAuthenticated;
    }

}
