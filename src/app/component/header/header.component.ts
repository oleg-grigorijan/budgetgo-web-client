import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router, private authenticationService: BasicAuthenticationService) {
    }

    ngOnInit() {
    }

    onSignOutClick(): void {
        this.authenticationService.removeAuthentication();
        this.router.navigate(['/welcome']);
    }
}
