import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';
import {StoragesService} from '../../service/storages.service';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {HomeViewComponent} from '../home-view/home-view.component';

@Component({
    selector: 'app-first-storage-creation-view',
    templateUrl: './first-storage-creation-view.component.html',
    styleUrls: []
})
export class FirstStorageCreationViewComponent implements OnInit {

    static readonly PATH = 'storages/create-first';

    isReady = false;

    constructor(
        private readonly router: Router,
        private readonly storagesService: StoragesService,
        readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
        this.storagesService.storages$.pipe(filter(s => s !== null)).subscribe(storages => {
            if (storages.length > 0) {
                this.router.navigate([HomeViewComponent.PATH]);
            } else {
                this.isReady = true;
            }
        });
    }
}
