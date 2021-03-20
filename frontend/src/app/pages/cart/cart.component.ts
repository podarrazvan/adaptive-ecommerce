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
  quantity;
  subtotal = 0;
  shipping = 0;
  total = 0;

  rightText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum, nisl at laoreet vehicula, sapien enim volutpat massa, at placerat metus libero sit amet ipsum. Mauris semper viverra nulla, eget tristique erat rutrum vitae. Etiam ornare placerat quam condimentum faucibus. Proin rhoncus nulla in diam mollis facilisis. Mauris ut mauris vitae sem rutrum pretium non in est. Ut posuere ipsum ac ligula accumsan, at porttitor leo tincidunt. Curabitur et ornare metus, nec aliquet tellus. Donec quis malesuada tortor. Donec tempus vel erat vel gravida. Donec dictum tincidunt pellentesque. Quisque malesuada efficitur nisi, id pretium neque congue at. Nulla ac pharetra tellus. Fusce convallis tristique eleifend. Donec blandit tristique enim eu dapibus. Morbi nec vehicula augue, a viverra nisl.';

  paidFor = false;

  constructor(
    private productsService: ProductsService,
    private discountService: DiscountService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    if (products.length === 0) {
      this.router.navigate(['../']);
    }
    for (let product of products) {
      const key = product.id;
      const quantity = product.quantity;
      const price = product.price;
      this.getProduct(key, quantity, price);
    }
    this.showCart = true;
    // paypal
    //   .Buttons({
    //     createOrder: (data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             // description: this.product.description,
    //             amount: {
    //               currency_code: 'USD',
    //               value: this.sharedDataService.totalCart,
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     onApprove: async (data, actions) => {
    //       const order = await actions.order.capture();
    //       this.paidFor = true;
    //     },
    //     onError: (err) => {
    //       console.log(err);
    //     },
    //   })
    //   .render(this.paypalElement.nativeElement);
  }
  // *TODO Use observable
  ngDoCheck() {
    // this.sharedDataService.totalCart = this.total;
    // console.log(this.sharedDataService.totalCart);
  }

  getProduct(id: string, quantity: number, price: number) {
    this.cart = [];

    this.productsService.getProduct(id).subscribe((response) => {
      const product = response;
      if (product.price != price) {
        // //TODO check auth
        let authenticated = true;
        //
        if (authenticated) {
          this.discountService
            .checkAuthForPromotion(product._id)
            .subscribe((response) => {
              if (response.length > 0) {
                this.addProductToCart(product, price, quantity, product._id);
              } else {
                this.addProductToCart(product, price, quantity, product._id);
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
        this.addProductToCart(product, price, quantity, product._id);
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
    this.subtotal += itemTotal;
    this.total = this.subtotal + this.shipping;
  }

  onDelete(index: number) {
    this.total -= this.cart[index].total;
    this.cart.splice(index, 1);
    if (this.cart.length === 0) {
      this.sharedDataService.updateCart(true);
      localStorage.removeItem('cart');
      this.router.navigate(['../']);
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  updateTotal(data) {
    this.total += data.total;
    const index = this.findIndex(data.id);
    this.cart[index].total += data.total;
    this.cart[index].quantity = data.quantity;
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  coupon(discount) {
    this.subtotal -= discount;
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
