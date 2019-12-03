import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {Router} from '@angular/router';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private authenticationService: BasicAuthenticationService,
        private userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
    }

    onSignOutClick(): void {
        this.authenticationService.removeAuthentication();
        this.router.navigate(['/welcome']);
    }
}
