import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  orderFormGroup: FormGroup = null;

  private createAccountSubject$ = new BehaviorSubject<boolean>(false);
  public createAccount$: Observable<boolean> = this.createAccountSubject$.asObservable();

  setCreateAccount(value) {
    this.createAccountSubject$.next(value);
  }
}
