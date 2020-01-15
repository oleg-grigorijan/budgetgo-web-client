import {Currency} from './currency';
import {StorageSettings} from './storage-settings';

export class Storage {
    id: number;
    name: string;
    description: string;
    balance: number;
    currency: Currency;
    initialBalance: number;
    settings: StorageSettings;
}
