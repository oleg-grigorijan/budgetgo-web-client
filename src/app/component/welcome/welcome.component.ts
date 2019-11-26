import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    static readonly PATH = 'welcome';

    constructor(private router: Router, private authenticationService: BasicAuthenticationService) {
    }

    ngOnInit() {
        if (this.authenticationService.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

}
