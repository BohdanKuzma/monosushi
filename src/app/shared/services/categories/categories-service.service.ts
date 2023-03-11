import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  private url = environment.BACKEND_URL;
  private api = {
    categories: `${this.url}/categories`
  }
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories)
  }

  createOne(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.categories, category)
  }

  deleteOne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`)
  }

  updateOne(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category)
  }
}
