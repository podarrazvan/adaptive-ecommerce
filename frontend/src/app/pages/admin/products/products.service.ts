import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Injectable()
export class ProductsService {
  error: any;
  constructor(private http: HttpClient) {}

  createAndStoreProduct(product: Product) {
    const date = new Date().getTime();
    const productNumber = Math.round(date / 1000);
    const productData: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      images: product.images,
      description: product.description,
      tags: product.tags,
      quantity: product.quantity,
      views: 0,
      minPrice: product.minPrice,
      salesWeekTarget: product.salesWeekTarget,
      initialQuantity: product.quantity,
      productNumber: productNumber,
      brand: product.brand,
      model: product.model,
    };
    this.http
      .post<{ name: string }>(`${environment.api}/products`, productData, {
        observe: 'response',
      })
      .subscribe();
  }

  updateProduct(product: Product) {
    product.views = +product.views + 1;
    this.http
      .put(`${environment.api}/products/${product._id}`, product)
      .subscribe();
  }

  
  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(
      `${environment.api}/products/category/${category}`
    );
  }

  getProduct(key: string) {
    return this.http.get<Product>(
      `${environment.api}/products/id/${key}`
    );
  }

  getProducts() {
    return this.http.get<Product[]>(
      `${environment.api}/products`
    );
  }

  getPaginatedProducts(page: number, limit: number) {
    return this.http.get<Product[]>(
      `${environment.api}/products/paginated?page=${page}&limit=${limit}`
    );
  }

  deleteProduct(id: string) {
    // const user = JSON.parse(localStorage.getItem('userData'));
    return this.http.delete(
      `${environment.api}/products/${id}`
    );
  }
}
