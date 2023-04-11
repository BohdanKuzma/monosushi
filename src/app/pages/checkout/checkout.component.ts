import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';
import { environment } from 'src/environments/environmet';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public order: Array<IProductResponse> = [];

  public checkForm!: FormGroup;

  public totalPriceOrder = 0;

  public tgURL = environment.TELEGRAM_KEY.url;
  public chatID = environment.TELEGRAM_KEY.chatID;

  constructor(
    private orderService: OrdersServiceService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.loadProducts()
    this.updateBasket()
    this.initCheckForm()
  }


  initCheckForm(): void {
    if (localStorage.getItem('currentUser') && localStorage.length > 0) {
      const user = JSON.parse(localStorage.getItem('currentUser') as string)


      this.checkForm = this.fb.group({
        firstname: [user.firstName, [Validators.required]],
        phone: [user.phoneNumber, [Validators.required]],
        street: [null, [Validators.required]],
        house: [null, [Validators.required]],
        message: [null],
        countTools: [null, [Validators.required]],
        payment: [null, [Validators.required]],

      })
    } else {
      this.checkForm = this.fb.group({
        firstname: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        street: [null, [Validators.required]],
        house: [null, [Validators.required]],
        message: [null],
        countTools: [null, [Validators.required]],
        payment: [null, [Validators.required]],

      })
    }

  }



  loadProducts(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.order = JSON.parse(localStorage.getItem('basket') as string)
    }
    this.getTotalPrice()
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.order))
    } else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.order))
    }
    this.getTotalPrice()
    this.updateBasket()
    this.orderService.changeBasket.next(true)
  }

  getTotalPrice(): void {
    this.totalPriceOrder = this.order.reduce((totalPrice: number, prod: IProductResponse) =>
      totalPrice + prod.count * prod.price, 0)
    console.log(this.totalPriceOrder);
  }


  removeFromBasket(productId: any): void {
    // let order: Array<IProductResponse> = [];
    // if (localStorage.length > 0 && localStorage.getItem('basket')) {
    //   order = JSON.parse(localStorage.getItem('basket') as string);
    //   const index = order.findIndex(prod => prod.id === productId);
    //   if (index !== -1) {
    //     order.splice(index, 1);
    //     localStorage.setItem('basket', JSON.stringify(order));
    //     this.orderService.changeBasket.next(true);
    //     this.updateBasket()
    //   }
    // }

    if (this.order.some(prod => prod.id === productId)) {
      const index = this.order.findIndex(prod => prod.id === productId);
      this.order.splice(index, 1);
      // console.log(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.order))
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }


  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadProducts()
    })
  }

  createOrder(): void {
    let basket = '';
    for (const item of this.order) {
      basket += `Назва продукту: ${item.title},
      Кількість продукту: ${item.count}`

    }

    const text = `
    Веб-додаток Monosushi
    ---
    Ім'я: ${this.checkForm.value.firstname};
    ---
    Телефон: ${this.checkForm.value.phone};
    ---
    Повідомлення: ${this.checkForm.value.message};
    ---
    ${basket}
    
    Загальна ціна: ${this.totalPriceOrder}
    `;

    const params = { chat_id: this.chatID, text };

    this.http.post(this.tgURL, params).subscribe(
      () => {
        this.checkForm.reset();
        localStorage.setItem('basket', '[]')
        this.updateBasket()
        this.orderService.changeBasket.next(true)
        this.router.navigate([''])
        // this.toastr.success('Ваше повідомлення відправлено, очікуйте фідбек!')
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
