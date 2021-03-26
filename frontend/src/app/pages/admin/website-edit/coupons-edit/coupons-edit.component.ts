import { Component, EventEmitter, Output } from '@angular/core';
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
  coupons: Coupon[] = [];
  @Output() newCoupons = new EventEmitter<Coupon[]>();

  couponFormGroup: FormGroup;
  couponsArray: Coupon[];

  couponsHide = true;

  editCouponMode: number;

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private adminService: AdminService,
    private sharedDataService: SharedDataService
  ) {
    this.buildFormGroup(fb);
    this.sharedDataService.layout$.subscribe((layout) => {
      this.coupons = layout.coupons;
      for (let coupon of layout.coupons) {
        this.couponsForm.push(this.createCoupon(coupon.code, coupon.discount));
      }
    });
  }

  get code() {
    return this.couponFormGroup.get('code');
  }

  get discount() {
    return this.couponFormGroup.get('discount');
  }

  get couponsForm() {
    return this.adminService.adminFormGroup.get('configs.coupons') as FormArray;
  }

  addNewValue() {
    const code = this.code;
    const discount = this.discount;
    this.couponsForm.push(this.createCoupon(code, discount));
    this.sharedDataService.layout$.subscribe((response) => {
      const id = response._id;
      this.configsService
        .updateWebsite('websiteCoupons', this.couponsForm.value, id)
        .subscribe();
      this.couponFormGroup.reset();
    });
  }

  delete(index) {
    this.couponsForm.value.splice(index, 1);
    this.sharedDataService.layout$.subscribe((response) => {
      const id = response._id;
      this.configsService
        .updateWebsite('websiteCoupons', this.couponsForm.value, id)
        .subscribe();
    });
  }

  edit(index) {
    this.editCouponMode = null;
    const coupon = {
      code: this.code.value,
      discount: this.discount.value,
    };
    this.couponsForm.value[index] = coupon;
    this.coupons[index] = coupon;
    this.sharedDataService.layout$.subscribe((response) => {
      const id = response._id;
      let layout = response;
      layout.coupons = this.couponsForm.value;
      this.configsService
        .updateWebsite('websiteCoupons', layout.coupons, id)
        .subscribe(() => {
          if (response != layout) {
            this.sharedDataService.setLayout(layout);
          }
        });
    });
  }

  public createCoupon(code, discount): FormGroup {
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
