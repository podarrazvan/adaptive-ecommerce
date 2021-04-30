import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../shared/interfaces/order.interface';
import { ProductsService } from '../../products/products.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  @Output() closeOrder = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  loading = true;

  products: [
    { quantity?: number; name?: string; total?: number; id?: string }
  ] = [{}]; // TODO use interface

  ngOnInit(): void {
    this.products.splice(0, 1);
    for (const product of this.order.products) {
      this.productsService.getProduct(product.product).subscribe((response) => {
        const prod = response;
        const total = prod.price * product.quantity;
        this.products.push({
          quantity: product.quantity,
          name: prod.title,
          total,
          id: product.product,
        });
      });
    }
    this.loading = false;
  }

  openProduct(id): void {
    this.router.navigate(['/product', id]);
  }

  updateOrder(status: string): void {
    if (status === 'processed' && this.order.status !== status) {
      this.ordersService.updateOrder(this.order._id, status).subscribe(() => {
        this.productsService
          .updateSold(status, this.order.products)
          .subscribe(() => {
            this.updated.emit();
          });
      });
    } else if (status === 'canceled' && this.order.status !== status) {
      alert('Please do not forget to refund the money!');
      this.ordersService.updateOrder(this.order._id, status).subscribe(() => {
        this.productsService
          .updateSold(status, this.order.products)
          .subscribe(() => {
            this.updated.emit();
          });
      });
    } else {
      this.closeOrder.emit();
    }
  }
  addAWB(awb): void {
    this.ordersService.updateAWB(this.order._id, awb).subscribe(() => {
      alert('AWB updated');
    });
  }
}
