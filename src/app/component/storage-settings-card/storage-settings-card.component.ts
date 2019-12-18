import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Storage} from '../../entity/storage';
import {StoragesService} from '../../service/storages.service';
import {UserStorageRoleAuthoritiesService} from '../../service/user-storage-role-authorities.service';

@Component({
    selector: 'app-storage-settings-card',
    templateUrl: './storage-settings-card.component.html',
    styleUrls: []
})
export class StorageSettingsCardComponent implements OnInit {

    @Input() storage: Storage;
    @Output() unsubscribeClick = new EventEmitter<void>();

    isUnsubscribeLoading = false;
    isIncludedInUserStatisticsLoading = false;

    constructor(
        private readonly storagesService: StoragesService,
        readonly authoritiesService: UserStorageRoleAuthoritiesService
    ) {
    }

    ngOnInit() {
    }

    onUnsubscribeClick() {
        this.isUnsubscribeLoading = true;
        this.storagesService.delete(this.storage.id).subscribe(() => {
            this.isUnsubscribeLoading = false;
            this.unsubscribeClick.emit();
        });
    }

    toggleIncludedInUserStatistics() {
        const patches = {isIncludedInUserStatistics: !this.storage.settings.isIncludedInUserStatistics};
        this.isIncludedInUserStatisticsLoading = true;
        this.storagesService.patchSettings(this.storage.id, patches).subscribe(() => {
            this.isIncludedInUserStatisticsLoading = false;
        });
    }
}
