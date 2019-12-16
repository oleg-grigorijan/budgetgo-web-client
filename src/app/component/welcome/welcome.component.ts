import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {CurrenciesService} from '../../service/currencies.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    static readonly PATH = 'welcome';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authenticationService: BasicAuthenticationService,
        private readonly currenciesService: CurrenciesService
    ) {
    }

    ngOnInit() {
        if (this.authenticationService.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

    onFormSuccessReturning() {
        const returnUrl = this.route.snapshot.queryParams.returnUrl || HomeComponent.PATH;
        this.router.navigate([returnUrl]);
    }
}
