import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-img-carousel',
  templateUrl: './product-img-carousel.component.html',
  styleUrls: ['./product-img-carousel.component.scss']
})
export class ProductImgCarouselComponent implements OnInit {

  @Input() images;

  constructor() { }

  ngOnInit(): void {
  }

}
