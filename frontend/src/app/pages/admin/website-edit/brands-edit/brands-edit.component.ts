import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from '../../../../shared/interfaces/brand.interface';
import { DbUploadService } from '../../../../shared/services/database/db-upload.service';
import { DbWebsiteEditService } from '../../../../shared/services/database/db-website-edit.sevice';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss']
})
export class BrandsEditComponent implements OnInit {

  @Input() brands: Brand[];
  @Output() finalBrands = new EventEmitter<Brand[]>();

  constructor(private dbUploadService: DbUploadService,
              private dbWebsiteEditService: DbWebsiteEditService) { }

  brandsHide = true;
  editBrandMode: number;
  newBrands: Brand[];
  brandLogoPath: string;
  valid:boolean;

  ngOnInit(): void {
    this.newBrands = this.brands;
  }

  addNewValue(brandName) {
    const brand: Brand = {
      image: this.brandLogoPath,
      name: brandName.value
    }
    this.newBrands.push(brand);
    this.dbWebsiteEditService.updateWebsite('websiteBrands',brand);
    this.finalBrands.emit(this.newBrands);
  }

  delete(index) {
    this.newBrands.splice(index, 1);
    this.finalBrands.emit(this.newBrands);
  }

  edit(index) {

  }

  brandLogo(img: Event) {
    const image = (img.target as HTMLInputElement).files[0];
    this.dbUploadService.uploadImg(image).subscribe((responsePath) =>{
      this.brandLogoPath = responsePath.url;
      this.valid = true;
    });
  }

}
