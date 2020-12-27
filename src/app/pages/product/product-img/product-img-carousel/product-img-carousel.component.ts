import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-img-carousel',
  templateUrl: './product-img-carousel.component.html',
  styleUrls: ['./product-img-carousel.component.scss']
})
export class ProductImgCarouselComponent implements OnInit {

  @Input() images;
  @Output() index = new EventEmitter<number>();
  
  selectedImgIndex = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  imgSelected(index) {
    this.selectedImgIndex = index;
    console.log(index);
    this.index.emit(index);
  }

}
