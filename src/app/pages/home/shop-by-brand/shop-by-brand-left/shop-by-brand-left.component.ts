import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-shop-by-brand-left',
  templateUrl: './shop-by-brand-left.component.html',
  styleUrls: ['./shop-by-brand-left.component.scss']
})
export class ShopByBrandLeftComponent implements OnInit {

  constructor(private sharedDataService: SharedDataService) { }

  brand:{name:string, img:string};

  ngOnInit(): void {
    this.sharedDataService.brand.subscribe(brand => this.brand = brand);
  }

}
