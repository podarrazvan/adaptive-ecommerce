import { FormBuilder, Validators } from '@angular/forms';

const fb: FormBuilder = new FormBuilder();

export const buildAdminFormGroup = () => {
  return fb.group({
    products: fb.array([]),
  });
};

export function patchAdminFormGroup(formGroup, message) {

}