import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './component/welcome/welcome.component';
import {HomeComponent} from './component/home/home.component';
import {AuthenticationGuard} from './guard/authentication.guard';


const routes: Routes = [
    {path: WelcomeComponent.PATH, component: WelcomeComponent},
    {path: HomeComponent.PATH, component: HomeComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
