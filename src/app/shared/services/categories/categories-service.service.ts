import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category.interface';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  private url = environment.BACKEND_URL;
  private api = {
    categories: `${this.url}/categories`
  }

  private categoryCollection!: CollectionReference<DocumentData>

  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

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

  //-----------------------------------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createOneFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateOneFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }

  deleteOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference)
  }






}
