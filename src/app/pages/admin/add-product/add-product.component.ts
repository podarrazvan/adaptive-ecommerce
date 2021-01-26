import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TinyMCEComponent } from 'src/app/shared/components/tinymce/tinymce.component';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { DbDeleteService } from 'src/app/shared/services/database/db-delete.service';
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
    this.onEditMode = this.sharedDataService.productEdit;
    if (this.onEditMode) {
      this.productForm = this.fb.group({
        title: [this.sharedDataService.product.title, Validators.required],
        category: [this.sharedDataService.product.category, Validators.required],
        brand: [this.sharedDataService.product.brand, Validators.required],
        price: [this.sharedDataService.product.price, Validators.required],
        images: '',
        description: [this.sharedDataService.product.description],
        tags: [''],
        quantity: [this.sharedDataService.product.quantity, Validators.required],
        minPrice: [''],
        salesWeekTarget: [''],
        discount:[''],
        discountDays:[''],
        discountExpirationDate:['']
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
        discount:[''],
        discountDays:[''],
        discountExpirationDate:['']
      });
    }
    this.sharedDataService.websiteDetails.subscribe((data) => {
      this.loading = false;
      this.categories = data.categories;
      this.brands = data.brands;
    });
  }

  onSubmit() {
    if (this.productForm.value.discountDays != undefined) {
      //*TODO Try alternative to Date(): https://momentjs.com/ 
      var discountEnd = new Date();
      discountEnd.setDate(new Date().getDate()+ this.productForm.value.discountDays);
      this.productForm.patchValue({
        discountExpirationDate: discountEnd
      })
    } 
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
}
