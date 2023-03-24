import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  
  public userProducts: Array<IProductResponse> = [];

  public currentProduct!: IProductResponse;

  constructor(
    private productService: ProductsServiceService,
    private orderService: OrdersServiceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.productService.getAll().subscribe(data => {
      this.userProducts = data
    })
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product)
      }

    } else {
      basket.push(product)
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    product.count = 1;
    this.orderService.changeBasket.next(true)
  }
}
