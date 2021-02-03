import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteDetails } from '../../../../shared/interfaces/website-details';
import { DbUploadService } from '../../../../shared/services/database/db-upload.service';

@Component({
  selector: 'app-footer-edit',
  templateUrl: './footer-edit.component.html',
  styleUrls: ['./footer-edit.component.scss'],
})
export class FooterEditComponent implements OnInit {

  @Input() websiteDetails: WebsiteDetails;
  @Output() close = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
  ) {}

  footerEditForm: FormGroup;

  facebookLogoPath: string;
  instagramLogoPath: string;
  twitterLogPath: string;

  loading = true;

  ngOnInit(): void {
      try {

        this.instagramLogoPath = this.websiteDetails.instagramImage;
        this.facebookLogoPath = this.websiteDetails.facebookImage;
        this.twitterLogPath = this.websiteDetails.twitterImage;
      }
      catch {
        ///
      }

      // if(this.facebookLogoPath){
      //   this.dbDeleteService.deletePhoto(this.facebookLogoPath);
      // }

      // if(this.instagramLogoPath){
      //   this.dbDeleteService.deletePhoto(this.instagramLogoPath);
      // }

      // if(this.twitterLogPath){
      //   this.dbDeleteService.deletePhoto(this.twitterLogPath);
      // }
      try {
        this.footerEditForm = this.fb.group({
          adress: [this.websiteDetails.footer.adress, Validators.required],
          phone: [this.websiteDetails.footer.phone, Validators.required],
          email: [this.websiteDetails.footer.email, Validators.required],
          // program: [this.websiteDetails.program, Validators.required],
          facebookLink: [this.websiteDetails.facebookUrl],
          instagramLink: [this.websiteDetails.instagramUrl],
          twitterLink: [this.websiteDetails.twitterUrl],
          facebookLogo: '',
          twitterLogo: '',
          instagramLogo: '',
        });
      } catch {
        this.footerEditForm = this.fb.group({
          adress: ["", Validators.required],
          phone: ["", Validators.required],
          email: ["", [Validators.required, Validators.email]],
          // program: ["",Validators.required],
          facebookLink: ['',Validators.required],
          instagramLink: ['',Validators.required],
          twitterLink: ['',Validators.required],
          facebookLogo: '',
          twitterLogo: '',
          instagramLogo: '',
        });
      }


  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.footerEditForm.patchValue({
      facebookLogo: this.facebookLogoPath,
      twitterLogo: this.twitterLogPath,
      instagramLogo: this.instagramLogoPath,
    });
    this.close.emit(this.footerEditForm.value);
  }

   facebookLogo(event: any) {
    this.dbUploadService.uploadImg(event).subscribe(responsePath => this.facebookLogoPath = responsePath.url);
  }

   twitterLogo(event: any) {
    this.dbUploadService.uploadImg(event).subscribe(responsePath => this.twitterLogPath = responsePath.url);
  }

   instagramLogo(event: any) {
   this.dbUploadService.uploadImg(event).subscribe(responsePath => this.instagramLogoPath = responsePath.url);
  }
}
