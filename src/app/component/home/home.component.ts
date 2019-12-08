import {Component, OnInit} from '@angular/core';
import {StoragesService} from '../../service/storages.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    static readonly PATH = '';

    constructor(private readonly storagesService: StoragesService) {
    }

    ngOnInit() {
    }

}
