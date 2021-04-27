import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss'],
})
export class GetProductComponent {
  @Input() product: IProduct;
  @Input() fullContent: boolean;
  @Input() search: boolean;

  showHiddenBtn = false;
}
