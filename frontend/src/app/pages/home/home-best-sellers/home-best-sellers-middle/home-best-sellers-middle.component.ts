import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home-best-sellers-middle',
  templateUrl: './home-best-sellers-middle.component.html',
  styleUrls: ['./home-best-sellers-middle.component.scss']
})
export class HomeBestSellersMiddleComponent {
  @Input() products: Product[];
  @Input() mainProduct: Product;
}
