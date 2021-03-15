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
    const productNumber = Math.round(date / 1000 - 1615160000);
    const productData: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      images: product.images,
      mainImg: product.mainImg,
      thumbnail: product.thumbnail,
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
      sold: 0,
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

  editProduct(product: Product, _id) {
    this.http.put(`${environment.api}/products/${_id}`, product).subscribe();
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(
      `${environment.api}/products/category/${category}`
    );
  }

  getProduct(key: string) {
    return this.http.get<Product>(`${environment.api}/products/id/${key}`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${environment.api}/products`);
  }

  getPaginatedProducts(page: number, limit: number) {
    return this.http.get<Product[]>(
      `${environment.api}/products/paginated?page=${page}&limit=${limit}`
    );
  }

  getPaginatedProductsByBrand(page: number, limit: number, brand: string) {
    return this.http.get<Product[]>(
      `${environment.api}/products/paginated/brand?page=${page}&limit=${limit}&name=${brand}`
    );
  }

  getLastProducts(limit: number, category: string) {
    return this.http.get<Product[]>(
      `${environment.api}/products/last?limit=${limit}&category=${category}`
    );
  }

  getMainProducts(size: number) {
    return this.http.get<{
      products: Product[];
      mainProduct: Product;
      mainAd: Product;
    }>(`${environment.api}/products/main-products?size=${size}`);
  }

  getYouMayLikeProducts(size: number) {
    return this.http.get<Product[]>(
      `${environment.api}/products/you-may-like?size=${size}`
    );
  }

  getBestSellersProducts() {
    return this.http.get<{
      main: Product;
      middle: Product[];
      bottom: Product[];
      extra: Product[];
    }>(`${environment.api}/products/best-sellers`);
  }

  getTopRatedProducts() {
    return this.http.get<Product[]>(`${environment.api}/products/top-rated`);
  }

  getFeaturedProducts(size: number) {
    return this.http.get<Product[]>(`${environment.api}/products/featured-products?size=${size}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.api}/products/${id}`);
  }
}
