import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-user-category-creation-form',
    templateUrl: './user-category-creation-form.component.html',
    styleUrls: []
})
export class UserCategoryCreationFormComponent implements OnInit, OnDestroy {

    private isLoading = false;
    private categoryName = '';
    private error = '';
    private userCategories: UserCategory[];
    private subscription: Subscription;
    private isUsedForIncomes = true;
    private isUsedForOutcomes = true;

    constructor(private readonly formBuilder: FormBuilder, private readonly userCategoriesService: UserCategoriesService) {
    }

    ngOnInit() {
        this.subscription = this.userCategoriesService.userCategories$.subscribe(userCategories => {
            this.userCategories = userCategories;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private onCreateClick() {
        this.error = '';
        if (this.userCategories.find(uc => uc.category.name === this.categoryName)) {
            this.error = 'Category is already created';
            return;
        }

        const source = {isUsedForIncomes: this.isUsedForIncomes, isUsedForOutcomes: this.isUsedForOutcomes};
        this.userCategoriesService.createByCategoryName(this.categoryName, source).subscribe(() => {
            this.categoryName = '';
        });
    }
}
