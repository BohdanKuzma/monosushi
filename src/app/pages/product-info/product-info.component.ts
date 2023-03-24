import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public currentProduct!: IProductResponse;

  constructor(
    private productService: ProductsServiceService,
    private activateRoute: ActivatedRoute,
    private orderService: OrdersServiceService,
    
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.currentProduct = data["productInfo"]
    })
  }

  loadProduct(): void {
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(id).subscribe(data => {
      this.currentProduct = data;
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


