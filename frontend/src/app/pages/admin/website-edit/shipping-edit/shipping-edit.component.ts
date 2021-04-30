import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Shipping } from '../../../../shared/interfaces/shipping.interface';

@Component({
  selector: 'app-shipping-edit',
  templateUrl: './shipping-edit.component.html',
  styleUrls: ['./shipping-edit.component.scss'],
})
export class ShippingEditComponent {
  @Input() shippings: Shipping[];
  @Output() newShippings = new EventEmitter<Shipping[]>();
  shippingFormGroup: FormGroup;
  shippingHide = true;
  editShippingMode: number;

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    public sharedDataService: SharedDataService
  ) {
    this.buildFormGroup(fb);
  }

  get name(): any {
    return this.shippingFormGroup.get('name');
  }

  get price(): any {
    return this.shippingFormGroup.get('price');
  }

  addNewValue(): void {
    const shipping = {
      name: this.name.value,
      price: this.price.value,
    };
    this.shippings.push(shipping);
    this.updateDb();
  }

  edit(index): void {
    this.editShippingMode = null;
    const shipping = {
      name: this.name.value,
      price: this.price.value,
    };
    this.shippings[index] = shipping;
    this.updateDb();
  }

  delete(index): void {
    this.shippings.splice(index, 1);
    this.updateDb();
  }

  updateDb(): void {
    this.sharedDataService.layout$.subscribe((response) => {
      const id = response._id;
      this.configsService
        .updateWebsite('websiteShipping', this.shippings, id)
        .subscribe();
      this.newShippings.emit(this.shippings);
    });
  }

  private buildFormGroup(fb): void {
    this.shippingFormGroup = fb.group({
      name: fb.control(null),
      price: fb.control(null),
    });
  }
}
