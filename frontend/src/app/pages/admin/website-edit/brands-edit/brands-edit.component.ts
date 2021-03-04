import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss'],
})
export class BrandsEditComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private imagesService: ImagesService,
    private adminService: AdminService
  ) {
    this.buildFormGroup(fb);
  }

  brandsHide = true;
  editBrandMode: number;
  brandLogoPath: string;
  valid: boolean;

  get brandsForm() {
    return this.adminService.adminFormGroup.get('configs.brands') as FormArray;
  }

  get brandName() {
    return this.formGroup.get('name').value;
  }

  addNewValue() {
    this.brandsForm.push(this.createBrand());
    this.configsService.updateWebsite('websiteBrands', this.brandsForm.value);
  }

  public createBrand(): FormGroup {
    const image = this.brandLogoPath;
    const name = this.brandName;
    return this.fb.group({
      name,
      image,
    });
  }

  delete(index) {
    this.brandsForm.value.splice(index, 1);
    this.configsService.updateWebsite('websiteBrands', this.brandsForm.value);
  }

  edit(index) {}

  brandLogo(img: Event) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((response) => {
      this.brandLogoPath = response.url;
      this.valid = true;
    });
  }

  private buildFormGroup(fb) {
    this.formGroup = fb.group({
      name: fb.control(null),
      image: fb.control(null),
    });
  }
}
