import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IDiscountResponse } from '../../interfaces/discount.interface';
import { DiscountsServiceService } from './discounts-service.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountsServiceService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.discountService.getOneFirebase(route.paramMap.get('id') as string);
  }
}
