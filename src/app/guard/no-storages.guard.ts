import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StoragesService} from '../service/storages.service';
import {filter, map} from 'rxjs/operators';
import {FirstStorageCreationViewComponent} from '../component/first-storage-creation-view/first-storage-creation-view.component';

@Injectable({providedIn: 'root'})
export class NoStoragesGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly storagesService: StoragesService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.storagesService.storages$.pipe(filter(s => s !== null), map(storages => {
            if (storages.length === 0) {
                this.router.navigate([FirstStorageCreationViewComponent.PATH]);
                return false;
            }
            return true;
        }));
    }

}
