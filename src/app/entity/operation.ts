import {Category} from './category';
import {User} from './user';

export class Operation {
    id: number;
    storageId: number;
    moneyDelta: number;
    category: Category;
    date: string;
    description: string;
    dateCreated: string;
    creator: User;
    dateModified: string;
    lastEditor: User;
}
