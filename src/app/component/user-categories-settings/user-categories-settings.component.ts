import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-categories-settings',
    templateUrl: './user-categories-settings.component.html',
    styleUrls: []
})
export class UserCategoriesSettingsComponent implements OnInit {

    static readonly PATH = 'categories/settings';

    constructor() {
    }

    ngOnInit() {
    }

}
