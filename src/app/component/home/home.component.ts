import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoragesService} from '../../service/storages.service';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';
import {Subscription} from 'rxjs';
import {Storage} from '../../entity/storage';
import {BalanceService} from '../../service/balance.service';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    static readonly PATH = '';

    private subscriptions: Subscription[] = [];

    private storages: Storage[];
    private userCategories: UserCategory[];

    constructor(
        private readonly storagesService: StoragesService,
        private readonly userCategoriesService: UserCategoriesService,
        private readonly balanceService: BalanceService,
        private readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
        this.subscriptions.push(this.storagesService.storages$.subscribe(storages => {
            this.storages = storages;
        }));
        this.subscriptions.push(this.userCategoriesService.userCategories$.subscribe(userCategories => {
            this.userCategories = userCategories;
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
