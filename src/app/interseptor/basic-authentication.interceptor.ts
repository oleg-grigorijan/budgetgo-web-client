import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicAuthenticationService} from '../service/basic-authentication.service';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {WelcomeComponent} from '../component/welcome/welcome.component';

@Injectable()
export class BasicAuthenticationInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: BasicAuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isAuthenticated) {
            const headerValue = 'Basic ' + this.authenticationService.token;
            req = req.clone({setHeaders: {Authorization: headerValue}});
        }

        return next.handle(req).pipe(tap(
            () => {
            },
            error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.authenticationService.removeAuthentication();
                    this.router.navigate([WelcomeComponent.PATH]);
                }
            }
        ));
    }
}
