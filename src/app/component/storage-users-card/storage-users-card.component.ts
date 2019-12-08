import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {StorageUser} from '../../entity/storage-user';
import {StorageUsersService} from '../../service/storage-users.service';
import {UserStorageRoleAuthoritiesService} from '../../service/user-storage-role-authorities.service';
import {UsersService} from '../../service/users.service';
import {User} from '../../entity/user';
import {HttpErrorResponse} from '@angular/common/http';
import {UserStorageRole} from '../../entity/user-storage-role';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-storage-users-card',
    templateUrl: './storage-users-card.component.html',
    styleUrls: []
})
export class StorageUsersCardComponent implements OnInit {

    @Input() storage: Storage;

    private storageUsers: StorageUser[];

    private isCardExpanded = false;

    private invitationLogin: string;
    private isInvitationUserSearching = false;
    private invitationSearchError = '';

    private isInviteLoading = false;
    private invitationUser: User;
    private invitationUserRole = UserStorageRole.VIEWER;

    constructor(
        private readonly storageUsersService: StorageUsersService,
        private readonly authoritiesService: UserStorageRoleAuthoritiesService,
        private readonly usersService: UsersService,
        private readonly userDetailsService: UserDetailsService
    ) {
    }

    ngOnInit() {
        this.storageUsersService.getByStorageId(this.storage.id).then(users => {
            this.storageUsers = users;
        });
    }

    onChangeUserRoleClick(storageUser: StorageUser, newRole: string) {
        this.storageUsersService.patch(this.storage.id, storageUser.user.id, {userRole: newRole}).then(patchedStorageUser => {
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
        this.storageUsersService.delete(this.storage.id, storageUser.user.id).then(() => {
            this.storageUsers = this.storageUsers.filter(su => {
                return su.user.id !== storageUser.user.id;
            });
        });
    }

    toggleUsersExpanded() {
        this.isCardExpanded = !this.isCardExpanded;
    }

    onInvitationUserSearchClick() {
        this.invitationSearchError = '';
        this.isInvitationUserSearching = true;
        this.usersService.getByLogin(this.invitationLogin).then(invitationUser => {
            if (this.storageUsers.find(su => su.user.id === invitationUser.id)) {
                this.invitationUser = null;
                this.invitationSearchError = 'User is already here';
            } else {
                this.invitationUser = invitationUser;
            }
            this.isInvitationUserSearching = false;
        }).catch(error => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
                this.invitationSearchError = 'User not found';
            }
            this.invitationUser = null;
            this.isInvitationUserSearching = false;
        });
    }

    onChangeUserInvitationRoleClick(newRole: string) {
        this.invitationUserRole = UserStorageRole[newRole];
    }

    onInviteClick() {
        this.isInviteLoading = true;
        const source = {userId: this.invitationUser.id, userRole: this.invitationUserRole};
        this.storageUsersService.create(this.storage.id, source).then(storageUser => {
            this.storageUsers.push(storageUser);
            this.invitationUser = null;
            this.invitationUserRole = UserStorageRole.VIEWER;
            this.invitationLogin = '';
            this.isInviteLoading = false;
        });
    }
}
