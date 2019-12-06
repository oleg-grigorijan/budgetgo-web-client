import {Component, OnInit} from '@angular/core';
import {UserDetailsService} from '../../service/user-details.service';

@Component({
    selector: 'app-storage-creation-card',
    templateUrl: './storage-creation-card.component.html',
    styleUrls: ['./storage-creation-card.component.css']
})
export class StorageCreationCardComponent implements OnInit {

    private creatingStorage = false;

    constructor(private readonly userDetailsService: UserDetailsService) {
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
