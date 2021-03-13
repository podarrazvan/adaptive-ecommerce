import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { ProductsService } from '../admin/products/products.service';
import { UsersService } from '../admin/users/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product;
  loading = true;
  user: User;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private sharedDataService: SharedDataService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.productsService.getProduct(key).subscribe((response) => {
      this.product = response;
      this.loading = false;
      this.sharedDataService.userDetails.subscribe((response) => {
        this.user = response;
        const product = { product: key };
        const exists = this.productExists(key);
        if (!exists) {
          this.user.history.push(product);
          this.sharedDataService.updateUserDetails(this.user);
          this.productsService.updateProduct(this.product);
          if (this.user.email != undefined) {
            this.usersService
              .updateHistory(this.user.email, this.user.history)
              .subscribe();
          }
        }
      });
    });
  }
  productExists(key) {
    for (let product of this.user.history) {
      if (product.product == key) {
        return true;
      }
    }
    return false;
  }
}
