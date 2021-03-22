import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { Coupon } from '../../../../shared/interfaces/coupon.interface';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
})
export class CouponsEditComponent {
  @Input() coupons: Coupon[] = [];
  @Output() newCoupons = new EventEmitter<Coupon[]>();

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private adminService: AdminService,
    private sharedDataService: SharedDataService
  ) {
    this.buildFormGroup(fb);
  }

  couponFormGroup: FormGroup;
  couponsArray: Coupon[];

  couponsHide = true;

  editCouponMode: number;

  get code() {
    return this.couponFormGroup.get('code');
  }

  get discount() {
    return this.couponFormGroup.get('discount');
  }

  get couponsForm() {
    return this.adminService.adminFormGroup.get('configs.couons') as FormArray;
  }

  addNewValue() {
    this.couponsForm.push(this.createCoupon());
    this.sharedDataService.layout$.subscribe((response) => {
      const id = response._id;
    this.configsService.updateWebsite('websiteCoupons', this.couponsForm.value, id).subscribe();
    this.couponFormGroup.reset();
  });
  }

  delete(index) {
    this.couponsForm.value.splice(index, 1);
    this.sharedDataService.layout$.subscribe((response) => {
          const id = response._id;
    this.configsService.updateWebsite('websiteCoupons', this.couponsForm.value, id).subscribe();
  });
  }

  edit(index) {}

  public createCoupon(): FormGroup {
    const code = this.code;
    const discount = this.discount;
    return this.fb.group({
      code,
      discount,
    });
  }

  private buildFormGroup(fb) {
    this.couponFormGroup = fb.group({
      code: fb.control(null),
      discount: fb.control(null),
    });
  }
}
