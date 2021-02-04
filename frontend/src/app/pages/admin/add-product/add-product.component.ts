import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TinyMCEComponent } from '../../../shared/components/tinymce/tinymce.component';
import { Brand } from '../../../shared/interfaces/brand.interface';
import { DbDeleteService } from '../../../shared/services/database/db-delete.service';
import { DbUploadService } from '../../../shared/services/database/db-upload.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
    private dbDeleteService: DbDeleteService,
    private sharedDataService: SharedDataService
  ) {}
  public tinyMCE: TinyMCEComponent;

  loading = true;

  productForm: FormGroup;
  autoMode = false;

  addDiscount = false;

  tags: string[] = [];
  tag: string;

  images: string[] = [];

  products = [];
  categories: string[];
  brands: Brand[];

  notComplete = true;

  onEditMode: boolean;

  ngOnInit(): void {
    this.buildFormGroup();
    this.sharedDataService.websiteDetails.subscribe((response) => {
      this.loading = false;
      this.categories = response.categories;
      this.brands = response.brands;
    });
  }

  onSubmit() {
    if (this.images != undefined) {
      this.productForm.patchValue({
        images: this.images,
        tags: this.tags,
      });
      if (this.sharedDataService.productEdit) {
        // this.dbUploadService
        //   .updateProduct(this.productForm.value, this.sharedDataService.product.key)
        //   .subscribe((response) => console.log(response));
      } else {
        this.dbUploadService.createAndStoreProduct(this.productForm.value);
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
    this.dbUploadService.uploadImg(image).subscribe((responseData) => {
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
        this.dbDeleteService.deletePhoto(img);
      }
    }
  }

  private buildFormGroup() {
    this.onEditMode = this.sharedDataService.productEdit;
    if (this.onEditMode) {
      this.productForm = this.fb.group({
        title: [this.sharedDataService.product.title, Validators.required],
        category: [
          this.sharedDataService.product.category,
          Validators.required,
        ],
        brand: [this.sharedDataService.product.brand, Validators.required],
        price: [this.sharedDataService.product.price, Validators.required],
        images: '',
        description: [this.sharedDataService.product.description],
        tags: [''],
        quantity: [
          this.sharedDataService.product.quantity,
          Validators.required,
        ],
        minPrice: [''],
        salesWeekTarget: [''],
      });
      this.tags = this.sharedDataService.product.tags;
      this.images = this.sharedDataService.product.images;
    } else {
      this.productForm = this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        brand: ['', Validators.required],
        price: ['', Validators.required],
        images: '',
        description: [''],
        tags: [''],
        quantity: ['', Validators.required],
        minPrice: [''],
        salesWeekTarget: [''],
      });
    }
  }
}
