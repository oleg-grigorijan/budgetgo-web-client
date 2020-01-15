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
    @Output() cancelReturning = new EventEmitter<void>();
    @Output() createReturning = new EventEmitter<void>();

    form: FormGroup;
    isLoading = false;
    wasSubmitted = false;
    currencies: Currency[];
    selectedCurrency: Currency;

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
            initialBalance: [0],
            initialBalanceFloat: [null]
        });

        this.form.controls.initialBalanceFloat.valueChanges.subscribe(value => {
            this.form.controls.initialBalance.setValue(value * 100);
        });

        this.selectedCurrency = this.mainCurrency;
        this.form.controls.currencyId.valueChanges.subscribe(value => {
            if (value === this.mainCurrency.id) {
                this.selectedCurrency = this.mainCurrency;
            } else {
                this.selectedCurrency = this.currencies.find(c => c.id === Number(value));
            }
        });
    }

    onCreateClick() {
        this.wasSubmitted = true;
        this.isLoading = true;

        if (this.form.invalid) {
            this.isLoading = false;
            return;
        }

        this.storagesService.create(this.form.value).subscribe(() => {
            this.isLoading = false;
            this.createReturning.emit();
        });
    }

    onCancelClick() {
        this.cancelReturning.emit();
    }
}
