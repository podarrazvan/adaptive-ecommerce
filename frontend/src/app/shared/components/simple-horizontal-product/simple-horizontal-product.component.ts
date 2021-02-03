import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-horizontal-product',
  templateUrl: './simple-horizontal-product.component.html',
  styleUrls: ['./simple-horizontal-product.component.scss']
})
export class SimpleHorizontalProductComponent {

  @Input() product;

}
