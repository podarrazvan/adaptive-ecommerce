import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-products',
  templateUrl: './bottom-products.component.html',
  styleUrls: ['./bottom-products.component.scss']
})
export class BottomProductsComponent  {

  product1 = {img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrLV8locO81b2WCuM3H29R6IF4SMpfa95QuJlygT-z6EbWVp4yoodzSiz6IXf18FKg8kIkA04&usqp=CAc", title:"Samsung Galaxy S20", price:999};

  product2 = {img: "https://s13emagst.akamaized.net/products/32294/32293558/images/res_88cbf99e4a9995e798a9fe13a533e345.jpg?width=450&height=450&hash=E4BCB52AE771F568E51B9A8ADDB6617E", title:"Samsung Galaxy Note 20", price:1100};

  product3 = {img: "https://s13emagst.akamaized.net/products/30019/30018358/images/res_04135f21a2f8fb0914ef9ef489b2773b.jpg?width=450&height=450&hash=8707D4EBB77157F269C389E7D67544FE", title:" iPhone SE 2", price:500};

  featuredProducts = [this.product1, this.product2, this.product3];

  topRatedProducts = [this.product3, this.product2, this.product1];

  topSellingProducts = [this.product2, this.product3, this.product1];

}
