import { Component } from '@angular/core';
import { SharedDataService } from '../../../../shared/services/shared-data.service';

@Component({
  selector: 'app-shop-by-brand-left',
  templateUrl: './shop-by-brand-left.component.html',
  styleUrls: ['./shop-by-brand-left.component.scss'],
})
export class ShopByBrandLeftComponent{
  constructor(public sharedDataService: SharedDataService) {}
}
