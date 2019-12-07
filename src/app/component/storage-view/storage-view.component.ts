import { Component, OnInit } from '@angular/core';
import {Storage} from '../../entity/storage';
import {ActivatedRoute} from '@angular/router';
import {StoragesService} from '../../service/storages.service';

@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: []
})
export class StorageViewComponent implements OnInit {

    static readonly PATH = 'storages/:id';

    private storage: Storage;

    constructor(private readonly route: ActivatedRoute, private readonly storagesService: StoragesService) {
    }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.storagesService.storages$.subscribe(storages => {
            this.storage = storages.find(s => s.id === id);
        });
    }
}
