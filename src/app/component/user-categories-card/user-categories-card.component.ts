import {Component, OnInit} from '@angular/core';
import {UserCategoriesService} from '../../service/user-categories.service';
import {UserCategory} from '../../entity/user-category';

@Component({
    selector: 'app-user-categories-card',
    templateUrl: './user-categories-card.component.html',
    styleUrls: ['./user-categories-card.component.css']
})
export class UserCategoriesCardComponent implements OnInit {

    lastActiveCategoryId = 0;
    isNoCategoriesForIncomesWarning = false;
    isNoCategoriesFouOutcomesWarning = false;

    constructor(readonly userCategoriesService: UserCategoriesService) {
    }

    ngOnInit() {
        this.userCategoriesService.userCategories$.subscribe((userCategories) => {
            this.isNoCategoriesForIncomesWarning = false;
            this.isNoCategoriesFouOutcomesWarning = false;
            if (userCategories) {
                if (userCategories.filter(uc => uc.isUsedForIncomes).length === 0) {
                    this.isNoCategoriesForIncomesWarning = true;
                } else if (userCategories.filter(uc => uc.isUsedForOutcomes).length === 0) {
                    this.isNoCategoriesFouOutcomesWarning = true;
                }
            }
        });
    }

    onRemoveUserCategoryClick(userCategory: UserCategory) {
        this.lastActiveCategoryId = 0;
        this.userCategoriesService.delete(userCategory.category.id).subscribe();
    }

    toggleIsUsedForIncomes(userCategory: UserCategory) {
        this.lastActiveCategoryId = userCategory.category.id;
        this.userCategoriesService.patch(userCategory.category.id, {isUsedForIncomes: !userCategory.isUsedForIncomes}).subscribe();
    }

    toggleIsUsedForOutcomes(userCategory: UserCategory) {
        this.lastActiveCategoryId = userCategory.category.id;
        this.userCategoriesService.patch(userCategory.category.id, {isUsedForOutcomes: !userCategory.isUsedForOutcomes}).subscribe();
    }
}
