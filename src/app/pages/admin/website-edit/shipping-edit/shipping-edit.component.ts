import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shipping } from 'src/app/shared/interfaces/shipping.interface';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-shipping-edit',
  templateUrl: './shipping-edit.component.html',
  styleUrls: ['./shipping-edit.component.scss']
})
export class ShippingEditComponent implements OnInit {
  @Input() shippings: Shipping[];
  @Output() newShippings = new EventEmitter<Shipping[]>();

  shippingHide = true;

  constructor(private dbWebsiteEditService: DbWebsiteEditService) { }

  editShippingMode: number;

  ngOnInit(): void {
  }

  delete(index){}

  edit(){}

  addNewValue(form) {
    this.shippings.push(form.value);
    console.log(this.shippings);
    this.dbWebsiteEditService.updateWebsite('websiteShipping',form.value);
    this.newShippings.emit(this.shippings);
  }
}
