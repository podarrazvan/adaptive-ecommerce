import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shared/interfaces/cartItem.interface';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent {
  @Input() product;
  @Output() delete = new EventEmitter();

  addToCart() {
    let cart: CartItem[] = [];
    const cartItem: CartItem = {
      id: this.product._id,
      quantity: 1,
      price: +this.product.price,
      name: this.product.title,
    };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.deleteProduct();
    alert('Product added to cart');
  }

  deleteProduct() {
    this.delete.emit(this.product._id);
  }
}
