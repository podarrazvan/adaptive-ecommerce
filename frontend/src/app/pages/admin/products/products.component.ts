import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from 'src/app/shared/services/database/discount.service';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { IProduct } from '../../../shared/interfaces/product.interface';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  componentFactoryResolver: any;
  alertHost: any;
  closeSub: any;
  productToAddOnHomepage: IProduct;
  idOfProductToAddOnHomepage: string;

  products: IProduct[] = [];
  productsData;

  categories: string[];
  category;

  showEditProduct = false;

  deleteAlert: boolean;
  productToDelete;
  productToDeleteIndex;

  discountProductId: string;
  showDiscount = false;

  currentPage = 1;
  limit = 10;
  haveNext = true;

  loading = true;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private productsService: ProductsService,
    private imagesService: ImagesService,
    private discountService: DiscountService
  ) {}

  ngOnInit(): void {
    this.getProducts(this.currentPage, 10);
  }

  getProducts(page, limit) {
    this.loading = true;
    this.productsService
      .getPaginatedProducts(page, limit)
      .subscribe((response) => {
        if (response.next === undefined) {
          this.haveNext = false;
        } else {
          this.haveNext = true;
        }
        this.checkPrice(response.results);
      });
  }

  onDelete(confirmed) {
    if (confirmed) {
      this.deleteAlert = false;
      this.onProductDeleted();
    } else {
      this.deleteAlert = false;
    }
  }

  openDeleteAlert(index) {
    this.productToDeleteIndex = index;
    this.deleteAlert = true;
  }

  openEdit(type: string, product: IProduct) {
    this.showEditProduct = true;
  }

  close(type: string) {
    this.showEditProduct = false;
  }

  openEditProduct(product: IProduct) {
    this.sharedDataService.product = product;
    this.sharedDataService.productEdit = true;
    this.router.navigate(['admin', 'add-product']);
  }

  onProductDeleted() {
    const product = this.products[this.productToDeleteIndex];
    this.productsService
      .deleteProduct(product._id)
      .subscribe(() => {
        const mainImg = product.mainImg.split('/');
        this.imagesService
          .deletePhoto(mainImg[5])
          .subscribe();
          const thumbnail = product.thumbnail.split('/');
        this.imagesService
          .deletePhoto(thumbnail[5])
          .subscribe();
        for (let img of product.images) {
          const image = img.split('/');
          this.imagesService.deletePhoto(image[5]).subscribe();
        }
      });
    this.products.splice(this.productToDeleteIndex, 1);
    this.deleteAlert = false;
  }

  onCancelDelete() {
    this.deleteAlert = false;
  }

  openDiscount(id) {
    this.discountProductId = id;
    this.showDiscount = true;
  }

  previousPage() {
    this.currentPage--;
    this.getProducts(this.currentPage, this.limit);
  }

  nextPage() {
    this.currentPage++;
    this.getProducts(this.currentPage, this.limit);
  }

  checkPrice(products) {
    this.products = [];
    for (let product of products) {
      this.discountService
        .checkForPromotion(product._id)
        .subscribe((response) => {
          let price;
          if (response != null) {
            price = product.price - response.cut;
          } else {
            price = product.price;
          }
          product.price = price;
          this.products.push(product);
        });
    }
    this.loading = false;
  }
}
