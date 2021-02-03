import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-main-bottom-products',
  templateUrl: './home-main-bottom-products.component.html',
  styleUrls: ['./home-main-bottom-products.component.scss']
})
export class HomeMainBottomProductsComponent {

  @Input() products;

}
