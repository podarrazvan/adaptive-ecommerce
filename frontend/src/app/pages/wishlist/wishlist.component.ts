import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {


  product = {title:"iPhone 12 Pro Max",price: 999, avalabile: true, img: 'https://s13emagst.akamaized.net/products/33382/33381513/images/res_9c502e664bde724a8f8e180bbe1582c9.jpg?width=450&height=450&hash=B5A412328A8BC51D19BCDA6A18A27080'};

  products = [this.product,this.product];

}
