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

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        WelcomeComponent,
        HomeComponent,
        HeaderComponent
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
