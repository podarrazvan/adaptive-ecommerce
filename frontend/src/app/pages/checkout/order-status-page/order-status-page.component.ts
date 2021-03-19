import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from '../../admin/orders/orders.service';
import { ProductsService } from '../../admin/products/products.service';

export interface OrderProduct {
  name: string;
  quantity: number;
  id: string;
  total: number;
}
@Component({
  selector: 'app-order-status-page',
  templateUrl: './order-status-page.component.html',
  styleUrls: ['./order-status-page.component.scss']
})
export class OrderStatusPageComponent {
  order: Order;
  loading = true;
  product: OrderProduct;
  products: OrderProduct[]=[];
  status: string;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private ordersService: OrdersService,
              private router: Router) { 
                
    const number = this.route.snapshot.params['number'];
    this.ordersService.getOrder(number).subscribe((order)=> {
      this.order = order;
      switch(order.status) {
        case('new'):
        this.status = "The order has been placed and is waiting to be processed."
        break;
        case('processed'):
        this.status = "Your order has been processed and handed over to the courier. Use the AWB to track it on the courier's website."
        break;
        case('canceled'):
        this.status = 'Your order has been canceled';
        break;
      }
      for(let product of order.products) {
        this.productsService.getProduct(product.product).subscribe((prod) => {
          const total = prod.price * product.quantity; 
          this.product = {
            id:product.product,
            name: prod.title,
            quantity: product.quantity,
            total,
          }
          this.products.push(this.product);
        });
      }
      this.loading = false;
    })
  }

  openProduct(id) {
    this.router.navigate(['/product',id]);
  }

}
