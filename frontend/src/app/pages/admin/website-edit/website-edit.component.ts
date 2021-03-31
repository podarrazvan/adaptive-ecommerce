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

  editTermsOfUse() {
    this.showEditTermsOfUse = true;
  }

  closeTermsOfUseEdit() {
    this.showEditTermsOfUse = false;
  }

  footerEdit(footer) {
    this.showEditFooter = false;
    // !! tre alta tehnica aici
    // this.configs.footer.adress = footer.adress;
    // this.configs.footer.email = footer.email;
    // this.configs.footer.phone = footer.phone;
    //this.configs.footer.program = footer.program;
    // this.configs.footer.facebookImage = footer.facebookLogo;
    // this.configs.footer.twitterImage = footer.twitterLogo;
    // this.configs.footer.instagramImage = footer.instagramLogo;
    // this.configs.youtube.image = footer.youtubeLogo;
  }
}
