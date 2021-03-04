import { Component, OnInit } from '@angular/core';
import { Configs } from '../../../shared/interfaces/website-details';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.scss'],
})
export class WebsiteEditComponent implements OnInit {
  constructor(private sharedDataService: SharedDataService) {}

  showEditTermsOfUse = false;
  showEditAboutUs = false;
  showEditFooter = false;

  configs: Configs;

  coupons: string[] = [];

  ngOnInit(): void {
    this.configs = this.sharedDataService.getWebsiteConfigs();
    // this.sharedDataService.configs.subscribe(response => this.configs = response);
    // this.configsService.getCoupons().subscribe(response=> {
    //   for(let coupon of response) {
    //     this.coupons.push(coupon.code);
    //   }
    // });
  }

  edit(newValue, id, type) {

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

  footerEdit(footer) {
    this.showEditFooter = false
    this.configs.footer.adress = footer.adress;
    this.configs.footer.email = footer.email;
    this.configs.footer.phone = footer.phone;
    //this.configs.footer.program = footer.program;
    this.configs.footer.facebookImage = footer.facebookLogo;
    this.configs.footer.twitterImage = footer.twitterLogo;
    this.configs.footer.instagramImage = footer.instagramLogo;
    // this.configs.youtube.image = footer.youtubeLogo;
  }

  saveInfo() {
    // this.configsService.configs(this.configs);
  }

}
