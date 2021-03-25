import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home-main-ad',
  templateUrl: './home-main-ad.component.html',
  styleUrls: ['./home-main-ad.component.scss']
})
export class HomeMainAdComponent {
  @Input() ad: IProduct;
}
