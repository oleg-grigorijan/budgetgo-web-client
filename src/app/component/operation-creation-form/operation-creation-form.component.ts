import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OperationsService} from '../../service/operations.service';
import {Storage} from '../../entity/storage';
import {UserCategory} from '../../entity/user-category';

@Component({
    selector: 'app-operation-creation-form',
    templateUrl: './operation-creation-form.component.html',
    styleUrls: []
})
export class OperationCreationFormComponent implements OnInit {

    operationType = OperationType;

    @Input() singleStorageMode: boolean;
    @Input() storage: Storage;
    @Input() storages: Storage[];
    @Input() userCategories: UserCategory[];

    form: FormGroup;

    userCategoriesOptions: UserCategory[];

    wasSubmitted = false;
    isLoading = false;
    isSuccess = true;

    constructor(private readonly formBuilder: FormBuilder, private readonly operationsService: OperationsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            storageId: [],
            type: [],
            moneyAmountFloat: [null, [Validators.max(9e16)]],
            moneyDelta: [0],
            categoryId: [],
            description: ['', [Validators.maxLength(255)]]
        });

        this.form.valueChanges.subscribe(() => {
            this.isSuccess = false;
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
        this.wasSubmitted = true;
        this.isLoading = true;

        if (this.form.invalid) {
            this.isLoading = false;
            return;

        }

        let sign = 1;
        if (this.form.controls.type.value === OperationType.OUTCOME) {
            sign = -1;
        }
        this.form.controls.moneyDelta.patchValue(sign * this.form.controls.moneyAmountFloat.value * 100);

        this.operationsService.create(this.storage.id, this.form.value).subscribe(() => {
            this.isSuccess = true;
            this.isLoading = false;
        });
    }
}

enum OperationType {
    INCOME = 'INCOME', OUTCOME = 'OUTCOME'
}
