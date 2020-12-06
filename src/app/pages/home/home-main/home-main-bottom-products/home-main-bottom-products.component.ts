import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-main-bottom-products',
  templateUrl: './home-main-bottom-products.component.html',
  styleUrls: ['./home-main-bottom-products.component.scss']
})
export class HomeMainBottomProductsComponent implements OnInit {

  @Input() products;

  constructor() { }

  ngOnInit(): void {
  }

}
