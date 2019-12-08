import {User} from './user';
import {UserStorageRole} from './user-storage-role';

export class StorageUser {
    user: User;
    userRole: UserStorageRole;
    inviter: User;
}
