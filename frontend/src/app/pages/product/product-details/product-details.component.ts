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

  constructor(
    private sharedDataService: SharedDataService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.sharedDataService.layout$.subscribe((response) => {
      this.brand = response.brands.find(
        ({ name }) => name === this.product.brand
      );
    });
  }

  addToCart(quantity) {
    let cart: CartItem[] = [];
    const cartItem: CartItem = {
      id: this.product._id,
      quantity: quantity.value,
      price: +this.product.price * +quantity.value,
      name: this.product.title,
    };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addFavorite() {
    this.sharedDataService.userDetails.subscribe((response) => {
      let user = response;
      const id = this.product._id;
      if (user.favorites.indexOf(id) === -1) {
        user.favorites.push(id);
        this.sharedDataService.updateUserDetails(user);
        if(user.email != undefined) {
          this.usersService.updateFavorites(user.email, user.favorites).subscribe(()=>{
            alert('Added to favorites!');
          });
        }
      }
    });
  }
}
