import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {StoragesService} from '../../service/storages.service';

@Component({
    selector: 'app-storage-card',
    templateUrl: './storage-card.component.html',
    styleUrls: ['./storage-card.component.css']
})
export class StorageCardComponent implements OnInit {

    @Input() storage: Storage;

    private isAcceptInvitationLoading = false;
    private isDeclineInvitationLoading = false;

    constructor(private storagesService: StoragesService) {
    }

    ngOnInit() {
    }

    onAcceptInvitationClick() {
        this.isAcceptInvitationLoading = true;
        this.storagesService.patchSettings(this.storage.id, {isInvitation: false, isIncludedInUserStatistics: true}).then(() => {
            this.isAcceptInvitationLoading = false;
        });
    }

    onDeclineInvitationClick() {
        this.isDeclineInvitationLoading = true;
        this.storagesService.delete(this.storage.id).then(() => {
            this.isDeclineInvitationLoading = false;
        });
    }
}
