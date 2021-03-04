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
      footer: fb.group({
        adress: fb.control(null),
        phone: fb.control(null),
        email: fb.control(null),
        // program: ["",Validators.required],
        facebookUrl: fb.control(null),
        instagramUrl: fb.control(null),
        twitterUrl: fb.control(null),
        facebookImage: fb.control(null),
        twitterImage: fb.control(null),
        instagramImage: fb.control(null),
      }),
    }),
  });
};

export function patchAdminFormGroup(formGroup, message) {

}