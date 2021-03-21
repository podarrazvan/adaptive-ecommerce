import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-footer-quick-menu',
  templateUrl: './footer-quick-menu.component.html',
  styleUrls: ['./footer-quick-menu.component.scss']
})
export class FooterQuickMenuComponent {
  constructor(public sharedDataService:SharedDataService){}
}
