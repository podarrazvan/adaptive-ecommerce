import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminFormGroup: FormGroup = null;
  productFormGroup: FormGroup = null;
}
