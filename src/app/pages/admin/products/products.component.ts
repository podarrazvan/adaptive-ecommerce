import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteAlertService } from 'src/app/shared/components/delete-alert/delete-alert.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { DbDeleteService } from 'src/app/shared/services/database/db-delete.service';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

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

  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private deleteAlertService: DeleteAlertService,
    private dbDeleteService: DbDeleteService
  ) {}

  mobile: boolean;

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

  ngOnInit(): void {
    this.mobile = this.sharedDataService.mobile;
    this.getProducts(1,10);
  }


  getProducts(page, limit) {
    this.dbFetchDataService.fetchPaginatedProducts(page,limit).subscribe(responseData => this.products = responseData.results);
  }

  onDelete(id, index, img) {
    this.deleteAlert = true;
    this.deleteAlertService.deleteProduct.subscribe((data) => {
      switch (data) {
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
    this.dbDeleteService
      .deleteProduct(this.productToDelete.id)
      .subscribe(() => {
        for (let img of this.productToDelete.img) {
          this.dbDeleteService.deletePhoto(img);
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
