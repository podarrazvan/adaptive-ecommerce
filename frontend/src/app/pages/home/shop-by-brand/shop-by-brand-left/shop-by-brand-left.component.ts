import { Component, Input } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand.interface';

@Component({
  selector: 'app-shop-by-brand-left',
  templateUrl: './shop-by-brand-left.component.html',
  styleUrls: ['./shop-by-brand-left.component.scss'],
})
export class ShopByBrandLeftComponent{
  @Input() brand: Brand;
}
