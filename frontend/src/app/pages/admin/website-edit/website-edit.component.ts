import { Component } from '@angular/core';
import { Coupon } from 'src/app/shared/interfaces/coupon.interface';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent {
  showEditTermsOfUse = false;
  showEditPages = false;
  showEditFooter = false;

  coupons: Coupon[] = [];

  constructor(
    public sharedDataService: SharedDataService,
    private discountService: DiscountService
  ) {
    this.discountService.getCoupons().subscribe((coupons) => {
      this.coupons = coupons;
    });
  }

  editTermsOfUse(): void {
    this.showEditTermsOfUse = true;
  }

  closeTermsOfUseEdit(): void {
    this.showEditTermsOfUse = false;
  }

  footerEdit(): void {
    this.showEditFooter = false;
  }
}
