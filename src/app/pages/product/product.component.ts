import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public userProducts: Array<IProductResponse> = [];

  public eventSubscription!: Subscription

  constructor(
    private productService: ProductsServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrdersServiceService
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getData()
      }
    })
  }

  ngOnInit(): void {
  }

  getData(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllbyCategory(categoryName).subscribe(data => {
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
