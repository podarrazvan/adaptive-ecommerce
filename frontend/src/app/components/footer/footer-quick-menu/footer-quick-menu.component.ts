import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-footer-quick-menu',
  templateUrl: './footer-quick-menu.component.html',
  styleUrls: ['./footer-quick-menu.component.scss']
})
export class FooterQuickMenuComponent {
  categories;
  constructor(public sharedDataService:SharedDataService){
    sharedDataService.layout$.subscribe((layout) => {
      const categories = layout.categories;
      this.categories = categories.slice(0,4);//TODO get 4 categories according to the user's preferences!
    });
  }
}
