import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss'],
})
export class BrandsEditComponent {
  formGroup: FormGroup;
  brandsHide = true;
  editBrandMode: number;
  editBrandLogo: boolean;
  brandLogoPath: string;
  valid: boolean;
  brands; //! NOT OK

  constructor(
    private fb: FormBuilder,
    private configsService: ConfigsService,
    private imagesService: ImagesService,
    private adminService: AdminService,
    public sharedDataService: SharedDataService
  ) {
    this.buildFormGroup(fb);
    this.sharedDataService.layout$.subscribe((response) => {
      this.brands = response.brands; //! DON'T USE brands, USE brandsForm()
    });
  }

  get brandsForm() {
    return this.adminService.adminFormGroup.get('configs.brands') as FormArray;
  }

  get brandName() {
    return this.formGroup.get('name').value;
  }

  addNewValue() {
    this.brandsForm.push(this.createBrand());
    this.brands.push({ name: this.brandName, image: this.brandLogoPath }); //! NOT OK!
    this.configsService.updateWebsite('websiteBrands', this.brands).subscribe();
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
    const img = this.brands[index].image.split('/')[5];
    this.brandsForm.value.splice(index, 1);
    this.brands.splice(index, 1); //! NOT OK!
    this.configsService.updateWebsite('websiteBrands', this.brands).subscribe();
    this.imagesService.deletePhoto(img).subscribe();
  }

  edit(index) {
    let image;
    if (this.editBrandLogo) {
      image = this.brandLogoPath;
      if (image === undefined) {
        image = this.brands[index].image;
      }
    } else {
      image = this.brands[index].image;
    }
    this.brands[index] = { name: this.brandName, image }; //! NOT OK!
    this.configsService
      .updateWebsite('websiteBrands', this.brands)
      .subscribe(() => {
        this.editBrandMode = null;
        this.editBrandLogo = false;
      });
  }

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
