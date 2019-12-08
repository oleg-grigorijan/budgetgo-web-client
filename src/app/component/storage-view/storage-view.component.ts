import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {ActivatedRoute} from '@angular/router';
import {StoragesService} from '../../service/storages.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-storage-view',
    templateUrl: './storage-view.component.html',
    styleUrls: []
})
export class StorageViewComponent implements OnInit, OnDestroy {

    static readonly PATH = 'storages/:id';

    private storage: Storage;
    private subscription: Subscription;

    constructor(private readonly route: ActivatedRoute, private readonly storagesService: StoragesService) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.subscription = this.storagesService.storages$.subscribe(storages => {
            if (!storages) {
                this.storage = null;
            } else {
                this.storage = storages.find(s => s.id === id);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
