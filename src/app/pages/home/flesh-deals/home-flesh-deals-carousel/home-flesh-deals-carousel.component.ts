import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-flesh-deals-carousel',
  templateUrl: './home-flesh-deals-carousel.component.html',
  styleUrls: ['./home-flesh-deals-carousel.component.scss']
})
export class HomeFleshDealsCarouselComponent implements OnInit {

  @Input() products;

  slides: [[{img?: string, title?:string}]] = [[{}]];
  singleSlide: any;
  index = 0;

  constructor() { }

  ngOnInit(): void {

    this.slides.splice(0,1);

    const elements = 3;
    const lastIndex = 0;
    
    let times = 0;
    let slide : [{img?: string, title?:string}] = [{}];
    slide.splice(0,1);

    console.log(this.slides[this.index]);

    for(let i = lastIndex; i < this.products.length; i++) {
      times ++;
      
      slide.push(this.products[i]);

      if(times === elements) {
        times = 0;
        this.slides.push(slide);
        slide = [{}];
        slide.splice(0,1);
      }
    }
    
    this.singleSlide = this.slides[this.index]; 
  }

  next() {
    this.index == this.singleSlide.length -1 ? this.index = 0 : this.index++;
    this.singleSlide = this.slides[this.index]; 
    console.log(this.index);
  }

  previous() {
    this.index == 0 ? this.index = this.singleSlide.length -1  : this.index--;
    this.singleSlide = this.slides[this.index]; 
    console.log(this.index);
  }

}
