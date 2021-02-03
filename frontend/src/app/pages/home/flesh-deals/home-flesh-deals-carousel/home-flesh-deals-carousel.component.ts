import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-flesh-deals-carousel',
  templateUrl: './home-flesh-deals-carousel.component.html',
  styleUrls: ['./home-flesh-deals-carousel.component.scss']
})
export class HomeFleshDealsCarouselComponent implements OnInit {

  @Input() products;

  slides: Slide[][] = [];
  singleSlide: any;
  index = 0;

  ngOnInit(): void {

    const elements = 3;
    const lastIndex = 0;
    
    let times = 0;
    let slide : Slide[] = [];

    for(let i = lastIndex; i < this.products.length; i++) {
      times ++;
      
      const product = this.products[i];

      const progressBar = Math.floor(((product.initialQuantity - product.quantity) * 100) / product.initialQuantity)
      
      Object.assign(product, {progressBar: progressBar})
      
      slide.push(product);

      if(times === elements) {
        times = 0;
        this.slides.push(slide);
        slide = [];
      }
    }
  
    const slideLength = Object.keys(slide).length;
    if (slideLength != 0) {
      for(let i = slideLength - 1; i < elements-1; i++) {
        slide.push(this.products[i]);
      }
      this.slides.push(slide);
    
    }
    this.singleSlide = this.slides[this.index];
  }

  next() {
    // ! must be this.singleSlide.length -1 not -2 !
    this.index == this.singleSlide.length -2 ? this.index = 0 : this.index++;
    this.singleSlide = this.slides[this.index];
  }

  previous() {
    // ! must be this.singleSlide.length -1 not -2 !
    this.index == 0 ? this.index = this.singleSlide.length -2  : this.index--;
    this.singleSlide = this.slides[this.index];
  }

}
export interface Slide {
  img: string;
  title:string;
}