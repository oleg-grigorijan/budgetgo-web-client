import {Pipe, PipeTransform} from '@angular/core';
import {Balance} from '../entity/balance';

@Pipe({
    name: 'balancesCurrencyIsoCodeSort'
})
export class BalancesCurrencyIsoCodeSortPipe implements PipeTransform {

    transform(balances: Balance[]): Balance[] {
        return balances.sort((b1, b2) => {
            if (b1.currency.isoCode === b2.currency.isoCode) {
                return 0;
            } else if (b1.currency.isoCode > b2.currency.isoCode) {
                return 1;
            } else {
                return -1;
            }
        });
    }
}
