import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home-best-sellers-middle',
  templateUrl: './home-best-sellers-middle.component.html',
  styleUrls: ['./home-best-sellers-middle.component.scss']
})
export class HomeBestSellersMiddleComponent {

  product = {images:['https://storage.googleapis.com/flip-global/device-images/apple_iphone-x_space-grey_sell.jpg'],
            category: 'phones', title: "iPhone 12 Pro Max",price:999}

  products = [this.product, this.product, this.product, this.product];

}
