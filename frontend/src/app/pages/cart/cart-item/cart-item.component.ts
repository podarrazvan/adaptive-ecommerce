import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() product;
  @Input() index;
  @Output() deleteIndex = new EventEmitter<number>();
  @Output() newTotal = new EventEmitter<UpdatePoduct>();

  constructor(private sharedDataService: SharedDataService) {}

  onQuantityChange(value): void {
    this.sharedDataService.updateCartItemQuantity(
      this.index,
      value,
      this.product
    );
  }

  onDelete(): void {
    this.deleteIndex.emit(this.index);
  }
}
interface UpdatePoduct {
  id: string;
  total: number;
  quantity: number;
}
