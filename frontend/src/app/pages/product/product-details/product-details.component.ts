import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../../../shared/interfaces/brand.interface';
import { CartItem } from '../../../shared/interfaces/cartItem.interface';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { UsersService } from '../../admin/users/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product;
  brand: Brand;
  addedToFavorite = false;
  user;
  id;

  constructor(
    private sharedDataService: SharedDataService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.userDetails$.subscribe((response) => {
      this.user = response;
      const id = this.product._id;
      if (this.user.favorites.indexOf(id) === -1) {
        this.addedToFavorite = false;
      } else {
        this.addedToFavorite = true;
      }
    });
    this.sharedDataService.layout$.subscribe((response) => {
      this.brand = response.brands.find(
        ({ name }) => name === this.product.brand
      );
    });
  }

  addToCart(quantity): void {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) {
      cart = [];
    }
    const exists = this.productExists(this.product._id, cart);
    if (!exists) {
      const cartItem: CartItem = {
        id: this.product._id,
        quantity: quantity.value,
        price: +this.product.price * +quantity.value,
        name: this.product.title,
      };
      cart.push(cartItem);
      this.sharedDataService.setCart(cart);
      alert('Added to cart!');
    } else {
      alert('Already in cart!');
    }
  }

  productExists(id, cart): boolean {
    for (const product of cart) {
      if (product.id === id) {
        return true;
      }
    }
    return false;
  }

  addFavorite(): void {
    const id = this.product._id;
    if (!this.addedToFavorite) {
      this.user.favorites.push(id);
      if (this.user.email !== undefined) {
        this.usersService
          .updateFavorites(this.user.email, this.user.favorites)
          .subscribe(() => {
            alert('Added to favorites!');
            this.sharedDataService.updateUserDetails(this.user);
            this.addedToFavorite = true;
          });
      } else {
        alert('Added to favorites!');
        this.sharedDataService.updateUserDetails(this.user);
        this.addedToFavorite = true;
      }
    }
  }
}
