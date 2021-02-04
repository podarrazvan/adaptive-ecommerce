import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';
import { User } from '../../shared/interfaces/user.interface';
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
    private dbGetDataService: DbGetDataService,
    private dbUploadService: DbUploadService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const key = this.route.snapshot.params['key'];
    this.dbGetDataService.getProduct(key).subscribe((response) => {
      console.log(response);
      this.product = response;
      this.loading = false;
      this.sharedDataService.userDetails.subscribe((response) => {
        this.user = response;
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
