import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shipping } from 'src/app/shared/interfaces/shipping.interface';

@Component({
  selector: 'app-shipping-edit',
  templateUrl: './shipping-edit.component.html',
  styleUrls: ['./shipping-edit.component.scss']
})
export class ShippingEditComponent implements OnInit {
  @Input() shippings: Shipping[];
  @Output() newShippings = new EventEmitter<Shipping[]>();

  shippingHide = true;

  constructor() { }

  editShippingMode: number;

  ngOnInit(): void {
  }

  delete(index){}

  edit(){}

  addNewValue(form) {
    this.shippings.push(form.value);
    console.log(this.shippings);
    this.newShippings.emit(this.shippings);
  }
}
