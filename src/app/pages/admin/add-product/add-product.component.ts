import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TinyMCEComponent } from 'src/app/shared/components/tinymce/tinymce.component';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { DbDeleteService } from 'src/app/shared/services/database/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { DbUploadService } from 'src/app/shared/services/database/db-upload.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
    private dbFetchDataService: DbFetchDataService,
    private dbDeleteService: DbDeleteService,
    private sharedData: SharedDataService
  ) {}
  public tinyMCE: TinyMCEComponent;

  productForm: FormGroup;
  autoMode = false;

  tags: string[] = [];
  tag: string;

  images: string[] = [];

  products = [];
  categories: Category[];

  notComplete = true;

  onEditMode: boolean;

  ngOnInit(): void {
    this.onEditMode = this.sharedData.productEdit;
    if (this.onEditMode) {
      this.productForm = this.fb.group({
        title: [this.sharedData.product.title, Validators.required],
        category: [this.sharedData.product.category, Validators.required],
        price: [this.sharedData.product.price, Validators.required],
        img: '',
        description: [this.sharedData.product.description],
        tags: [''],
        quantity: [this.sharedData.product.quantity, Validators.required],
        minPrice: [''],
        salesWeekTarget: [''],
      });
      this.tags = this.sharedData.product.tags;
      this.images = this.sharedData.product.img;
    } else {
      this.productForm = this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        price: ['', Validators.required],
        img: '',
        description: [''],
        tags: [''],
        quantity: ['', Validators.required],
        minPrice: [''],
        salesWeekTarget: [''],
      });
    }
    this.getCategories();
  }

  onSubmit() {
    if (this.images != undefined) {
      this.productForm.patchValue({
        img: this.images,
        tags: this.tags,
      });
      if (this.sharedData.productEdit) {
        this.dbUploadService
          .updateProduct(this.productForm.value, this.sharedData.product.key)
          .subscribe((response) => console.log(response));
      } else {
        console.log(this.productForm.value);
        this.dbUploadService.createAndStoreProduct(
          this.productForm.value
        );
      }
      this.notComplete = false;
      this.tags = [];
      this.images = [];
      // this.productForm.reset();
    } else {
      alert('Please add at last one photo!');
    }
  }

  upload(img: any) {
    const image = (img.target as HTMLInputElement).files[0];
    this.dbUploadService
      .uploadImg(image)
      .subscribe((responseData) => {
        console.log(responseData);
        this.images.push(responseData.url);
      });
  }

  deletePhoto(img, i) {
    this.dbDeleteService.deletePhoto(img);
    this.images.splice(i, 1);
  }

  addTag(tag) {
    this.tags.push(tag.value);
  }

  deleteTag(index) {
    this.tags.splice(index, 1);
  }

  getCategories() {
    this.categories = [];
    this.dbFetchDataService.fetchCategories().subscribe((categories) => {
      for (let category of categories) {
        this.categories.push(category);
      }
      return this.categories;
    });
  }

  ckeditorContentChanged(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    this.productForm.get('description').patchValue(div.innerHTML);
  }

  ngOnDestroy(): void {
    this.sharedData.product = null;
    this.sharedData.productEdit = false;
    if (this.notComplete && !this.onEditMode) {
      for (let img of this.images) {
        this.dbDeleteService.deletePhoto(img);
      }
    }
  }
}
