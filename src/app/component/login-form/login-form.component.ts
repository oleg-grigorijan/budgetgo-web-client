import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {HomeComponent} from '../home/home.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    private form: FormGroup;
    private isLoading = false;
    private wasSubmitted = false;
    private error = '';

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly authenticationService: BasicAuthenticationService
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.wasSubmitted = true;
        this.error = '';

        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;
        this.authenticationService.authenticate(this.form.controls.login.value, this.form.controls.password.value).subscribe(() => {
            const returnUrl = this.route.snapshot.queryParams.returnUrl || HomeComponent.PATH;
            this.router.navigate([returnUrl]);
            this.isLoading = false;
        }, error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.error = 'Invalid login or password';
            }
            this.isLoading = false;
        });
    }
}
