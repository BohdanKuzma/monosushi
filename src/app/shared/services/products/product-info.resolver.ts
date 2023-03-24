import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IProductResponse } from '../../interfaces/product.interface';
import { ProductsServiceService } from './products-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {
  constructor(
    private productService: ProductsServiceService,
  ) { }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResponse> {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }


}
