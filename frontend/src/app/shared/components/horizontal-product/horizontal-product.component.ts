import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-product',
  templateUrl: './horizontal-product.component.html',
  styleUrls: ['./horizontal-product.component.scss']
})
export class HorizontalProductComponent {

  @Input() product;
  @Input() small: boolean;

}
