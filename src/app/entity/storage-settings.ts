import {User} from './user';

export class StorageSettings {
    userRole: string;
    isIncludedInUserStatistics: boolean;
    inviter: User;
    isInvitation: boolean;
}
