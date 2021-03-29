import { FormBuilder, Validators } from '@angular/forms';

const fb: FormBuilder = new FormBuilder();

export const buildOrderFormGroup = () => {
  return fb.group({
    order: fb.group({
      billingDetails: fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        adress: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      orderDetails: fb.group({
        shipping: ['', Validators.required],
        payment: ['', Validators.required],
        total: [''],
        status: ['new'],
        date: [''],
      }),
      products: fb.array([]),
      orderNotes: fb.control(''),
    }),
  });
};
