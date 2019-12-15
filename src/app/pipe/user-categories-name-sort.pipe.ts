import {Pipe, PipeTransform} from '@angular/core';
import {UserCategory} from '../entity/user-category';

@Pipe({
    name: 'userCategoriesNameSort',
    pure: false
})
export class UserCategoriesNameSortPipe implements PipeTransform {

    transform(userCategories: UserCategory[]): UserCategory[] {
        return userCategories.sort((uc1, uc2) => {
            if (uc1.category.name === uc2.category.name) {
                return 0;
            } else if (uc1.category.name > uc2.category.name) {
                return 1;
            } else {
                return -1;
            }
        });
    }

}
