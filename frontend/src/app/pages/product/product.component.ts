import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { DbFetchDataService } from '../../shared/services/database/db-fetch-data.service';
import { DbUploadService } from '../../shared/services/database/db-upload.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

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
    private dbFetchDataService: DbFetchDataService,
    private dbUploadService: DbUploadService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.dbFetchDataService.fetchProduct(key).subscribe((productData) => {
      this.product = productData.product[0];
      this.loading = false;
      this.sharedDataService.userDetails.subscribe((data) => {
        this.user = data;
        if (this.user.history.indexOf(key) != -1) {
        } else {
          this.user.history.push(key);
          this.sharedDataService.updateUserDetails(this.user);
          this.dbUploadService.updateProduct(this.product);
        }
      });
    });
  }
}
