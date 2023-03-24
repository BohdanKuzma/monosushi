import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { IProductRequest, IProductResponse } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private url = environment.BACKEND_URL;
  private api = {
    products: `${this.url}/products`
  }
  static getAll: any;
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products)
  }

  getAllbyCategory(category: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${category}`)
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }

  createOne(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product)
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`)
  }
  updateOne(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product)
  }



}
