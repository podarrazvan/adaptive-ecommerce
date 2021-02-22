import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigsService } from 'src/app/shared/services/database/configs.sevice';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { Brand } from '../../../../shared/interfaces/brand.interface';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss']
})
export class BrandsEditComponent implements OnInit {

  @Input() brands: Brand[];
  @Output() finalBrands = new EventEmitter<Brand[]>();

  constructor(private configsService: ConfigsService,
              private imagesService: ImagesService) { }

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
    this.configsService.updateWebsite('websiteBrands',brand);
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
    this.imagesService.uploadImg(image).subscribe((response) =>{
      this.brandLogoPath = response.url;
      this.valid = true;
    });
  }

}
