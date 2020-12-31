import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product;
  loading = true;

  constructor(private dbFetchDataService:DbFetchDataService,
              private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const key =  this.route.snapshot.params['key'];
    this.dbFetchDataService.fetchProduct(key).subscribe((productData) => {
      this.product = productData.product[0];
      this.loading = false;
    });
  }

}
