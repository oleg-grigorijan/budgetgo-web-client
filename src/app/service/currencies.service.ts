import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Currency} from '../entity/currency';

@Injectable({providedIn: 'root'})
export class CurrenciesService {

    private readonly apiUrl = environment.apiBaseUrl + '/currencies';

    private readonly currenciesSubject: Subject<Currency[]> = new ReplaySubject<Currency[]>(1);
    readonly currencies$ = this.currenciesSubject.asObservable();

    constructor(private readonly http: HttpClient) {
        this.fetch();
    }

    private fetch(): void {
        this.http.get<Currency[]>(this.apiUrl).subscribe((currencies) => {
            this.currenciesSubject.next(currencies);
        });
    }
}
