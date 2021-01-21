import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DbFetchDataService } from 'src/app/shared/services/database/db-fetch-data.service';

@Component({
  selector: 'app-cart-coupon',
  templateUrl: './cart-coupon.component.html',
  styleUrls: ['./cart-coupon.component.scss']
})
export class CartCouponComponent implements OnInit {
  
  @Output() discount = new EventEmitter<number>();
  
  constructor(private dbFetchDataServide: DbFetchDataService) { }


  ngOnInit(): void {
  }

  addCoupon(code) {
    this.dbFetchDataServide.fetchCoupon(code.value).subscribe(response =>  {
      console.log(typeof(response.coupon[0].discount));
      this.discount.emit(response.coupon[0].discount);
    });
  }

}
