import {Currency} from './currency';

export class UserDetails {
    id: number;
    login: string;
    email: string;
    name: string;
    surname: string;
    isEmailPublic: boolean;
    mainCurrency: Currency;
}
