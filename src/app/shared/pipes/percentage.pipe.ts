import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'percentage'
})

export class PercentagePipe implements PipeTransform {
    transform(initialNumber: number, newNumber: number){
            return Math.floor(((initialNumber - newNumber) * 100) / initialNumber) + '%';
    }
} 