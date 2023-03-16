import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

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
