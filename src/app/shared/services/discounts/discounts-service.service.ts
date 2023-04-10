import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environmet';
import { Observable } from 'rxjs/internal/Observable';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount.interface';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class DiscountsServiceService {
  private url = environment.BACKEND_URL;
  private api = {
    discounts: `${this.url}/discounts`
  }

  private discountCollection!: CollectionReference<DocumentData>
  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) { 
    this.discountCollection = collection(this.afs, 'discounts');
  }

  

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


  //---------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  createOneFirebase(discount: IDiscountRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateOneFirebase(discount: IDiscountRequest, id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountDocumentReference, { ...discount });
  }

  deleteOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountDocumentReference)
  }

}
