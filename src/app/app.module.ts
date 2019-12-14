import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './component/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthenticationInterceptor} from './interseptor/basic-authentication.interceptor';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {HomeComponent} from './component/home/home.component';
import {HeaderComponent} from './component/header/header.component';
import {UserDetailsEditFormComponent} from './component/user-details-edit-form/user-details-edit-form.component';
import {UserSettingsComponent} from './component/user-settings/user-settings.component';
import {UserPasswordEditFormComponent} from './component/user-password-edit-form/user-password-edit-form.component';
import {MoneyPipe} from './pipe/money.pipe';
import {StorageCreationFormComponent} from './component/storage-creation-form/storage-creation-form.component';
import {StorageCardComponent} from './component/storage-card/storage-card.component';
import {StorageCreationCardComponent} from './component/storage-creation-card/storage-creation-card.component';
import {NgxCurrencyModule} from 'ngx-currency';
import { StorageViewComponent } from './component/storage-view/storage-view.component';
import { StorageUsersCardComponent } from './component/storage-users-card/storage-users-card.component';
import { IsInvitationFilterPipe } from './pipe/is-invitation-filter.pipe';
import { IsIncludedInUserStatisticsSortPipe } from './pipe/is-included-in-user-statistics-sort.pipe';
import { StorageEditFormComponent } from './component/storage-edit-form/storage-edit-form.component';
import { StorageSettingsCardComponent } from './component/storage-settings-card/storage-settings-card.component';
import { UserCategoryCreationFormComponent } from './component/user-category-creation-form/user-category-creation-form.component';
import { UserCategoriesCardComponent } from './component/user-categories-card/user-categories-card.component';
import { UserCategoriesSettingsComponent } from './component/user-categories-settings/user-categories-settings.component';
import { OperationCreationFormComponent } from './component/operation-creation-form/operation-creation-form.component';
import { OperationsListComponent } from './component/operations-list/operations-list.component';
import { OperationsDateSortPipe } from './pipe/operations-date-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        WelcomeComponent,
        HomeComponent,
        HeaderComponent,
        UserDetailsEditFormComponent,
        UserSettingsComponent,
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
        UserCategoriesSettingsComponent,
        OperationCreationFormComponent,
        OperationsListComponent,
        OperationsDateSortPipe,
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
