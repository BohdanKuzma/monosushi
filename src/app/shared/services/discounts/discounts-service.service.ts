import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environmet';
import { Observable } from 'rxjs/internal/Observable';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountsServiceService {
  private url = environment.BACKEND_URL;
  private api = {
    discounts: `${this.url}/discounts`
  }
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts)
  }

  getOne(id: number): Observable<IDiscountResponse> {
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`);
  }

  createOne(discount: IDiscountRequest): Observable<IDiscountResponse> {
    return this.http.post<IDiscountResponse>(this.api.discounts, discount)
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`)
  }

  updateOne(discount: IDiscountRequest, id: number): Observable<IDiscountResponse> {
    return this.http.patch<IDiscountResponse>(`${this.api.discounts}/${id}`, discount)
  }



}
