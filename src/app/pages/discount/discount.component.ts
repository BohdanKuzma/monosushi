import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount.interface';
import { DiscountsServiceService } from 'src/app/shared/services/discounts/discounts-service.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  public userDiscount: Array<IDiscountResponse> = [];

  constructor(
    private discountService: DiscountsServiceService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    // this.discountService.getAll().subscribe(data => {
    //   this.userDiscount = data
    // })

    this.discountService.getAllFirebase().subscribe(data => {
      this.userDiscount = data as IDiscountResponse[];
    })
  }
}
