import { Component, OnInit } from '@angular/core';
import { WebsiteDetails } from '../../../shared/interfaces/website-details';
import { DbWebsiteEditService } from '../../../shared/services/database/db-website-edit.sevice';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent implements OnInit {
  constructor(private dbWebsiteEditService: DbWebsiteEditService,
              private sharedDataService: SharedDataService) {}

  editName = false;

  showEditTermsOfUse = false;

  showEditAboutUs = false;

  showEditFooter = false;

  websiteDetails: WebsiteDetails;

  coupons: string[] = [];

  ngOnInit(): void {
    this.sharedDataService.websiteDetails.subscribe(data => this.websiteDetails = data);
    this.dbWebsiteEditService.fetchCoupons().subscribe(data => {
      for(let coupon of data) {
        this.coupons.push(coupon.coupon.code);
      }
    });
  }

  edit(newValue, id, type) {

  }
  deleteCategory(index) {
    this.websiteDetails.categories.splice(index, 1);
  }

  deleteBrand(index) {
    this.websiteDetails.brands.splice(index, 1);
  }

  editTermsOfUse() {
    this.showEditTermsOfUse = true;
  }

  closeTermsOfUseEdit() {
    this.showEditTermsOfUse = false;
  }

  editAboutUs() {
    this.showEditAboutUs = true;
  }

  closeEditAboutUs() {
    this.showEditAboutUs = false;
  }

  setName(name) {
    this.websiteDetails.name = name.value;
    this.dbWebsiteEditService.updateWebsite('websiteName',name.value);
    this.editName = false;
  }

  footerEdit(footer) {
    this.showEditFooter = false
    this.websiteDetails.footer.adress = footer.adress;
    this.websiteDetails.footer.email = footer.email;
    this.websiteDetails.footer.phone = footer.phone;
    this.websiteDetails.footer.program = footer.program;
    this.websiteDetails.facebookImage = footer.facebookLogo;
    this.websiteDetails.twitterImage = footer.twitterLogo;
    this.websiteDetails.instagramImage = footer.instagramLogo;
    // this.websiteDetails.youtube.image = footer.youtubeLogo;
  }

  saveInfo() {
    // this.dbWebsiteEditService.websiteDetails(this.websiteDetails);
  }

}
