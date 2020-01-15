import {Injectable} from '@angular/core';
import {UserStorageRole} from '../entity/user-storage-role';

@Injectable({providedIn: 'root'})
export class UserStorageRoleAuthoritiesService {

    constructor() {
    }

    canModifyStorage(who: UserStorageRole): boolean {
        return who !== UserStorageRole.VIEWER;
    }

    canBeModifiedBy(who: UserStorageRole, by: UserStorageRole): boolean {
        return by === UserStorageRole.CREATOR || (by === UserStorageRole.ADMIN && who !== UserStorageRole.CREATOR);
    }

    canSendInvitations(who: UserStorageRole): boolean {
        return who === UserStorageRole.CREATOR || who === UserStorageRole.ADMIN;
    }
}
