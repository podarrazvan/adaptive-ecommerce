import { SharedDataService } from './../../shared/services/shared-data.service';
import { Component } from '@angular/core';
import { ProductsService } from '../admin/products/products.service';
import { DiscountService } from 'src/app/shared/services/database/discount.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart = [];
  updatedCart = [];
  cartLength: number;
  showCart = false;
  quantity;
  total = 0;

  rightText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum, nisl at laoreet vehicula, sapien enim volutpat massa, at placerat metus libero sit amet ipsum. Mauris semper viverra nulla, eget tristique erat rutrum vitae. Etiam ornare placerat quam condimentum faucibus. Proin rhoncus nulla in diam mollis facilisis. Mauris ut mauris vitae sem rutrum pretium non in est. Ut posuere ipsum ac ligula accumsan, at porttitor leo tincidunt. Curabitur et ornare metus, nec aliquet tellus. Donec quis malesuada tortor. Donec tempus vel erat vel gravida. Donec dictum tincidunt pellentesque. Quisque malesuada efficitur nisi, id pretium neque congue at. Nulla ac pharetra tellus. Fusce convallis tristique eleifend. Donec blandit tristique enim eu dapibus. Morbi nec vehicula augue, a viverra nisl.';

  constructor(
    private productsService: ProductsService,
    private discountService: DiscountService,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.getCart();
    this.getCart();
  }

  getCart() {
    this.total = 0;
    const coupon = JSON.parse(localStorage.getItem('coupon'));
    if(coupon != null) {
      this.total -= coupon.discount;
    }
    this.sharedDataService.cart$.subscribe((response) => {
      const products = response;
      this.cartLength = products.length;
      if (products.length === 0) {
        localStorage.removeItem('cart');
      }
      for (let product of products) {
        const key = product.id;
        const quantity = product.quantity;
        const price = product.price;
        this.getProduct(key, quantity, price);
      }
      this.showCart = true;
    });
  }

  getProduct(id: string, quantity: number, price: number) {
    this.cart = [];

    this.productsService.getProduct(id).subscribe((response) => {
      const product = response;
      if (product != null) {
        if (product.price != price) {
          //TODO check auth
          let authenticated = true;
          //
          if (authenticated) {
            this.discountService
              .checkAuthForPromotion(product._id)
              .subscribe((response) => {
                if (response != null) {
                  this.addProductToCart(product, price, quantity, product._id);
                } else {
                  this.addProductToCart(
                    product,
                    product.price,
                    quantity,
                    product._id
                  );
                }
              });
          } else {
            this.discountService
              .checkForPromotion(product._id)
              .subscribe((response) => {
                if (response != null) {
                  this.addProductToCart(product, price, quantity, product._id);
                }
              });
          }
        } else {
          this.addProductToCart(product, product.price, quantity, product._id);
        }
      }
    });
  }

  addProductToCart(product, price, quantity, id) {
    let itemTotal = 0;
    itemTotal += price * quantity;
    this.cart.push({
      id,
      img: product.images[0],
      name: product.title,
      quantity: quantity,
      total: itemTotal,
      price,
    });
    if (this.cart.length === this.cartLength) {
      this.updatedCart = this.cart;
    }
    this.total += itemTotal;
    if(this.total < 0) {
      this.total = 0;
    }
  }

  onDelete(index: number) {
    this.total -= this.cart[index].total;
    this.cart.splice(index, 1);
    if (this.cart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      this.sharedDataService.setCart(this.cart);
    }
  }


  coupon(coupon) {
    localStorage.setItem('coupon', JSON.stringify(coupon))
    this.total -= coupon.discount;
    if(this.total < 0) {
      this.total = 0;
    }
  }

  //! find a better way!
  findIndex(id) {
    let index = 0;
    for (let item of this.cart) {
      if (item._id === id) {
        return index;
      }
      index++;
    }
  }
  //!
}
