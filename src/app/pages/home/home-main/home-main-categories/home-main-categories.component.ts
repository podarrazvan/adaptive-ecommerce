import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-main-categories',
  templateUrl: './home-main-categories.component.html',
  styleUrls: ['./home-main-categories.component.scss']
})
export class HomeMainCategoriesComponent implements OnInit {

  @Input() categories;

  constructor() { }

  ngOnInit(): void {
  }

}
