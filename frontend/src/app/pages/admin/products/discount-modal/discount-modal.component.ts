import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/shared/services/database/discount.service';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.scss'],
})
export class DiscountModalComponent {
  @Input() id: string;
  @Output() closeDiscount = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService
  ) {
    this.buildFormGroup();
  }

  discountForm: FormGroup;
  onSubmit(): void {
    // TODO Try alternative to Date(): https://momentjs.com/
    const expDate = new Date();
    expDate.setDate(
      new Date().getDate() + this.discountForm.value.expirationDate
    );

    this.discountForm.patchValue({
      id: this.id,
      expirationDate: expDate,
    });
    this.discountService.createDiscount(this.discountForm.value);
    this.closeDiscount.emit();
  }
  private buildFormGroup(): void {
    this.discountForm = this.formBuilder.group({
      cut: ['', Validators.required],
      expirationDate: ['', Validators.required],
      id: [''],
    });
  }
}
