import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];


  constructor(
    private productService: ProductsServiceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.productService.getAll().subscribe(data => {
      this.userProducts = data
    })
  }

}
