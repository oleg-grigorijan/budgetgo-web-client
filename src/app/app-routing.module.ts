import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {HomeComponent} from './component/home/home.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {UserSettingsComponent} from './component/user-settings/user-settings.component';
import {StorageViewComponent} from './component/storage-view/storage-view.component';
import {UserCategoriesSettingsComponent} from './component/user-categories-settings/user-categories-settings.component';


const routes: Routes = [
    {path: WelcomeComponent.PATH, component: WelcomeComponent},
    {path: HomeComponent.PATH, component: HomeComponent, canActivate: [AuthenticationGuard]},
    {path: UserSettingsComponent.PATH, component: UserSettingsComponent, canActivate: [AuthenticationGuard]},
    {path: StorageViewComponent.PATH, component: StorageViewComponent, canActivate: [AuthenticationGuard]},
    {path: UserCategoriesSettingsComponent.PATH, component: UserCategoriesSettingsComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
