import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbUploadService } from 'src/app/shared/services/database/db-upload.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit {
  constructor(
    private sharedDataService: SharedDataService,
    private fb: FormBuilder,
    private dbUploadService: DbUploadService,
    private router: Router
  ) {}

  checkoutForm: FormGroup;

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  onSubmit() {
    const order = {
      adress: this.checkoutForm.value,
      cart: JSON.parse(localStorage.getItem('cart')),
      total: this.sharedDataService.totalCart.toString(),
    };
    this.dbUploadService.addOrder(order);
    localStorage.removeItem('cart');
    this.checkoutForm.reset();
    this.sharedDataService.updateCart(true);
    alert('Order sent!');
    this.router.navigate(['../../']);
  }
}
