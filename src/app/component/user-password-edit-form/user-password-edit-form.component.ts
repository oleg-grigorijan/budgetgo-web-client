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
    success = '';

    constructor(private readonly formBuilder: FormBuilder, private readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]]
        });
        this.form.valueChanges.subscribe(() => {
            this.success = '';
        });
    }

    onSaveClick() {
        this.success = '';
        this.wasSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;
        this.userDetailsService.patch(this.form.value).subscribe(() => {
            this.success = 'Changes saved';
            this.isLoading = false;
        });
    }
}
