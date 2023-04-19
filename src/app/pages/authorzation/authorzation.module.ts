import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorzationRoutingModule} from "./authorzation-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {AuthorzationComponent} from "./authorzation.component";



@NgModule({
  declarations: [
    AuthorzationComponent
  ],
  imports: [
    CommonModule,
    AuthorzationRoutingModule,
    SharedModule
  ]
})
export class AuthorzationModule { }
