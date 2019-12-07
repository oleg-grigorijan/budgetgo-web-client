import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../entity/storage';
import {StoragesService} from '../../service/storages.service';
import {Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';

@Component({
    selector: 'app-storage-details',
    templateUrl: './storage-details.component.html',
    styleUrls: []
})
export class StorageDetailsComponent implements OnInit {

    @Input() storage: Storage;

    private isFollowingExpanded = false;
    private isAcceptInvitationLoading = false;
    private isUnsubscribeLoading = false;
    private isIncludedInUserStatisticsLoading = false;

    constructor(private readonly router: Router, private readonly storagesService: StoragesService) {
    }

    ngOnInit() {
    }

    onAcceptInvitationClick() {
        this.isAcceptInvitationLoading = true;
        this.storagesService.patchSettings(this.storage.id, {isInvitation: false, isIncludedInUserStatistics: true}).then(() => {
            this.isAcceptInvitationLoading = false;
        });
    }

    onUnsubscribeClick() {
        this.isUnsubscribeLoading = true;
        this.storagesService.delete(this.storage.id).then(() => {
            this.isUnsubscribeLoading = false;
            this.router.navigate([HomeComponent.PATH]);
        });
    }

    toggleIncludedInUserStatistics() {
        const patches = {isIncludedInUserStatistics: !this.storage.settings.isIncludedInUserStatistics};
        this.isIncludedInUserStatisticsLoading = true;
        this.storagesService.patchSettings(this.storage.id, patches).then(() => {
            this.isIncludedInUserStatisticsLoading = false;
        });
    }

    toggleFollowingExpanded() {
        this.isFollowingExpanded = !this.isFollowingExpanded;
    }
}
