import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Footer } from 'src/app/shared/interfaces/footer.interface';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-footer-edit',
  templateUrl: './footer-edit.component.html',
  styleUrls: ['./footer-edit.component.scss'],
})
export class FooterEditComponent {
  @Output() close = new EventEmitter<FormGroup>();

  facebookImagePath: string;
  instagramImagePath: string;
  twitterImagePath: string;

  loading = true;
  footer: Footer;

  constructor(
    private imagesService: ImagesService,
    private adminService: AdminService,
    private sharedDataService: SharedDataService,
    private configsService: ConfigsService
  ) {
    const response = this.sharedDataService.getWebsiteConfigs();
    this.footer = response.footer;
  }

  get footerForm() {
    return this.adminService.adminFormGroup.get('configs.footer');
  }

  onClose() {
    this.close.emit();
  }

  facebookLogo(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((response) => (this.facebookImagePath = response.url));
  }

  twitterLogo(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((response) => (this.twitterImagePath = response.url));
  }

  instagramLogo(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((response) => (this.instagramImagePath = response.url));
  }

  onSubmit() {
    this.footerForm.patchValue({
      facebookImage: this.facebookImagePath,
      twitterImage: this.twitterImagePath,
      instagramImage: this.instagramImagePath,
    });
    const {
      email,
      phone,
      adress,
      facebookUrl,
      facebookImage,
      instagramUrl,
      instagramImage,
      twitterUrl,
      twitterImage,
    } = this.footerForm.value;

    const footer = {
      email,
      phone,
      adress,
    };
    const twitter = {
      twitterUrl,
      twitterImage,
    };
    const facebook = {
      facebookUrl,
      facebookImage,
    };
    const instagram = {
      instagramUrl,
      instagramImage,
    };
    this.configsService.updateWebsite('websiteFooter', footer);
    this.configsService.updateWebsite('websiteTwitter', twitter);
    this.configsService.updateWebsite('websiteFacebook', facebook);
    this.configsService.updateWebsite('websiteInstagram', instagram);
    this.close.emit(this.footerForm.value);
  }
}
