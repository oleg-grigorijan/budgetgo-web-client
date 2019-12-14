import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../entity/operation';

@Pipe({
    name: 'operationsDateSort',
    pure: false
})
export class OperationsDateSortPipe implements PipeTransform {

    transform(operations: Operation[]): Operation[] {
        return operations.sort((o1, o2) => Date.parse(o2.date).valueOf() - Date.parse(o1.date).valueOf());
    }

}
