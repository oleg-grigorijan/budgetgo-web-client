import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../entity/user';
import {UserStorageRole} from '../../entity/user-storage-role';
import {HttpErrorResponse} from '@angular/common/http';
import {StorageUser} from '../../entity/storage-user';
import {UsersService} from '../../service/users.service';
import {StorageUsersService} from '../../service/storage-users.service';
import {Storage} from '../../entity/storage';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-storage-user-invitation-form',
    templateUrl: './storage-user-invitation-form.component.html',
    styleUrls: []
})
export class StorageUserInvitationFormComponent implements OnInit {

    @Input() storage: Storage;
    @Input() storageUsers: StorageUser[];

    userLogin: string;
    invitationUser: User;
    invitationUserRole = UserStorageRole.VIEWER;

    isSearching = false;
    isInviteLoading = false;
    isUserAlreadyHereError = false;
    isUserNotFoundError = false;

    constructor(private readonly usersService: UsersService, private readonly storageUsersService: StorageUsersService) {
    }

    ngOnInit() {
    }

    onInvitationUserSearchClick() {
        this.isUserNotFoundError = false;
        this.isUserAlreadyHereError = false;
        this.isSearching = true;

        if (this.storageUsers.find(su => su.user.login === this.userLogin)) {
            this.invitationUser = null;
            this.isUserAlreadyHereError = true;
            this.isSearching = false;

        } else {
            this.usersService.getByLogin(this.userLogin).subscribe(invitationUser => {
                this.invitationUser = invitationUser;
                this.isSearching = false;
            }, error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.isUserNotFoundError = true;
                    this.invitationUser = null;
                    this.isSearching = false;
                } else {
                    throwError(error);
                }
            });
        }
    }

    onUserRoleChange(newRole: string) {
        this.invitationUserRole = UserStorageRole[newRole];
    }

    onInviteClick() {
        this.isInviteLoading = true;
        const source = {userId: this.invitationUser.id, userRole: this.invitationUserRole};
        this.storageUsersService.create(this.storage.id, source).subscribe(storageUser => {
            this.storageUsers.push(storageUser);
            this.invitationUser = null;
            this.invitationUserRole = UserStorageRole.VIEWER;
            this.userLogin = '';
            this.isInviteLoading = false;
        });
    }

}
