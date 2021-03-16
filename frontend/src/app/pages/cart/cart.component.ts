import { SharedDataService } from './../../shared/services/shared-data.service';
import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../admin/products/products.service';
import { DiscountService } from 'src/app/shared/services/database/discount.service';

declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, DoCheck {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  cart;
  showCart = false;

  subtotal = 0;
  shipping = 0;
  total = 0;

  paidFor = false;

  constructor(
    private productsService: ProductsService,
    private discountService: DiscountService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    for (let product of products) {
      const key = product.id;
      const quantity = product.quantity;
      this.getProduct(key, quantity);
    }
    this.showCart = true;
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                // description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.sharedDataService.totalCart,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
  // *TODO Use observable
  ngDoCheck() {
    // this.sharedDataService.totalCart = this.total;
    // console.log(this.sharedDataService.totalCart);
  }

  getProduct(key: string, quantity: number) {
    this.cart = [];

    this.productsService.getProduct(key).subscribe((response) => {
      const product = response;
      let price;

      //TODO check auth
      let authenticated = true;
      //
      if (authenticated) {
        this.discountService
          .checkAuthForPromotion(product._id)
          .subscribe((response) => {
            if (response.length > 0) {
              for (let discount of response) {
                price = product.price - discount.cut;
                this.addProductToCart(product, price, quantity);
              }
            } else {
              price = product.price;
              this.addProductToCart(product, price, quantity);
            }
          });
      } else {
        this.discountService
          .checkForPromotion(product._id)
          .subscribe((response) => {
            if (response != null) {
              price = product.price - response.cut;
            } else {
              price = product.price;
            }
            this.addProductToCart(product, price, quantity);
          });
      }
    });
  }

  addProductToCart(product, price, quantity) {
    let itemTotal = 0;
    itemTotal += price * quantity;

    this.cart.push({
      img: product.images[0],
      title: product.title,
      quantity: quantity,
      total: itemTotal,
    });
    this.subtotal += itemTotal;
    this.total = this.subtotal + this.shipping;
  }

  onDelete(index: number) {
    // this.total -= this.cart[index].product.price * this.cart[index].quantity;
    this.cart.splice(index, 1);
    if (this.cart.length === 0) {
      this.sharedDataService.updateCart(true);
      localStorage.removeItem('cart');
      this.router.navigate(['../']);
    } else {
      this.updateLocalstorage();
    }
  }

  increaseQuantity(index: number) {
    if (this.cart[index].quantity <= +this.cart[index].product.quantity) {
      this.cart[index].quantity++;
      this.total += +this.cart[index].product.price;
      this.updateLocalstorage();
    }
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity != 0) {
      this.cart[index].quantity--;
      this.total -= +this.cart[index].product.price;
      this.updateLocalstorage();
    }
  }

  updateLocalstorage() {
    //   let cartUpdated = [];
    //   for (let product of this.cart) {
    //     console.log(product);
    //     cartUpdated.push({
    //       category: product.product.category,
    //       product: product.key,
    //       quantity: product.quantity,
    //     });
    //   }
    //   localStorage.setItem('cart', JSON.stringify(cartUpdated));
  }

  coupon(discount) {
    this.subtotal -= discount;
  }
}
