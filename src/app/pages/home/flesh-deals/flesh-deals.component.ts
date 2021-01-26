import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-flesh-deals',
  templateUrl: './flesh-deals.component.html',
  styleUrls: ['./flesh-deals.component.scss']
})
export class FleshDealsComponent implements OnInit {

  constructor(private dbFetchDataService: DbFetchDataService) { }

  products:Product[] = [];

  productsFound = false;

  ngOnInit(): void {
    this.dbFetchDataService.fetchPromotions().subscribe(responseData => {
      this.products = responseData.products;
      if(this.products.length > 3) {
        this.productsFound = true;
      }
      });
  }

}
