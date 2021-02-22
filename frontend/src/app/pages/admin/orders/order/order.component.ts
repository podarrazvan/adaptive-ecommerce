import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../../shared/interfaces/order.interface';
import { ProductsService } from '../../products/products.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private productsService: ProductsService,
              private ordersService: OrdersService,
              private router: Router) { }

  loading = true;

  products: [{quantity?:number, name?: string, total?: number, category?: string, id?: string}] = [{}]

  ngOnInit(): void {
    this.products.splice(0,1);
    for(let product of this.order.cart) {
      this.productsService.getProduct( product.product).subscribe(response => {
        const prod = response;
        const total = prod.price * product.quantity;
        this.products.push({
          quantity: product.quantity,
          name: prod.title,
          total: total,
          category: product.category,
          id: product.product
        });
      });
    }
    this.loading = false;
  }

  openProduct(category, id) {
    this.router.navigate(['/product',category, id]);
  }

  exit() {

  }

  updateOrder(status: string) {
    if(status != ''){
      this.ordersService.updateOrder(this.order, status, this.order.key).subscribe(()=> this.updated.emit());

    } else {
      this.close.emit();
    }

    if(status === 'canceled' ){
      alert('Please don\'t forget to refund the money!')
    }
  }

}
