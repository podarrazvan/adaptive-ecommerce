import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-main-product',
  templateUrl: './home-main-product.component.html',
  styleUrls: ['./home-main-product.component.scss']
})
export class HomeMainProductComponent implements OnInit {

  @Input() product;

  constructor() { }

  ngOnInit(): void {
  }

}
