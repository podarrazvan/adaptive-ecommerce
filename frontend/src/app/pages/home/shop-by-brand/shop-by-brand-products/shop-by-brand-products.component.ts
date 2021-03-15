import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-shop-by-brand-products',
  templateUrl: './shop-by-brand-products.component.html',
  styleUrls: ['./shop-by-brand-products.component.scss']
})
export class ShopByBrandProductsComponent {
  @Input() products: Product[]
}
