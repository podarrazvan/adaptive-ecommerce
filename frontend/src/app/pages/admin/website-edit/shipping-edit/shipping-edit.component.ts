import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shipping } from '../../../../shared/interfaces/shipping.interface';
import { DbWebsiteEditService } from '../../../../shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-shipping-edit',
  templateUrl: './shipping-edit.component.html',
  styleUrls: ['./shipping-edit.component.scss']
})
export class ShippingEditComponent {
  @Input() shippings: Shipping[];
  @Output() newShippings = new EventEmitter<Shipping[]>();

  shippingHide = true;

  constructor(private dbWebsiteEditService: DbWebsiteEditService) { }

  editShippingMode: number;


  delete(index){}

  edit(){}

  addNewValue(form) {
    this.shippings.push(form.value);
    this.dbWebsiteEditService.updateWebsite('websiteShipping',form.value);
    this.newShippings.emit(this.shippings);
  }
}
