import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-get-recommended-product',
  templateUrl: './get-recommended-product.component.html',
  styleUrls: ['./get-recommended-product.component.scss']
})
export class GetRecommendedProductComponent {

  @Input() product: IProduct;

}
