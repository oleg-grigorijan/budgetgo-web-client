import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-storage-creation-card',
    templateUrl: './storage-creation-card.component.html',
    styleUrls: []
})
export class StorageCreationCardComponent implements OnInit {

    creatingStorage = false;

    constructor(readonly userDetailsService: UserDetailsService) {
    }

    ngOnInit() {
    }

    onCreateStorageClick() {
        this.creatingStorage = true;
    }

    onStorageCreationReturn() {
        this.creatingStorage = false;
    }
}
