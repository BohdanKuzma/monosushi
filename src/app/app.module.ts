import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environmet';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
// import { DiscountInfoComponent } from './pages/discount/discount-info/discount-info.component';
// import { ProductComponent } from './pages/product/product.component';
// import { ProductInfoComponent } from './pages/product/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { AdminComponent } from './admin/admin.component';
// import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
// import { AdminProductComponent } from './admin/admin-product/admin-product.component';
// import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
// import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// import { AuthorzationComponent } from './pages/authorzation/authorzation.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { OfertaComponent } from './pages/oferta/oferta.component';


import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { BasketComponent } from './components/basket/basket.component';
import { PhoneComponent } from './components/phone/phone.component';
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //HomeComponent,
    // DiscountComponent,
    // DiscountInfoComponent,
    // ProductComponent,
    // ProductInfoComponent,
    // DeliveryComponent,
    // AboutComponent,
    // CheckoutComponent,
    // AdminComponent,
    // AdminCategoryComponent,
    // AdminProductComponent,
    // AdminDiscountComponent,
    // AdminOrdersComponent,
    // AuthorzationComponent,
    // CabinetComponent,
    // OfertaComponent,
    AuthDialogComponent,
    BasketComponent,
    PhoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
