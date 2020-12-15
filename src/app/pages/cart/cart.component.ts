import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

declare var paypal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, DoCheck {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  constructor(
    private dbFetchDataService: DbFetchDataService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  emptyCart: boolean;

  cart;
  showCart = false;
  total = 0;

  product = {
    title: "iPhone 12 Pro Max",
    price: 999,
    img: "https://s13emagst.akamaized.net/products/33382/33381513/images/res_9c502e664bde724a8f8e180bbe1582c9.jpg?width=450&height=450&hash=B5A412328A8BC51D19BCDA6A18A27080",
    quantity: 2,
  }

  products = [this.product, this.product];

  mobile: boolean;

  paidFor = false;

  ngOnInit(): void {
    // this.mobile = this.sharedDataService.mobile;
    // this.cart = [];
    // const products = JSON.parse(localStorage.getItem('cart'));
    // products.length > 0 ? this.emptyCart  = false : this.emptyCart = true;
    // for (let product of products) {
    //   const category = product.category;
    //   const key = product.product;
    //   const quantity = product.quantity;
    //   this.getProduct(category, key, quantity);
    // }
    // this.showCart = true;
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
  // Use observable 
  ngDoCheck() {
    this.sharedDataService.totalCart = this.total;
    console.log(this.sharedDataService.totalCart);
  }

  getProduct(category: string, key: string, quantity: string) {
    this.dbFetchDataService.fetchProduct(category, key).subscribe((response) => {
      this.cart.push({ product: response, quantity: quantity, key: key });
      this.total += +response.price * +quantity;
    });
  }

  onDelete(index: number) {
    this.total -= this.cart[index].product.price * this.cart[index].quantity;
    this.cart.splice(index, 1);
    if(this.cart.length === 0){
      this.sharedDataService.updateCart(true);
      localStorage.removeItem("cart");
      this.router.navigate(['../'])
    }else{
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
    let cartUpdated = [];
    for (let product of this.cart) {
      console.log(product);
      cartUpdated.push({
        category: product.product.category,
        product: product.key,
        quantity: product.quantity,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cartUpdated));
  }
}
