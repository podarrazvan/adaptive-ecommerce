import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;

  fullStars: number;
  halfStar: boolean;

  times;

  ngOnInit(): void {
    this.rating % 2 === 0 ? this.halfStar = false : this.halfStar = true;
    this.fullStars = Math.floor(this.rating);
   this.times = new Array(this.fullStars);
  }
}