import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home-best-sellers-bottom',
  templateUrl: './home-best-sellers-bottom.component.html',
  styleUrls: ['./home-best-sellers-bottom.component.scss']
})
export class HomeBestSellersBottomComponent {
  @Input() products: IProduct[];

}
