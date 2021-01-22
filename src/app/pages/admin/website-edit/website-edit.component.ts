import { Component, OnInit } from '@angular/core';
import { WebsiteDetails } from 'src/app/shared/interfaces/website-details';
import { DbWebsiteEditService } from 'src/app/shared/services/database/db-website-edit.sevice';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

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
  // addNewValue(value, type) {
  //   if (value.value != '' && type === 'category') {
  //     console.log(value.value);
  //     this.websiteDetails.categories.push(value.value);
  //     console.log(this.websiteDetails.categories);
  //   }
  // }

  delete(index, id, type) {
    if (type === 'category') {
    this.websiteDetails.categories.splice(index, 1);
    }
     
  }


  edit(newValue, id, type) {
  
  }

  // getCategories() {
  //   this.categories = [];
  //   this.dbFetchDataService
  //     .fetchCategories()
  //     .subscribe((categories) => {
  //       this.category = categories;
  //       for (let category of categories) {
  //         this.categories.push(category);
  //       }
  //       return this.categories;
  //     });
  // }

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
    console.log(name);
    this.websiteDetails.name = name.value;
    this.dbWebsiteEditService.updateWebsite('websiteName',name.value);
    this.editName = false;
  }

  footerEdit(footer) {
    this.showEditFooter = false
    this.websiteDetails.adress = footer.adress;
    this.websiteDetails.email = footer.email;
    this.websiteDetails.phone = footer.phone;
    this.websiteDetails.program = footer.program;
    this.websiteDetails.facebookImage = footer.facebookLogo;
    this.websiteDetails.twitterImage = footer.twitterLogo;
    this.websiteDetails.instagramImage = footer.instagramLogo;
    // this.websiteDetails.youtube.image = footer.youtubeLogo;
  }

  saveInfo() {
    // this.dbWebsiteEditService.websiteDetails(this.websiteDetails);
  }

}
