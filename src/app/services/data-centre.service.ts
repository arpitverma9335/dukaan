import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCentreService {

  constructor() { }

  private cartQuantity$ = new BehaviorSubject<number>(0);

  setCartQuantity(qty: number) {
    this.cartQuantity$.next(qty);
  }

  getCartQuantity(){
    return this.cartQuantity$.asObservable()
  }
}
