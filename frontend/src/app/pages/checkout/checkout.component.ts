import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  ngOnInit(): void {
    // if (this.sharedDataService.totalCart == null) {
    //   this.router.navigate(['../cart']);
    // }
  }
}
