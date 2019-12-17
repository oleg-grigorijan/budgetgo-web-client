import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './component/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthenticationInterceptor} from './interseptor/basic-authentication.interceptor';
import {WelcomeViewComponent} from './componen/welcome-view/welcome-view.component';
import {HomeViewComponent} from './componen/home-view/home-view.component';
import {HeaderComponent} from './component/header/header.component';
import {UserDetailsEditFormComponent} from './component/user-details-edit-form/user-details-edit-form.component';
import {UserSettingsViewComponent} from './componen/user-settings-view/user-settings-view.component';
import {UserPasswordEditFormComponent} from './component/user-password-edit-form/user-password-edit-form.component';
import {MoneyPipe} from './pipe/money.pipe';
import {StorageCreationFormComponent} from './component/storage-creation-form/storage-creation-form.component';
import {StorageCardComponent} from './component/storage-card/storage-card.component';
import {StorageCreationCardComponent} from './component/storage-creation-card/storage-creation-card.component';
import {NgxCurrencyModule} from 'ngx-currency';
import { StorageViewComponent } from './componen/storage-view/storage-view.component';
import { StorageUsersCardComponent } from './component/storage-users-card/storage-users-card.component';
import { IsInvitationFilterPipe } from './pipe/is-invitation-filter.pipe';
import { IsIncludedInUserStatisticsSortPipe } from './pipe/is-included-in-user-statistics-sort.pipe';
import { StorageEditFormComponent } from './component/storage-edit-form/storage-edit-form.component';
import { StorageSettingsCardComponent } from './component/storage-settings-card/storage-settings-card.component';
import { UserCategoryCreationFormComponent } from './component/user-category-creation-form/user-category-creation-form.component';
import { UserCategoriesCardComponent } from './component/user-categories-card/user-categories-card.component';
import { UserCategoriesSettingsViewComponent } from './componen/user-categories-settings-view/user-categories-settings-view.component';
import { OperationCreationFormComponent } from './component/operation-creation-form/operation-creation-form.component';
import { OperationsListComponent } from './component/operations-list/operations-list.component';
import { OperationsDateSortPipe } from './pipe/operations-date-sort.pipe';
import { OperationEditFormComponent } from './component/operation-edit-form/operation-edit-form.component';
import { UserCategoriesNameSortPipe } from './pipe/user-categories-name-sort.pipe';
import { BalanceCardComponent } from './component/balance-card/balance-card.component';
import { RegistrationFormComponent } from './component/registration-form/registration-form.component';
import { FirstStorageCreationViewComponent } from './componen/first-storage-creation-view/first-storage-creation-view.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        WelcomeViewComponent,
        HomeViewComponent,
        HeaderComponent,
        UserDetailsEditFormComponent,
        UserSettingsViewComponent,
        UserPasswordEditFormComponent,
        MoneyPipe,
        StorageCreationFormComponent,
        StorageCardComponent,
        StorageCreationCardComponent,
        StorageViewComponent,
        StorageUsersCardComponent,
        IsInvitationFilterPipe,
        IsIncludedInUserStatisticsSortPipe,
        StorageEditFormComponent,
        StorageSettingsCardComponent,
        UserCategoryCreationFormComponent,
        UserCategoriesCardComponent,
        UserCategoriesSettingsViewComponent,
        OperationCreationFormComponent,
        OperationsListComponent,
        OperationsDateSortPipe,
        OperationEditFormComponent,
        UserCategoriesNameSortPipe,
        BalanceCardComponent,
        RegistrationFormComponent,
        FirstStorageCreationViewComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxCurrencyModule.forRoot({
            align: 'left',
            allowNegative: false,
            allowZero: true,
            decimal: '.',
            precision: 2,
            prefix: '',
            suffix: '',
            thousands: ' ',
            nullable: false
        }),
        FormsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BasicAuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
