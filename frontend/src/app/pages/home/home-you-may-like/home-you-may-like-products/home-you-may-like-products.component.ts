import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home-you-may-like-products',
  templateUrl: './home-you-may-like-products.component.html',
  styleUrls: ['./home-you-may-like-products.component.scss']
})
export class HomeYouMayLikeProductsComponent {
  @Input() products: IProduct[];
}
