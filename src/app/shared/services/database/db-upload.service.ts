import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';
import { Message } from '../../interfaces/message.interface';

@Injectable()
export class DbUploadService {
  constructor(
    private http: HttpClient
  ) {}
 
  uploadImg(image: File){
    const img = new FormData();
    const date = new Date().getTime();
    const imgName = Math.round((date / 1000)-160000000).toString();
    console.log(imgName);
    img.append("image", image,imgName);
    return this.http.post<{url: string}>('http://localhost:3000/api/images', img);
  }

  createAndStoreProduct( product: Product ) {

    const date = new Date().getTime();
    const productNumber = Math.round(date / 1000);

    const productData: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      img: product.img,
      description: product.description,
      tags: product.tags,
      quantity: product.quantity,
      views:0,
      minPrice: product.minPrice,
      salesWeekTarget: product.salesWeekTarget,
      productNumber: productNumber,
      brand: product.brand,
      model: product.model
    };
    console.log(productData);
    this.http
      .post<{ name: string }>(
        'http://localhost:3000/api/products',
        productData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }

  updateProduct(product: Product, key?: string) {
    if(key == undefined) {
      key = product.key;
    }
    const user = JSON.parse(localStorage.getItem('userData'));
    const productData: Product = {
      title: product.title,
      category: product.category,
      price: product.price,
      img: product.img,
      description: product.description,
      tags: product.tags,
      quantity: product.quantity,
      minPrice: product.minPrice,
      salesWeekTarget: product.salesWeekTarget,
      views: product.views,
      productNumber: product.productNumber,
      brand: product.brand,
      model: product.model
    };
    return this.http.put(
      `https://shop-436e8.firebaseio.com/products/${product.category}/${key}/.json?auth=${user._token}`,
      productData,
      {
        observe: 'response',
      }
    );
  }
  
  addMessage(message: Message) {
    const date = new Date();
    const messageToAdd = {
      firstName: message.firstName,
      lastName: message.lastName,
      email: message.email,
      message: message.message,
      date: date,
      seen: false,
    };
    this.http
      .post(`https://shop-436e8.firebaseio.com/messages/.json`, messageToAdd, {
        observe: 'response',
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
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
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
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
    return this.http.put(
      `https://shop-436e8.firebaseio.com/orders/${id}.json?auth=${user._token}`,
      orderToUpdate,
      {
        observe: 'response',
      }
    );
  }

  updateMessage(message: Message) {
    const user = JSON.parse(localStorage.getItem('userData'));
    const messageToAdd = {
      firstName: message.firstName,
      lastName: message.lastName,
      email: message.email,
      message: message.message,
      date: message.date,
      seen: true,
    };
    this.http
      .put(
        `https://shop-436e8.firebaseio.com/messages/${message.key}/.json?auth=${user._token}`,
        messageToAdd,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error.message);
        }
      );
  }
}
