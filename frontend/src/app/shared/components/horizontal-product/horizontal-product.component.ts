import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-product',
  templateUrl: './horizontal-product.component.html',
  styleUrls: ['./horizontal-product.component.scss']
})
export class HorizontalProductComponent implements OnInit {

  @Input() product;
  @Input() small: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
