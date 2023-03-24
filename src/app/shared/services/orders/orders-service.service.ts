import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  public changeBasket = new Subject<boolean>()
  constructor() { }
}
