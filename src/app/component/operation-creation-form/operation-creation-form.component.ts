import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OperationsService} from '../../service/operations.service';
import {Storage} from '../../entity/storage';
import {UserCategory} from '../../entity/user-category';
import {Operation} from '../../entity/operation';

@Component({
    selector: 'app-operation-creation-form',
    templateUrl: './operation-creation-form.component.html',
    styleUrls: []
})
export class OperationCreationFormComponent implements OnInit {

    private operationType = OperationType;

    @Input() singleStorageMode: boolean;
    @Input() storage: Storage;
    @Input() storages: Storage[];
    @Input() userCategories: UserCategory[];

    @Output() operationCreation = new EventEmitter<Operation>();

    private userCategoriesOptions: UserCategory[];

    private form: FormGroup;

    private wasSubmitted = false;
    private isLoading = false;
    private success = '';

    constructor(private readonly formBuilder: FormBuilder, private readonly operationsService: OperationsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            storageId: [],
            type: [],
            moneyAmountFloat: [null],
            moneyDelta: [0],
            categoryId: [],
            description: ['', Validators.maxLength(255)]
        });

        this.form.valueChanges.subscribe(() => {
            this.success = '';
        });

        if (this.singleStorageMode) {
            this.form.controls.storageId.patchValue(this.storage.id);
        } else {
            this.form.controls.storageId.patchValue(this.storages[0].id);
            this.storage = this.storages[0];

            this.form.controls.storageId.valueChanges.subscribe(newValue => {
                this.storage = this.storages.find(s => s.id === Number(newValue));
            });
        }

        this.form.controls.type.valueChanges.subscribe(newValue => {
            if (newValue === OperationType.INCOME) {
                this.userCategoriesOptions = this.userCategories.filter(uc => uc.isUsedForIncomes);
            } else {
                this.userCategoriesOptions = this.userCategories.filter(uc => uc.isUsedForOutcomes);
            }
            this.form.controls.categoryId.patchValue(this.userCategoriesOptions[0].category.id);
        });

        this.form.controls.type.patchValue(OperationType.INCOME);
    }

    onCreateClick() {
        this.success = '';
        this.wasSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;

        let sign = 1;
        if (this.form.controls.type.value === OperationType.OUTCOME) {
            sign = -1;
        }
        this.form.controls.moneyDelta.patchValue(sign * this.form.controls.moneyAmountFloat.value * 100);

        this.operationsService.create(this.storage.id, this.form.value).subscribe(operation => {
            this.operationCreation.emit(operation);
            this.success = 'Created';
            this.isLoading = false;
        });
    }
}

enum OperationType {
    INCOME, OUTCOME
}
