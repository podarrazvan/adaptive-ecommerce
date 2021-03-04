import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../../../shared/interfaces/brand.interface';
import { CartItem } from '../../../shared/interfaces/cartItem.interface';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product;

  constructor(private sharedDataService: SharedDataService){}

  brand: Brand;

  ngOnInit() {
    // this.sharedDataService.configs.subscribe((response)=> {
    //   this.brand = response.brands.find( ({ name }) => name === this.product.brand );
    // })
  }

  addToCart(quantity) {
    let cart: CartItem[] = [];
    const cartItem: CartItem = {
      id: this.product._id,
      quantity: quantity.value,
      price: +this.product.price * +quantity.value
    };
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart));
  }

}
