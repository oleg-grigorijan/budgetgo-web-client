import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoragesService} from '../../service/storages.service';
import {CurrenciesService} from '../../service/currencies.service';
import {Currency} from '../../entity/currency';

@Component({
    selector: 'app-storage-creation-form',
    templateUrl: './storage-creation-form.component.html',
    styleUrls: []
})
export class StorageCreationFormComponent implements OnInit {

    @Input() mainCurrency: Currency;
    @Output() returning = new EventEmitter<boolean>();

    private form: FormGroup;
    private isLoading = false;
    private wasSubmitted = false;
    private currencies: Currency[];
    private selectedCurrency: Currency;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly storagesService: StoragesService,
        private readonly currenciesService: CurrenciesService,
    ) {
    }

    ngOnInit() {
        this.currenciesService.currencies$.subscribe((currencies) => {
            this.currencies = currencies;
        });

        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(255)]],
            description: ['', [Validators.maxLength(255)]],
            currencyId: [this.mainCurrency.id, [Validators.required]],
            initialBalance: [''],
        });

        this.selectedCurrency = this.mainCurrency;
        this.form.controls.currencyId.valueChanges.subscribe((value: number) => {
            if (value === this.mainCurrency.id) {
                this.selectedCurrency = this.mainCurrency;
            } else {
                this.selectedCurrency = this.currencies.find(c => c.id == value);
            }
        });
    }

    private onCreateClick() {
        this.wasSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        this.storagesService.create(this.form.value).then(() => {
            this.returning.emit(true);
        });
    }

    onCancelClick() {
        this.returning.emit(false);
    }
}
