import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-img-carousel',
  templateUrl: './product-img-carousel.component.html',
  styleUrls: ['./product-img-carousel.component.scss']
})
export class ProductImgCarouselComponent {

  @Input() images;
  @Output() index = new EventEmitter<number>();
  
  selectedImgIndex = 0;

  imgSelected(index) {
    this.selectedImgIndex = index;
    this.index.emit(index);
  }

}
