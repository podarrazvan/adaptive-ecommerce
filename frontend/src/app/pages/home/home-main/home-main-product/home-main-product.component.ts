import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-main-product',
  templateUrl: './home-main-product.component.html',
  styleUrls: ['./home-main-product.component.scss']
})
export class HomeMainProductComponent {

  @Input() product;

}
