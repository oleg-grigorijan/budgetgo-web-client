import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';
import {StoragesService} from '../../service/storages.service';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {HomeViewComponent} from '../home-view/home-view.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-first-storage-creation-view',
    templateUrl: './first-storage-creation-view.component.html',
    styleUrls: []
})
export class FirstStorageCreationViewComponent implements OnInit, OnDestroy {

    static readonly PATH = 'storages/create-first';

    private subscription: Subscription;

    isReady = false;

    constructor(
        private readonly router: Router,
        private readonly storagesService: StoragesService,
        readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
        this.subscription = this.storagesService.storages$.pipe(filter(s => s !== null)).subscribe(storages => {
            if (storages.length > 0) {
                this.router.navigate([HomeViewComponent.PATH]);
            } else {
                this.isReady = true;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
