import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() product;
  @Input() index;
  @Output() deleteIndex = new EventEmitter<number>();
  @Output() newTotal = new EventEmitter<UpdatePoduct>();
  quantityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(){
    this.quantityForm = this.fb.group({
      quantity: this.fb.control(this.product.quantity),
    });
  }

  get quantity() {
    const id = this.product._id;
    const oldPrice = this.product.total;
    const quantity = this.quantityForm.get('quantity').value;
    this.product.total = +quantity * +this.product.price;
    const total = this.product.total - oldPrice;
    this.newTotal.emit({id,total, quantity})
    return quantity;
  }

  onDelete() {
    this.deleteIndex.emit(this.index);
  }
}
interface UpdatePoduct {
  id: string;
  total: number;
  quantity: number;
}
