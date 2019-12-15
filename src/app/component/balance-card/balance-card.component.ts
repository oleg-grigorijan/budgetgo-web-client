import {Component, Input, OnInit} from '@angular/core';
import {Balance} from '../../entity/balance';
import {Currency} from '../../entity/currency';

@Component({
    selector: 'app-balance-card',
    templateUrl: './balance-card.component.html',
    styleUrls: []
})
export class BalanceCardComponent implements OnInit {

    @Input() balances: Balance[];
    @Input() mainCurrency: Currency;

    private mainBalance: Balance;

    constructor() {
    }

    ngOnInit() {
        this.mainBalance = this.balances.find(b => b.currency.id === this.mainCurrency.id);
    }
}
