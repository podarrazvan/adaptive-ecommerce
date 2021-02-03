import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-get-recommended-product',
  templateUrl: './get-recommended-product.component.html',
  styleUrls: ['./get-recommended-product.component.scss']
})
export class GetRecommendedProductComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
