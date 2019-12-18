import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-user-settings-view',
    templateUrl: './user-settings-view.component.html'
})
export class UserSettingsViewComponent implements OnInit {

    static readonly PATH = 'settings';

    constructor(readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
    }
}
