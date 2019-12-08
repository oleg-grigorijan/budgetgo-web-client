import {Pipe, PipeTransform} from '@angular/core';
import {Storage} from '../entity/storage';

@Pipe({
    name: 'isIncludedInUserStatisticsSort',
    pure: false
})
export class IsIncludedInUserStatisticsSortPipe implements PipeTransform {

    transform(storages: Storage[]): Storage[] {
        return storages.sort((s1, s2) => {
            if (s1.settings.isIncludedInUserStatistics === s2.settings.isIncludedInUserStatistics) {
                return 0;
            } else if (s1.settings.isIncludedInUserStatistics) {
                return -1;
            } else {
                return 1;
            }
        });
    }

}
