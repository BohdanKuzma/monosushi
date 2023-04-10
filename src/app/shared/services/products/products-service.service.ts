import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environmet';
import { IProductRequest, IProductResponse } from '../../interfaces/product.interface';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { ICategoryRequest } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private url = environment.BACKEND_URL;
  private api = {
    products: `${this.url}/products`
  }
  // static getAll: any;

  private productCollection!: CollectionReference<DocumentData>

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'products')
  }

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


  //-----------------------------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  createOneFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateOneFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, { ...product });
  }

  deleteOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference)
  }

}
