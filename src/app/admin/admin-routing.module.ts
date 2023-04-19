import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminDiscountComponent } from "./admin-discount/admin-discount.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";




const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "category", component: AdminCategoryComponent },
      { path: "product", component: AdminProductComponent },
      { path: "discount", component: AdminDiscountComponent },
      { path: "orders", component: AdminOrdersComponent },
      { path: "", pathMatch: "full", redirectTo: "category" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
