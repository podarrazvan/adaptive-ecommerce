import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() product;
  @Input() index;
  @Output() deleteIndex = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.product);
  }

  onDelete() {
    this.deleteIndex.emit(this.index);
  }

}
