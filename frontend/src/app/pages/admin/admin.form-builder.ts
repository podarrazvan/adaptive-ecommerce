import { FormBuilder, Validators } from '@angular/forms';

const fb: FormBuilder = new FormBuilder();

export const buildAdminFormGroup = () => {
  return fb.group({
    product: fb.group({
      title: fb.control(null),
      category: fb.control(null),
      brand: fb.control(null),
      price: fb.control(null),
      images: fb.control(null),
      description: fb.control(null),
      tags: fb.control(null),
      quantity: fb.control(null),
      minPrice: fb.control(null),
      salesWeekTarget: fb.control(null),
    }),
  });
};
