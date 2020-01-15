import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-not-found-view',
    templateUrl: './not-found-view.component.html',
    styleUrls: []
})
export class NotFoundViewComponent implements OnInit {

    static readonly PATH = 'errors/404';

    constructor() {
    }

    ngOnInit() {
    }
}
