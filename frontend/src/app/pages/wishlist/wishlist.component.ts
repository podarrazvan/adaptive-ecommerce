import { Component } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ProductsService } from '../admin/products/products.service';
import { UsersService } from '../admin/users/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  products: Product[];
  user: User;
  constructor(
    private sharedDataService: SharedDataService,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {
    this.sharedDataService.userDetails$.subscribe((response) => {
      this.user = response;
      this.products = [];
      for (let product of response.favorites) {
        this.productsService.getProduct(product).subscribe((response) => {
          this.products.push(response);
        });
      }
    });
  }

  deletedProduct(product) {
    const index = this.products.indexOf(product)
    this.user.favorites.splice(index, 1);
    this.products.splice(index, 1);
    this.sharedDataService.updateUserDetails(this.user);
    this.usersService.updateFavorites(this.user.email, this.user.favorites).subscribe();
  }
}
