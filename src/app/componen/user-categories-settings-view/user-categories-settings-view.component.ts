import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-categories-settings-view',
    templateUrl: './user-categories-settings-view.component.html',
    styleUrls: []
})
export class UserCategoriesSettingsViewComponent implements OnInit {

    static readonly PATH = 'categories/settings';

    constructor() {
    }

    ngOnInit() {
    }

}
