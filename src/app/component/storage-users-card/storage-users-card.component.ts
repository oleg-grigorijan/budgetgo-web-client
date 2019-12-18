import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {StorageUser} from '../../entity/storage-user';
import {StorageUsersService} from '../../service/storage-users.service';
import {UserStorageRoleAuthoritiesService} from '../../service/user-storage-role-authorities.service';
import {UsersService} from '../../service/users.service';
import {UserDetailsService} from '../../service/user-details.service';
import {UserStorageRole} from '../../entity/user-storage-role';

@Component({
    selector: 'app-storage-users-card',
    templateUrl: './storage-users-card.component.html',
    styleUrls: []
})
export class StorageUsersCardComponent implements OnInit {

    @Input() storage: Storage;

    storageUsers: StorageUser[];

    constructor(
        private readonly storageUsersService: StorageUsersService,
        readonly authoritiesService: UserStorageRoleAuthoritiesService,
        private readonly usersService: UsersService,
        readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
        this.storageUsersService.getByStorageId(this.storage.id).subscribe(users => {
            this.storageUsers = users;
        });
    }

    onUserRoleChange(storageUser: StorageUser, newRole: UserStorageRole) {
        this.storageUsersService.patch(this.storage.id, storageUser.user.id, {userRole: newRole}).subscribe(patchedStorageUser => {
            this.storageUsers = this.storageUsers.map(su => {
                if (su.user.id === patchedStorageUser.user.id) {
                    return patchedStorageUser;
                } else {
                    return su;
                }
            });
        });
    }

    onRemoveUserClick(storageUser: StorageUser) {
        this.storageUsersService.delete(this.storage.id, storageUser.user.id).subscribe(() => {
            this.storageUsers = this.storageUsers.filter(su => {
                return su.user.id !== storageUser.user.id;
            });
        });
    }
}
