import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html'
})
export class UserSettingsComponent implements OnInit {

    static readonly PATH = 'settings';

    constructor(private readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
    }
}
