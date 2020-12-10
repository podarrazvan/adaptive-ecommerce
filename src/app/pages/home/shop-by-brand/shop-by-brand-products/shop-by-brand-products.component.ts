import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by-brand-products',
  templateUrl: './shop-by-brand-products.component.html',
  styleUrls: ['./shop-by-brand-products.component.scss']
})
export class ShopByBrandProductsComponent implements OnInit {

  constructor() { }

  product = {title: "iPhone 12 Pro Max", cut:40, img: 'https://s1.flanco.ro/catalog/product/cache/368/image/400x400/9df78eab33525d08d6e5fb8d27136e95/1/4/143545_2_1.jpg', price: 999}
  products = [this.product, this.product,this.product,this.product]

  ngOnInit(): void {
  }

}
