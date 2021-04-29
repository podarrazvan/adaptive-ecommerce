import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slide } from 'src/app/pages/home/flesh-deals/home-flesh-deals-carousel/home-flesh-deals-carousel.component';

@Component({
  selector: 'app-product-img-carousel',
  templateUrl: './product-img-carousel.component.html',
  styleUrls: ['./product-img-carousel.component.scss'],
})
export class ProductImgCarouselComponent implements OnInit {
  @Input() images;
  @Output() selectedImg = new EventEmitter<string>();

  slides: Slide[][] = [];
  singleSlide: any;
  index = 0;

  ngOnInit(): void {
    const elements = 2;

    let times = 0;
    let slide: Slide[] = [];

    for (let i = 0; i < this.images.length; i++) {
      times++;
      slide.push(this.images[i]);

      if (times === elements) {
        times = 0;
        this.slides.push(slide);
        slide = [];
      }
    }
    const slideLength = slide.length;
    if (slideLength !== 0) {
      for (let i = slideLength - 1; i < elements - 1; i++) {
        slide.push(this.images[i]);
      }
      this.slides.push(slide);
    }
    this.singleSlide = this.slides[this.index];
  }

  imgSelected(img): void {
    this.selectedImg.emit(img);
  }

  next(): void {
    this.index === this.singleSlide.length - 1 ? (this.index = 0) : this.index++;
    this.singleSlide = this.slides[this.index];
  }

  previous(): void {
    this.index === 0 ? (this.index = this.singleSlide.length - 1) : this.index--;
    this.singleSlide = this.slides[this.index];
  }
}
