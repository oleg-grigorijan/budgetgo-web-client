import {Pipe, PipeTransform} from '@angular/core';
import {Storage} from '../entity/storage';

@Pipe({
    name: 'isInvitationFilter',
    pure: false
})
export class IsInvitationFilterPipe implements PipeTransform {

    transform(storages: Storage[], isInvitation: boolean): Storage[] {
        return storages.filter(s => s.settings.isInvitation === isInvitation);
    }
}
