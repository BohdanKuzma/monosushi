import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AuthorzationComponent} from "./authorzation.component";


const routes: Routes = [
  {
    path: "", component: AuthorzationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorzationRoutingModule { }
