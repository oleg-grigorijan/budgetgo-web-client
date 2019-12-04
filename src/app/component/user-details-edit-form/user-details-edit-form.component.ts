import {Component, Input, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDetails} from '../../entity/user-details';

@Component({
    selector: 'app-user-details-edit-form',
    templateUrl: './user-details-edit-form.component.html'
})
export class UserDetailsEditFormComponent implements OnInit {

    @Input() private userDetails: UserDetails;

    private form: FormGroup;
    private isLoading = false;
    private success = '';

    constructor(private readonly formBuilder: FormBuilder, private readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            login: ['', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z0-9_.\-]*$')), Validators.maxLength(255)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
            isEmailPublic: [''],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            surname: ['', [Validators.required, Validators.maxLength(255)]]
        });

        this.form.patchValue(this.userDetails);

        this.form.valueChanges.subscribe(() => {
            this.success = '';
        });
    }

    onSaveClick() {
        this.isLoading = true;
        this.userDetailsService.patch(this.form.value).then(() => {
            this.success = 'Changes saved';
            this.isLoading = false;
        });
    }
}
