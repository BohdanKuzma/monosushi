import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "discount", component: DiscountComponent
  },

  {
    path: "discount/:id", component: DiscountInfoComponent
  },
  {
    path: "product", component: ProductComponent
  },
  {
    path: "product/:category/:id", component: ProductInfoComponent
  },
  {
    path: "delivery", component: DeliveryComponent
  },

  {
    path: "about", component: AboutComponent
  },

  {
    path: "check", component: CheckoutComponent
  },

  {
    path: "admin", component: AdminComponent, children: [
      { path: "category", component: AdminCategoryComponent },
      { path: "product", component: AdminProductComponent },
      { path: "discount", component: AdminDiscountComponent },
      { path: "orders", component: AdminOrdersComponent },
      { path: "", pathMatch:'full', redirectTo: 'category' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
