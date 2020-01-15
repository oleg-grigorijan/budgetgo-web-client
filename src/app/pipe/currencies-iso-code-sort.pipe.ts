import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from '../entity/currency';

@Pipe({
    name: 'currenciesIsoCodeSort',
    pure: false
})
export class CurrenciesIsoCodeSortPipe implements PipeTransform {

    transform(currencies: Currency[]): Currency[] {
        return currencies.sort((c1, c2) => {
            if (c1.isoCode === c2.isoCode) {
                return 0;
            } else if (c1.isoCode > c2.isoCode) {
                return 1;
            } else {
                return -1;
            }
        });
    }
}
