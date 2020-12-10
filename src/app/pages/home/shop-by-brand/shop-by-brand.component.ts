import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by-brand',
  templateUrl: './shop-by-brand.component.html',
  styleUrls: ['./shop-by-brand.component.scss']
})
export class ShopByBrandComponent implements OnInit {

  brandName;

  constructor() { }

  ngOnInit(): void {
  }

}
