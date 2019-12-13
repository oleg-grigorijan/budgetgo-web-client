import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {Operation} from '../../entity/operation';
import {Observable} from 'rxjs';
import {OperationsService} from '../../service/operations.service';

@Component({
    selector: 'app-storage-operations-list',
    templateUrl: './storage-operations-list.component.html',
    styleUrls: []
})
export class StorageOperationsListComponent implements OnInit {

    @Input() storage: Storage;
    @Input() operations: Operation[];
    @Input() operationCreation: Observable<Operation>;

    constructor(private readonly operationsService: OperationsService) {
    }

    ngOnInit() {
        if (this.operationCreation) {
            this.operationCreation.subscribe(operation => {
                this.operations.push(operation);
            });
        }
    }

    onRemoveClick(operation: Operation) {
        this.operationsService.delete(this.storage.id, operation.id).subscribe(() => {
            this.operations = this.operations.filter(o => o.id !== operation.id);
        });
    }
}
