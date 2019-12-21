import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    @Output() successReturning = new EventEmitter<void>();

    form: FormGroup;
    isLoading = false;
    wasSubmitted = false;
    isInvalidCredentialsError = false;

    constructor(private readonly formBuilder: FormBuilder, private readonly authenticationService: BasicAuthenticationService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.isInvalidCredentialsError = false;
        });
    }

    onSubmit(): void {
        this.wasSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;
        this.authenticationService.authenticate(this.form.controls.login.value, this.form.controls.password.value).subscribe(() => {
            this.isLoading = false;
            this.successReturning.emit();
        }, error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.isInvalidCredentialsError = true;
                this.isLoading = false;
            } else {
                throwError(error);
            }
        });
    }
}
