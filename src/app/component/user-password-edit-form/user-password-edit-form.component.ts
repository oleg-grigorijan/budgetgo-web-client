import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-user-password-edit-form',
    templateUrl: './user-password-edit-form.component.html'
})
export class UserPasswordEditFormComponent implements OnInit {

    form: FormGroup;

    wasSubmitted = false;
    isLoading = false;
    isSuccess = false;

    constructor(private readonly formBuilder: FormBuilder, private readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
        });
        this.form.valueChanges.subscribe(() => {
            this.isSuccess = false;
        });
    }

    onSaveClick() {
        this.wasSubmitted = true;
        this.isLoading = true;

        if (this.form.invalid) {
            this.isLoading = false;
            return;

        }
        this.userDetailsService.patch(this.form.value).subscribe(() => {
            this.isSuccess = true;
            this.isLoading = false;
        });
    }
}
