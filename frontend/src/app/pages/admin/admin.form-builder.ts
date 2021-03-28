import { FormBuilder, Validators } from '@angular/forms';

const fb: FormBuilder = new FormBuilder();

export const buildAdminFormGroup = () => {
  return fb.group({
    products: fb.array([]),
    configs: fb.group({
      name: fb.control(null),
      brands: fb.array([]),
      categories: fb.array([]),
      coupons: fb.array([]),
      shipping: fb.array([]), //! NOT USED!
      footer: fb.group({
        adress: fb.control(null),
        phone: fb.control(null),
        email: fb.control(null),
        facebookUrl: fb.control(null),
        instagramUrl: fb.control(null),
        twitterUrl: fb.control(null),
        facebookImage: fb.control(null),
        twitterImage: fb.control(null),
        instagramImage: fb.control(null),
      }),
    }),
    schedule: fb.group({
      sundayStart: fb.control(null),
      sundayEnd: fb.control(null),
      mondayStart: fb.control(null),
      mondayEnd: fb.control(null),
      tuesdayStart: fb.control(null),
      tuesdayEnd: fb.control(null),
      wednesdayStart: fb.control(null),
      wednesdayEnd: fb.control(null),
      thursdaysStart: fb.control(null),
      thursdaysEnd: fb.control(null),
      fridayStart: fb.control(null),
      fridayEnd: fb.control(null),
      saturdayStart: fb.control(null),
      saturdayEnd: fb.control(null),
    }),
  });
};

export function patchAdminFormGroup(formGroup, message) {}
