import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-home-main-categories',
  templateUrl: './home-main-categories.component.html',
  styleUrls: ['./home-main-categories.component.scss'],
})
export class HomeMainCategoriesComponent {
  categories = [];
  constructor(public sharedDataService: SharedDataService) {
    this.sharedDataService.layout$.subscribe((response) => {
      const categories = response.categories;
      const numberOfCategories = categories.length > 9 ? 9 : categories.length;
      while (this.categories.length < numberOfCategories) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        if (this.categories.indexOf(category) === -1) {
          this.categories.push(category);
        }
      }
    });
  }
}
