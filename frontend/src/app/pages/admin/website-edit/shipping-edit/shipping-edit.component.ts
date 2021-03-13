import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { Shipping } from '../../../../shared/interfaces/shipping.interface';

@Component({
  selector: 'app-shipping-edit',
  templateUrl: './shipping-edit.component.html',
  styleUrls: ['./shipping-edit.component.scss']
})
export class ShippingEditComponent {
  @Input() shippings: Shipping[];
  @Output() newShippings = new EventEmitter<Shipping[]>();

  shippingHide = true;

  constructor(private configsService: ConfigsService) { }

  editShippingMode: number;


  delete(index){}

  edit(){}

  addNewValue(form) {
    this.shippings.push(form.value);
    this.configsService.updateWebsite('websiteShipping',form.value).subscribe();
    this.newShippings.emit(this.shippings);
  }
}
