import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {

  @Input() images: string[];

  index = 0;

  length: number;

  ngOnInit(): void {
    this.length = this.images.length;
  }

  onClick() {
      // To do: img on full screen
  }

  next() {
    this.index === this.length - 1 ? (this.index = 0) : this.index++;
    console.log(this.index);
  }

  previous() {
    console.log(this.index);
    this.index === 0 ? (this.index = this.length - 1) : this.index--;
  }
}
