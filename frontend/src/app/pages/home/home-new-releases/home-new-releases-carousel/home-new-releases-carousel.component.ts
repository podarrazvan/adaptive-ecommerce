import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-new-releases-carousel',
  templateUrl: './home-new-releases-carousel.component.html',
  styleUrls: ['./home-new-releases-carousel.component.scss']
})
export class HomeNewReleasesCarouselComponent implements OnInit {

  @Input() products;

  slides: Slide[][] = [[]];
  singleSlide: any;
  index = 0;

  ngOnInit(): void {

    const elements = 3;
    const lastIndex = 0;
    
    let times = 0;
    let slide: Slide[] = [];


    for(let i = lastIndex; i < this.products.length; i++) {
      times ++;
      
      slide.push(this.products[i]);

      if(times === elements) {
        times = 0;
        this.slides.push(slide);
        slide = [];
      }
    }
    
    this.singleSlide = this.slides[this.index]; 
  }

  next() {
    this.index == this.singleSlide.length -1 ? this.index = 0 : this.index++;
    this.singleSlide = this.slides[this.index];
  }

  previous() {
    this.index == 0 ? this.index = this.singleSlide.length -1  : this.index--;
    this.singleSlide = this.slides[this.index]; 
  }

}

export interface Slide {
  img: string;
  title:string;
  price: number;
  category: string;
}