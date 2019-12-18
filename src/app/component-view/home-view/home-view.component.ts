import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoragesService} from '../../service/storages.service';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';
import {Subscription} from 'rxjs';
import {Storage} from '../../entity/storage';
import {BalanceService} from '../../service/balance.service';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit, OnDestroy {

    static readonly PATH = '';

    private subscriptions: Subscription[] = [];

    storages: Storage[];
    userCategories: UserCategory[];

    constructor(
        private readonly storagesService: StoragesService,
        private readonly userCategoriesService: UserCategoriesService,
        readonly balanceService: BalanceService,
        readonly userDetailsService: UserDetailsService
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
