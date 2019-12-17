import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeViewComponent} from './componen/welcome-view/welcome-view.component';
import {HomeViewComponent} from './componen/home-view/home-view.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {UserSettingsViewComponent} from './componen/user-settings-view/user-settings-view.component';
import {StorageViewComponent} from './componen/storage-view/storage-view.component';
import {UserCategoriesSettingsViewComponent} from './componen/user-categories-settings-view/user-categories-settings-view.component';
import {NoCategoriesGuard} from './guard/no-categories.guard';
import {NoStoragesGuard} from './guard/no-storages.guard';
import {FirstStorageCreationViewComponent} from './componen/first-storage-creation-view/first-storage-creation-view.component';

const routes: Routes = [
    {path: WelcomeViewComponent.PATH, component: WelcomeViewComponent},
    {path: HomeViewComponent.PATH, component: HomeViewComponent, canActivate: [AuthenticationGuard, NoStoragesGuard, NoCategoriesGuard]},
    {path: UserSettingsViewComponent.PATH, component: UserSettingsViewComponent, canActivate: [AuthenticationGuard]},
    {path: FirstStorageCreationViewComponent.PATH, component: FirstStorageCreationViewComponent, canActivate: [AuthenticationGuard]},
    {path: StorageViewComponent.PATH, component: StorageViewComponent, canActivate: [AuthenticationGuard, NoCategoriesGuard]},
    {path: UserCategoriesSettingsViewComponent.PATH, component: UserCategoriesSettingsViewComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
