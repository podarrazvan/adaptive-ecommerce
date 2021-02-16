import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { ProductsService } from '../admin/products/products.service';

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
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.productsService.getProduct(key).subscribe((response) => {
      console.log(response);
      this.product = response;
      this.loading = false;
      this.sharedDataService.userDetails.subscribe((response) => {
        this.user = response;
        if (this.user.history.indexOf(key) != -1) {
        } else {
          this.user.history.push(key);
          this.sharedDataService.updateUserDetails(this.user);
          this.productsService.updateProduct(this.product);
        }
      });
    });
  }
}
