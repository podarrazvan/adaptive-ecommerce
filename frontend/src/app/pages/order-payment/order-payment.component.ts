import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../admin/orders/orders.service';

declare var paypal;
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
})
export class OrderPaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  paidFor = false;
  order;

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem('order'));
    if (this.order === null) {
      this.router.navigate(['']);
    } else {
      const total = this.order.orderDetails.total;
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  // TODO add products's name in an array
                  amount: {
                    currency_code: 'USD',
                    value: total,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.createOrder();
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.paypalElement.nativeElement);
    }
  }
  createOrder(): void {
    this.ordersService.addOrder(this.order).subscribe((response) => {
      const orderNumber = response.body.order.orderNumber;
      localStorage.removeItem('cart');
      localStorage.removeItem('coupon');
      this.router.navigate(['../order-status', orderNumber]);
    });
  }
}
