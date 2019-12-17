import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserStorageRole} from '../../entity/user-storage-role';

@Component({
    selector: 'app-user-storage-roles-dropdown-items',
    templateUrl: './user-storage-roles-dropdown-items.component.html',
    styleUrls: []
})
export class UserStorageRolesDropdownItemsComponent implements OnInit {

    userStorageRole = UserStorageRole;

    @Output() roleSelect = new EventEmitter<UserStorageRole>();

    constructor() {
    }

    ngOnInit() {
    }

}
