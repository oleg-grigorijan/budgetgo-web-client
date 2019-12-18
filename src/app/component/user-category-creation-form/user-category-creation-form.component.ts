import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-user-category-creation-form',
    templateUrl: './user-category-creation-form.component.html',
    styleUrls: []
})
export class UserCategoryCreationFormComponent implements OnInit, OnDestroy {

    form: FormGroup;

    userCategories: UserCategory[];
    private subscription: Subscription;

    wasSubmitted = false;
    isLoading = false;
    success = '';

    constructor(private readonly formBuilder: FormBuilder, private readonly userCategoriesService: UserCategoriesService) {
    }

    ngOnInit() {
        this.subscription = this.userCategoriesService.userCategories$.subscribe(userCategories => {
            this.userCategories = userCategories;
        });

        this.form = this.formBuilder.group({
            isUsedForIncomes: [true],
            isUsedForOutcomes: [true],
            categoryName: ['', [Validators.required, Validators.maxLength(255), this.uniqueNameValidator()]]
        });

        this.form.valueChanges.subscribe(() => {
            this.success = '';
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onCreateClick() {
        this.wasSubmitted = true;
        this.success = '';

        if (this.form.invalid) {
            return;
        }

        this.userCategoriesService.createByCategoryName(this.form.controls.categoryName.value, this.form.value).subscribe(() => {
            this.wasSubmitted = false;
            this.form.controls.categoryName.patchValue('');
            this.success = 'Created';
        });
    }

    uniqueNameValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const userCategory = this.userCategories.find(uc => uc.category.name === control.value);
            return userCategory ? {nonUniqueName: {value: control.value}} : null;
        };
    }
}
