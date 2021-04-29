import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss'],
})
export class TrackOrderComponent {
  constructor(private router: Router) {}

  openOrder(orderNumber): void {
    const orderNr = orderNumber.value;
    this.router.navigate(['/order-status', orderNr]);
  }
}
