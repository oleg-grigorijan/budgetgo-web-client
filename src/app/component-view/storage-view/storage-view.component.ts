import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {StoragesService} from '../../service/storages.service';
import {Subscription} from 'rxjs';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';
import {UserStorageRoleAuthoritiesService} from '../../service/user-storage-role-authorities.service';
import {OperationsService} from '../../service/operations.service';
import {Operation} from '../../entity/operation';
import {environment} from '../../../environments/environment';
import {HomeViewComponent} from '../home-view/home-view.component';
import {NotFoundViewComponent} from '../not-found-view/not-found-view.component';

@Component({
    selector: 'app-storage-view',
    templateUrl: './storage-view.component.html',
    styleUrls: []
})
export class StorageViewComponent implements OnInit, OnDestroy {

    static readonly PATH = 'storages/:id';

    private storage: Storage;
    private userCategories: UserCategory[];
    private operations: Operation[];
    private subscriptions: Subscription[] = [];
    expandNewOperationByDefault = window.innerWidth >= environment.mediaBreakpoints.medium;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly storagesService: StoragesService,
        private readonly userCategoriesService: UserCategoriesService,
        private readonly operationsService: OperationsService,
        private readonly authoritiesService: UserStorageRoleAuthoritiesService
    ) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.subscriptions.push(this.storagesService.storages$.subscribe(storages => {
            if (!storages) {
                this.storage = null;
                this.operations = null;
            } else {
                this.storage = storages.find(s => s.id === id);
                if (this.storage) {
                    this.operationsService.getByStorageId(this.storage.id).subscribe(operations => {
                        this.operations = operations;
                    });
                } else {
                    this.router.navigate([NotFoundViewComponent.PATH]);
                }
            }
        }));

        this.subscriptions.push(this.userCategoriesService.userCategories$.subscribe(userCategories => {
            this.userCategories = userCategories;
        }));

        this.subscriptions.push(this.operationsService.operationCreation$.subscribe(operation => {
            if (this.storage && operation.storageId === this.storage.id) {
                this.operations.push(operation);
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onUnsubscription() {
        this.router.navigate([HomeViewComponent.PATH]);
    }
}
