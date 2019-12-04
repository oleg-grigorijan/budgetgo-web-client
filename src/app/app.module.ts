import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './component/login/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicAuthenticationInterceptor} from './interseptor/basic-authentication.interceptor';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {HomeComponent} from './component/home/home.component';
import {HeaderComponent} from './component/header/header.component';
import { UserDetailsEditFormComponent } from './component/user-details-edit-form/user-details-edit-form.component';
import { UserSettingsComponent } from './component/user-settings/user-settings.component';
import { UserPasswordEditFormComponent } from './component/user-password-edit-form/user-password-edit-form.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        WelcomeComponent,
        HomeComponent,
        HeaderComponent,
        UserDetailsEditFormComponent,
        UserSettingsComponent,
        UserPasswordEditFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
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
