import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(
    private imagesService: ImagesService,
    private adminService: AdminService,
    public sharedDataService: SharedDataService,
    private configsService: ConfigsService
  ) {
  }

  get footerForm() {
    return this.adminService.adminFormGroup.get(['configs', 'footer']);
  }

  get scheduleForm() {
    return this.adminService.adminFormGroup.get('schedule');
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
      url:twitterUrl,
      image:twitterImage,
    };
    const facebook = {
      url:facebookUrl,
      image:facebookImage,
    };
    const instagram = {
      url:instagramUrl,
      image:instagramImage,
    };
    //! send a request only for what you change!
    this.configsService.updateWebsite('websiteFooter', footer).subscribe();
    this.configsService.updateWebsite('websiteTwitter', twitter).subscribe();
    this.configsService.updateWebsite('websiteFacebook', facebook).subscribe();
    this.configsService.updateWebsite('websiteInstagram', instagram).subscribe();
    this.configsService.updateWebsite('websiteScheduleForm', this.scheduleForm.value).subscribe();
    //!
    this.close.emit(this.footerForm.value);
  }
}
