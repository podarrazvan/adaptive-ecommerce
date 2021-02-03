import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DbGetDataService } from 'src/app/shared/services/database/db-get-data.service';
import { Order } from '../../../../shared/interfaces/order.interface';
import { DbUploadService } from '../../../../shared/services/database/db-upload.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private dbGetDataService: DbGetDataService,
              private dbUploadService: DbUploadService,
              private router: Router) { }

  loading = true;

  products: [{quantity?:number, name?: string, total?: number, category?: string, id?: string}] = [{}]

  ngOnInit(): void {
    this.products.splice(0,1);
    for(let product of this.order.cart) {
      this.dbGetDataService.getProduct( product.product).subscribe(data => {
        const prod = data.product;
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
      this.dbUploadService.updateOrder(this.order, status, this.order.key).subscribe(()=> this.updated.emit());

    } else {
      this.close.emit();
    }

    if(status === 'canceled' ){
      alert('Please don\'t forget to refund the money!')
    }
  }

}
