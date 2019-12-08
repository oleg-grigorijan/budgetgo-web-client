import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoragesService} from '../../service/storages.service';
import {Storage} from '../../entity/storage';

@Component({
    selector: 'app-storage-edit-from',
    templateUrl: './storage-edit-form.component.html',
    styleUrls: []
})
export class StorageEditFormComponent implements OnInit {

    @Input() storage: Storage;

    private form: FormGroup;
    private isLoading = false;
    private success = '';

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly storagesService: StoragesService,
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.maxLength(255)]],
        });
        this.form.patchValue(this.storage);

        this.form.valueChanges.subscribe(() => {
            this.success = '';
        });
    }

    private onSaveClick() {
        this.isLoading = true;
        this.storagesService.patch(this.storage.id, this.form.value).then(() => {
            this.success = 'Changes saved';
            this.isLoading = false;
        });
    }
}
