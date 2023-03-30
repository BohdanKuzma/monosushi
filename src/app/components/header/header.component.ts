import { Component, OnInit } from '@angular/core';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
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

  public isLogin = false;

  public loginUrl = 'admin';
  public loginPage = 'Admin'

  constructor(
    private orderService: OrdersServiceService,
    private accountService: AccountService
  ) { }
  
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket()
    this.checkUserLogin();
    this.checkUpdatesUserLogin();

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
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket()
    })
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin()
    })
  }


}
