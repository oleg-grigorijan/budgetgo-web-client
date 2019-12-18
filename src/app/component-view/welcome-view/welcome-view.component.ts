import {Component, OnInit} from '@angular/core';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrenciesService} from '../../service/currencies.service';
import {HomeViewComponent} from '../home-view/home-view.component';

@Component({
    selector: 'app-welcome-view',
    templateUrl: './welcome-view.component.html'
})
export class WelcomeViewComponent implements OnInit {

    static readonly PATH = 'welcome';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly authenticationService: BasicAuthenticationService,
        readonly currenciesService: CurrenciesService
    ) {
    }

    ngOnInit() {
        if (this.authenticationService.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

    onFormSuccessReturning() {
        const returnUrl = this.route.snapshot.queryParams.returnUrl || HomeViewComponent.PATH;
        this.router.navigate([returnUrl]);
    }
}
