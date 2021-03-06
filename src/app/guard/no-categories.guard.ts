import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserCategoriesService} from '../service/user-categories.service';
import {filter, map} from 'rxjs/operators';
import {UserCategoriesSettingsViewComponent} from '../component-view/user-categories-settings-view/user-categories-settings-view.component';

@Injectable({providedIn: 'root'})
export class NoCategoriesGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly userCategoriesService: UserCategoriesService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userCategoriesService.userCategories$.pipe(filter(uc => uc !== null), map(userCategories => {
            if (!userCategories.find(uc => uc.isUsedForOutcomes) || !userCategories.find(uc => uc.isUsedForIncomes)) {
                this.router.navigate([UserCategoriesSettingsViewComponent.PATH]);
                return false;
            }
            return true;
        }));
    }
}
