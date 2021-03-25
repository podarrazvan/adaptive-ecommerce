import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/shared/interfaces/categories.interface';
import { IProductModel } from 'src/app/shared/interfaces/product-model.interface';
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
  tagsForm: FormGroup;
  modelsForm: FormGroup;

  loading = true; //TODO
  autoMode = false;

  addDiscount = false;

  tags: string[] = [];

  images: string[] = [];
  mainImg: string;
  thumbnail: string;

  products = [];
  categories: Categories[];
  brands: Brand[];

  notComplete = true;

  onEditMode: boolean;

  models: IProductModel[] = [];

  constructor(
    public sharedDataService: SharedDataService,
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.buildForms();
  }

  get productForm() {
    return this.adminService.productFormGroup.get('product');
  }

  get tag() {
    return this.tagsForm.get('tag').value;
  }

  get name() {
    return this.modelsForm.get('name').value;
  }

  get price() {
    return this.modelsForm.get('price').value;
  }

  onSubmit() {
    if (this.images != undefined) {
      this.productForm.patchValue({
        images: this.images,
        tags: this.tags,
        thumbnail: this.thumbnail,
        mainImg: this.mainImg,
        productModels: this.models,
      });
      if (this.productForm.valid) {
        if (this.sharedDataService.productEdit) {
          this.productsService.editProduct(
            this.productForm.value,
            this.sharedDataService.product._id
          );
        } else {
          //! DELETE THIS!
          // const title = this.productForm.value.title;
          // for (let i = 0; i < 5; i++) {
          //   this.productForm.patchValue({
          //     title: title + ` (${i})`,
          //   });
          //   this.productsService.createAndStoreProduct(this.productForm.value);
          // }
          //!
          this.productsService.createAndStoreProduct(this.productForm.value);
        }
        this.notComplete = false;
        this.tags = [];
        this.models = [];
        this.images = [];
        this.thumbnail = null;
        this.mainImg = null;
        this.productForm.get('description').patchValue(null); //! NOT WORKING!
        this.productForm.reset();
      } else {
        alert('Invalid form!');
      }
    } else {
      alert('Please add at last one photo!');
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
    this.imagesService.deletePhoto(img).subscribe();
    this.thumbnail = null;
  }

  deleteMainImg(img) {
    this.imagesService.deletePhoto(img).subscribe();
    this.mainImg = null;
  }

  deletePhoto(img, i) {
    this.imagesService.deletePhoto(img).subscribe();
    this.images.splice(i, 1);
  }

  addTag() {
    if (this.tagsForm.valid) {
      this.tags.push(this.tag);
      this.tagsForm.reset();
    }
  }

  deleteTag(index) {
    this.tags.splice(index, 1);
  }

  addModel() {
    if (this.modelsForm.valid) {
      const model = {
        name: this.name,
        price: this.price,
      };
      this.models.push(model);
      this.modelsForm.reset();
    }
  }

  deleteModel(index) {
    this.models.splice(index, 1);
  }

  ckeditorContentChanged(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    this.productForm.get('description').patchValue(div.innerHTML);
  }

  private buildForms() {
    this.tagsForm = this.fb.group({
      tag: ['', Validators.required],
    });
    this.modelsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
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
