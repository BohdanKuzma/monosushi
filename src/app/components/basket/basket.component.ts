import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {
  basketItems: Array<IProductResponse> = []

  isEmptyBasket = false;

  constructor(
    private orderService: OrdersServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getItemBasket()
    this.updateBasket()
  }

  getItemBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketItems = JSON.parse(localStorage.getItem('basket') as string);
    }
    // this.getTotalPrice()
  }

  itemCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.basketItems))
    } else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.basketItems))
    }
    this.updateBasket()
    this.orderService.changeBasket.next(true)

  }

  // removeFromBasket(productId: number): void {
  //   let basket: Array<IProductResponse> = [];
  //   if (localStorage.length > 0 && localStorage.getItem('basket')) {
  //     basket = JSON.parse(localStorage.getItem('basket') as string);
  //     const index = basket.findIndex(prod => prod.id === productId);
  //     if (index !== -1) {
  //       basket.splice(index, 1);
  //       localStorage.setItem('basket', JSON.stringify(basket));
  //       this.orderService.changeBasket.next(true);
  //       this.updateBasket()
  //     }
  //   }
  // }

  removeFromBasket(productId: string | number): void {
    if (this.basketItems.some(prod => prod.id === productId)) {
      const index = this.basketItems.findIndex(prod => prod.id === productId)
      this.basketItems.splice(index, 1)
      localStorage.setItem('basket', JSON.stringify(this.basketItems))
      this.updateBasket()
      this.orderService.changeBasket.next(true)
    }
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.getItemBasket()
    })
  }

  getTotalPrice(): number {
    return this.basketItems.reduce((acc, item) => acc + item.price * item.count, 0);
  }

  goToOrder(): void {
    this.router.navigate(['/check'])
    
  }

}

