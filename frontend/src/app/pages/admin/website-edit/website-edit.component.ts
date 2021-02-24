import { Component, OnInit } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { WebsiteDetails } from '../../../shared/interfaces/website-details';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent implements OnInit {
  constructor(private configsService: ConfigsService,
              private sharedDataService: SharedDataService) {}

  editName = false;

  showEditTermsOfUse = false;

  showEditAboutUs = false;

  showEditFooter = false;

  websiteDetails: WebsiteDetails;

  coupons: string[] = [];

  ngOnInit(): void {
    this.websiteDetails = this.sharedDataService.getWebsiteConfigs();
    // this.sharedDataService.websiteDetails.subscribe(response => this.websiteDetails = response);
    // this.configsService.getCoupons().subscribe(response=> {
    //   for(let coupon of response) {
    //     this.coupons.push(coupon.code);
    //   }
    // });
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
    this.configsService.updateWebsite('websiteName',name.value);
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
    // this.configsService.websiteDetails(this.websiteDetails);
  }

}