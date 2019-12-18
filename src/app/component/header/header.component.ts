import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {Router} from '@angular/router';
import {UserDetailsService} from '../../service/user-details.service';
import {WelcomeViewComponent} from '../../component-view/welcome-view/welcome-view.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private readonly router: Router,
        readonly authenticationService: BasicAuthenticationService,
        readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
    }

    onSignOutClick(): void {
        this.authenticationService.removeAuthentication();
        this.router.navigate([WelcomeViewComponent.PATH]);
    }
}
