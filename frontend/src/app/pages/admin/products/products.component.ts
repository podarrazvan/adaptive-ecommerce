import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/shared/services/database/images.service';
import { DeleteAlertService } from '../../../shared/components/delete-alert/delete-alert.service';
import { Product } from '../../../shared/interfaces/product.interface';
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
  productToAddOnHomepage: Product;
  idOfProductToAddOnHomepage: string;

  products: Product[];
  productsData;

  categories: string[];
  category;

  showEditProduct = false;

  deleteAlert: boolean;
  productToDelete;
  productToDeleteIndex;

  discountProductId: string;
  showDiscount = false;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private deleteAlertService: DeleteAlertService,
    private productsService: ProductsService,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.getProducts(1, 10);
  }

  getProducts(page, limit) {
    this.productsService
      .getPaginatedProducts(page, limit)
      .subscribe((response) => {
        this.products = response.results;
      });
  }

  onDelete(id, index, img) {
    this.deleteAlert = true;
    this.deleteAlertService.deleteProduct.subscribe((response) => {
      switch (response) {
        case true:
          this.productToDeleteIndex = index;
          this.productToDelete = { id: id, img: img };
          this.deleteAlert = false;
          this.onProductDeleted();
          break;
        case false:
          this.deleteAlert = false;
          break;
      }
    });
  }

  openEdit(type: string, product: Product) {
    this.showEditProduct = true;
  }

  close(type: string) {
    this.showEditProduct = false;
  }

  openEditProduct(product: Product) {
    this.sharedDataService.product = product;
    this.sharedDataService.productEdit = true;
    this.router.navigate(['admin', 'add-product']);
  }

  onProductDeleted() {
    this.productsService
      .deleteProduct(this.productToDelete.id)
      .subscribe(() => {
        for (let img of this.productToDelete.img) {
          this.imagesService.deletePhoto(img);
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
}
