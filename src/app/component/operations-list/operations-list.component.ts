import {Component, Input, OnInit} from '@angular/core';
import {Operation} from '../../entity/operation';
import {OperationsService} from '../../service/operations.service';

@Component({
    selector: 'app-operations-list',
    templateUrl: './operations-list.component.html',
    styleUrls: []
})
export class OperationsListComponent implements OnInit {

    @Input() operations: Operation[];

    constructor(private readonly operationsService: OperationsService) {
    }

    ngOnInit() {
    }

    onRemoveClick(operation: Operation) {
        this.operationsService.delete(operation).subscribe(() => {
            this.operations = this.operations.filter(o => o.id !== operation.id);
        });
    }
}
