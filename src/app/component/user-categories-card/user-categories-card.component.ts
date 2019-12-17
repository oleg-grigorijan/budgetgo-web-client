import {Component, OnInit} from '@angular/core';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';

@Component({
    selector: 'app-user-categories-card',
    templateUrl: './user-categories-card.component.html',
    styleUrls: ['./user-categories-card.component.css']
})
export class UserCategoriesCardComponent implements OnInit {

    private lastActiveCategoryId = 0;
    private warning = '';

    constructor(private readonly userCategoriesService: UserCategoriesService) {
    }

    ngOnInit() {
        this.userCategoriesService.userCategories$.subscribe((userCategories) => {
            if (!userCategories) {
                this.warning = '';
            } else if (userCategories.length === 0) {
                this.warning = 'You have no categories. Create one!';
            } else if (userCategories.filter(uc => uc.isUsedForIncomes).length === 0) {
                this.warning = 'You have no categories for incomes. Create one!';
            } else if (userCategories.filter(uc => uc.isUsedForOutcomes).length === 0) {
                this.warning = 'You have no categories for outcomes. Create one!';
            } else {
                this.warning = '';
            }
        });
    }

    private onRemoveUserCategoryClick(userCategory: UserCategory) {
        this.lastActiveCategoryId = 0;
        this.userCategoriesService.delete(userCategory.category.id).subscribe();
    }

    private toggleIsUsedForIncomes(userCategory: UserCategory) {
        this.lastActiveCategoryId = userCategory.category.id;
        this.userCategoriesService.patch(userCategory.category.id, {isUsedForIncomes: !userCategory.isUsedForIncomes}).subscribe();
    }

    private toggleIsUsedForOutcomes(userCategory: UserCategory) {
        this.lastActiveCategoryId = userCategory.category.id;
        this.userCategoriesService.patch(userCategory.category.id, {isUsedForOutcomes: !userCategory.isUsedForOutcomes}).subscribe();
    }
}
