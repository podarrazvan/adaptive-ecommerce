import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-img',
  templateUrl: './product-img.component.html',
  styleUrls: ['./product-img.component.scss']
})
export class ProductImgComponent implements OnInit {

  @Input() product;
  mainImgIndex;

  constructor() { }

  ngOnInit(): void {
  }

}
