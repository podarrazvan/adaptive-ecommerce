import { Component, OnDestroy } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { TinyMCEComponent } from '../../../shared/components/tinymce/tinymce.component';
import { Brand } from '../../../shared/interfaces/brand.interface';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { AdminService } from '../admin.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnDestroy {
  public tinyMCE: TinyMCEComponent;

  loading = true; //TODO
  autoMode = false;

  addDiscount = false;

  tags: string[] = [];
  tag: string;

  images: string[] = [];
  mainImg: string;
  thumbnail: string;

  products = [];
  categories: Categories[];
  brands: Brand[];

  notComplete = true;

  onEditMode: boolean;

  constructor(
    public sharedDataService: SharedDataService,
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private adminService: AdminService
  ) {}

  get productForm() {
    return this.adminService.productFormGroup.get('product');
  }

  onSubmit() {
    if(this.productForm.valid) {
      if (this.images != undefined) {
        this.productForm.patchValue({
          images: this.images,
          tags: this.tags,
          thumbnail: this.thumbnail,
          mainImg: this.mainImg
        });
        if (this.sharedDataService.productEdit) {
          this.productsService.editProduct(
            this.productForm.value,
            this.sharedDataService.product._id
          );
        } else {
          this.productsService.createAndStoreProduct(this.productForm.value);
        }
        this.notComplete = false;
        this.tags = [];
        this.images = [];
        // this.productForm.reset();
      } else {
        alert('Please add at last one photo!');
      }
    } else {
      alert('Invalid form!');
    }
  }

  upload(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((responseData) => {
      this.images.push(responseData.url);
    });
  }

  uploadThumbnail(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((responseData) => {
      this.thumbnail = responseData.url;
    });
  }

  uploadMainImg(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.imagesService.uploadImg(image).subscribe((responseData) => {
      this.mainImg = responseData.url;
    });
  }

  deleteThumbnail(img) {
    this.imagesService.deletePhoto(img);
    this.thumbnail = null;
  }

  deleteMainImg(img) {
    this.imagesService.deletePhoto(img);
    this.mainImg = null;
  }

  deletePhoto(img, i) {
    this.imagesService.deletePhoto(img);
    this.images.splice(i, 1);
  }

  addTag(tag) {
    this.tags.push(tag.value);
  }

  deleteTag(index) {
    this.tags.splice(index, 1);
  }

  ckeditorContentChanged(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    this.productForm.get('description').patchValue(div.innerHTML);
  }

  ngOnDestroy(): void {
    this.sharedDataService.product = null;
    this.sharedDataService.productEdit = false;
    if (this.notComplete && !this.onEditMode) {
      for (let img of this.images) {
        this.imagesService.deletePhoto(img);
      }
    }
  }
}
