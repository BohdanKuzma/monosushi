import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { DiscountsServiceService } from 'src/app/shared/services/discounts/discounts-service.service';
import { OrdersServiceService } from 'src/app/shared/services/orders/orders-service.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public currentDiscount!: IDiscountResponse;
  

  constructor(
    private discountService: DiscountsServiceService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe(data => {
      this.currentDiscount = data["discountInfo"]
      console.log(data["discountInfo"]);

    })
  }

  loadDiscount(): void {
    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(id).subscribe(data => {
      this.currentDiscount = data;
    })

    // const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    // this.discountService.getOneFirebase(id).subscribe(data => {
    //   this.currentDiscount = data as IDiscountResponse;
    // })

  }





}
