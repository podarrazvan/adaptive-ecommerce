import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbUploadService } from '../../../../shared/services/database/db-upload.service';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.scss']
})
export class DiscountModalComponent implements OnInit {

  @Input() id: string;
  @Output() close = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private dbUploadService: DbUploadService) { }

  discountForm: FormGroup;

  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      price: ['', Validators.required],
      expirationDate: ['', Validators.required],
      id: [''],
    });
  }
  onSubmit() {

    //*TODO Try alternative to Date(): https://momentjs.com/
    const expDate = new Date();
    expDate.setDate(new Date().getDate()+ this.discountForm.value.expirationDate);

    this.discountForm.patchValue({
      id:this.id,
      expirationDate: expDate
    });
    this.dbUploadService.createDiscount(this.discountForm.value);
    this.close.emit();
  }

}
