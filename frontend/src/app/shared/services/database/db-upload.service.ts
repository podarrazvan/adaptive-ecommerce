import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';
import { Message } from '../../interfaces/message.interface';
import { Discount } from '../../interfaces/discount.interface';

@Injectable()
export class DbUploadService {
  constructor(private http: HttpClient) {}

  uploadImg(image: File) {
    const img = new FormData();
    const date = new Date().getTime();
    const imgName = Math.round(date / 1000 - 160000000).toString();
    img.append('image', image, imgName);
    return this.http.post<{ url: string }>(
      'http://localhost:3000/api/images',
      img
    );
  }

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

  createDiscount(discount: Discount) {
    const discountData = {
      price: discount.price,
      expirationDate: discount.expirationDate,
      productId: discount.id,
    };
    this.http.post(`${environment.api}/discount`, discountData).subscribe();
  }

  addMessage(message: Message) {
    const date = new Date();
    const messageToAdd = {
      name: message.name,
      subject: message.subject,
      email: message.email,
      message: message.message,
      date: date,
      seen: false,
    };
    return this.http
      .post(`${environment.api}/contact`, messageToAdd, {
        observe: 'response',
      });     
  }

  addOrder(order: Order) {
    const date = new Date();
    const orderToAdd = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: 'new',
      date: date,
    };
    this.http
      .post(`https://shop-436e8.firebaseio.com/orders/.json`, orderToAdd, {
        observe: 'response',
      })
      .subscribe();
  }

  updateOrder(order: Order, status: string, id: string) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const orderToUpdate = {
      cart: order.cart,
      adress: order.adress,
      total: order.total,
      status: status,
      date: order.date,
    };
    return this.http.put(``, orderToUpdate, {
      observe: 'response',
    });
  }

  updateMessage(message: Message) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const messageToAdd = {
      name: message.name,
      subject: message.subject,
      email: message.email,
      message: message.message,
      date: message.date,
      seen: true,
    };
    this.http
      .put(`${environment.api}/contact/${message._id}`, messageToAdd, {
        observe: 'response',
      })
      .subscribe();
  }
}
