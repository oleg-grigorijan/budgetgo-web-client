import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../../entity/currency';
import {UsersService} from '../../service/users.service';
import {BasicAuthenticationService} from '../../service/basic-authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: []
})
export class RegistrationFormComponent implements OnInit {

    @Input() currencies: Currency[];

    @Output() successReturning = new EventEmitter<void>();

    private form: FormGroup;

    private wasSubmitted = false;
    private isLoading = false;
    private error = '';

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authenticationService: BasicAuthenticationService,
        private readonly usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z0-9_.\-]*$')), Validators.maxLength(255)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
            isEmailPublic: [true],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            surname: ['', [Validators.required, Validators.maxLength(255)]],
            mainCurrencyId: [this.currencies[0].id, [Validators.required]]
        });

        this.form.valueChanges.subscribe(() => {
            this.error = '';
        });
    }

    onSingUpClick() {
        this.error = '';
        this.wasSubmitted = true;
        this.isLoading = true;

        if (this.form.invalid) {
            this.isLoading = false;
            return;
        }

        const login = this.form.controls.login.value;
        const email = this.form.controls.email.value;
        const password = this.form.controls.password.value;

        this.usersService.getByLogin(login).subscribe(() => {
            this.error = 'User with such a login already exists';
            this.isLoading = false;

        }, loginError => {
            if (loginError instanceof HttpErrorResponse && loginError.status !== 404) {
                throwError(loginError);
            } else {
                this.usersService.getByEmail(email).subscribe(() => {
                    this.error = 'User with such an email already exists';
                    this.isLoading = false;

                }, emailError => {
                    if (emailError instanceof HttpErrorResponse && emailError.status !== 404) {
                        throwError(emailError);
                    } else {
                        this.usersService.create(this.form.value).subscribe(() => {
                            this.authenticationService.authenticate(login, password).subscribe(() => {
                                this.isLoading = false;
                                this.successReturning.emit();
                            });
                        });
                    }
                });
            }
        });
    }
}
