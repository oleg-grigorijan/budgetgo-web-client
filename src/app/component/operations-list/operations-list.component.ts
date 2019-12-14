import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Operation} from '../../entity/operation';
import {OperationsService} from '../../service/operations.service';
import {UserCategoriesService} from '../../service/user-categories.service';
import {Subscription} from 'rxjs';
import {UserCategory} from '../../entity/user-category';

@Component({
    selector: 'app-operations-list',
    templateUrl: './operations-list.component.html',
    styleUrls: []
})
export class OperationsListComponent implements OnInit, OnDestroy {

    @Input() operations: Operation[];

    private operationForEdit: Operation;

    private userCategories: UserCategory[];
    private subscription: Subscription;

    constructor(private readonly operationsService: OperationsService, private readonly userCategoriesService: UserCategoriesService) {
    }

    ngOnInit() {
        this.subscription = this.userCategoriesService.userCategories$.subscribe(userCategories => {
            this.userCategories = userCategories;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onRemoveClick(operation: Operation) {
        this.operationsService.delete(operation).subscribe(() => {
            this.operations = this.operations.filter(o => o.id !== operation.id);
        });
    }

    onEditClick(operation: Operation) {
        this.operationForEdit = operation;
    }

    onEditFormCancel() {
        this.operationForEdit = null;
    }

    onEditFormSave(patchedOperation: Operation) {
        this.operations = this.operations.map(operation => {
            if (operation.id === patchedOperation.id) {
                return patchedOperation;
            } else {
                return operation;
            }
        });
        this.operationForEdit = null;
    }
}
