import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {Balance} from '../entity/balance';
import {StoragesService} from './storages.service';

@Injectable({providedIn: 'root'})
export class BalanceService {

    private readonly balanceSubject: Subject<Balance[]> = new ReplaySubject<Balance[]>(1);
    balance$ = this.balanceSubject.asObservable();

    constructor(private readonly storagesService: StoragesService) {
        this.storagesService.storages$.subscribe(storages => {
            if (storages) {
                const balanceMap: { [currencyId: number]: Balance } = {};
                storages.filter(s => s.settings.isIncludedInUserStatistics).forEach(storage => {
                    if (!balanceMap[storage.currency.id]) {
                        balanceMap[storage.currency.id] = {currency: storage.currency, money: storage.balance};
                    } else {
                        balanceMap[storage.currency.id].money = balanceMap[storage.currency.id].money + storage.balance;
                    }
                });
                this.balanceSubject.next(Object.values(balanceMap));
            } else {
                this.balanceSubject.next(null);
            }
        });
    }
}
