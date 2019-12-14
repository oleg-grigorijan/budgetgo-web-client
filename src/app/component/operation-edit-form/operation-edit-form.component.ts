import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OperationsService} from '../../service/operations.service';
import {UserCategory} from '../../entity/user-category';
import {Operation} from '../../entity/operation';

@Component({
    selector: 'app-operation-edit-form',
    templateUrl: './operation-edit-form.component.html',
    styleUrls: []
})
export class OperationEditFormComponent implements OnInit {

    private operationType = OperationType;

    @Input() operation: Operation;
    @Input() userCategories: UserCategory[];

    @Output() cancelReturning = new EventEmitter<void>();
    @Output() saveReturning = new EventEmitter<Operation>();

    private form: FormGroup;

    private userCategoriesOptions: UserCategory[];

    private isLoading = false;

    constructor(private readonly formBuilder: FormBuilder, private readonly operationsService: OperationsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            type: [''],
            moneyAmountFloat: [''],
            moneyDelta: [''],
            categoryId: [''],
            description: ['', Validators.maxLength(255)]
        });

        this.form.controls.type.valueChanges.subscribe(newValue => {
            if (newValue === OperationType.INCOME) {
                this.userCategoriesOptions = this.userCategories.filter(uc => uc.isUsedForIncomes);
            } else {
                this.userCategoriesOptions = this.userCategories.filter(uc => uc.isUsedForOutcomes);
            }
            this.form.controls.categoryId.patchValue(this.userCategoriesOptions[0].category.id);
        });

        this.form.patchValue(this.operation);
        if (this.operation.moneyDelta < 0) {
            this.form.controls.type.patchValue(OperationType.OUTCOME);
        } else {
            this.form.controls.type.patchValue(OperationType.INCOME);
        }
        this.form.controls.categoryId.patchValue(this.operation.category.id);
        this.form.controls.moneyAmountFloat.patchValue(Math.abs(this.operation.moneyDelta) / 100);
    }

    onSaveClick() {
        this.isLoading = true;

        let sign = 1;
        if (this.form.controls.type.value === OperationType.OUTCOME) {
            sign = -1;
        }
        this.form.controls.moneyDelta.patchValue(sign * this.form.controls.moneyAmountFloat.value * 100);

        this.operationsService.patch(this.operation, this.form.value).subscribe(operation => {
            this.isLoading = false;
            this.saveReturning.emit(operation);
        });
    }

    onCancelClick() {
        this.cancelReturning.emit();
    }
}

enum OperationType {
    INCOME = 'INCOME', OUTCOME = 'OUTCOME'
}
