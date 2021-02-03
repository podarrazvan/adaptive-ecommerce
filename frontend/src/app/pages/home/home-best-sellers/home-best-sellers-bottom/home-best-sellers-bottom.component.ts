import { Component } from '@angular/core';

@Component({
  selector: 'app-home-best-sellers-bottom',
  templateUrl: './home-best-sellers-bottom.component.html',
  styleUrls: ['./home-best-sellers-bottom.component.scss']
})
export class HomeBestSellersBottomComponent {

  product = {title: "iPhone 12 Pro Max", cut:40, img: 'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg', price: 999}
  products = [this.product, this.product, this.product]

}
