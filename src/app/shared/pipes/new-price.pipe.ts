import { PipeTransform, Pipe, NgModule} from '@angular/core';

@Pipe({
    name: 'newPrice'
})

export class NewPricePipe implements PipeTransform {
    transform(oldPrice: any, cut: number){
        return oldPrice - cut;
    }
} 