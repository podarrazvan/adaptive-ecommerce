import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-main-categories',
  templateUrl: './home-main-categories.component.html',
  styleUrls: ['./home-main-categories.component.scss'],
})
export class HomeMainCategoriesComponent {
  categories = [];
  numberOfCategories = 9;
  constructor(public sharedDataService: SharedDataService) {
    this.sharedDataService.layout$.subscribe((response) => {
      const categories = response.categories;
      while (this.categories.length < this.numberOfCategories) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        if (this.categories.indexOf(category) === -1) {
          this.categories.push(category);
        }
      }
    });
  }
}
