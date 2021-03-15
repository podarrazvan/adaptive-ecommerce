import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss']
})
export class GetProductComponent {

  @Input() product: Product;
  @Input() fullContent: boolean;
  @Input() search: boolean;

  showHiddenBtn = false;


}
