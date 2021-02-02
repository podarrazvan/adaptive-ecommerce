import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {

  @Input() product;
  @Input() index;
  @Output() deleteIndex = new EventEmitter<number>();


  onDelete() {
    this.deleteIndex.emit(this.index);
  }

}
