import {User} from './user';
import {UserStorageRole} from './user-storage-role';

export class StorageSettings {
    userRole: UserStorageRole;
    isIncludedInUserStatistics: boolean;
    inviter: User;
    isInvitation: boolean;
}
