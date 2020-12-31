import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product;

  constructor(private sharedDataService: SharedDataService){}

  brand: Brand;

  ngOnInit() {
    this.sharedDataService.websiteDetails.subscribe((data)=> {
      console.log(data);
      this.brand = data.brands.find( ({ name }) => name === this.product.brand );

    })
  }

}
