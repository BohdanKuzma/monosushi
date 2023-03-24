import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public navMenuStatus = false;

  public totalPrice = 0;

  private basket: Array<IProductResponse> = []

  constructor(
    private orderService: OrdersServiceService
  ) { }
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket()
  }

  openMenu(): void {
    this.navMenuStatus = !this.navMenuStatus;

  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice()
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((totalPrice: number, prod: IProductResponse) =>
      totalPrice + prod.count * prod.price, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket()
    })
  }
}
