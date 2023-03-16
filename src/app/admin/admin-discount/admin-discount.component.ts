import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount.interface';
import { DiscountsServiceService } from 'src/app/shared/services/discounts/discounts-service.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public currentID!: number;

  public editStatus = false;

  public discountForm!: FormGroup;

  public adminDiscounts: Array<IDiscountResponse> = [];

  public uploadPercent!: number;

  public isUploaded = false;

  constructor(
    private discountService: DiscountsServiceService,
    private fb: FormBuilder,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.loadDiscount()
    this.initDiscountForm()
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group(
      {
        title: [null, Validators.required],
        desc: [null, Validators.required],
        imgPath: [null, Validators.required],
      }
    )
  }

  loadDiscount(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.updateOne(this.discountForm.value, this.currentID).subscribe(() => {
        this.loadDiscount()
        this.discountForm.reset()
        this.editStatus = false;
        this.isUploaded = false;
      })
    } else {
      this.discountService.createOne(this.discountForm.value).subscribe(() => {
        this.loadDiscount()
        this.discountForm.reset()
        this.editStatus = false;
        this.isUploaded = false

      });
    }
  }

  deleteDiscount(id: number): void {
    if (confirm("Rly delete?")) {
      this.discountService.deleteOne(id).subscribe(() => {
        this.loadDiscount()
      })
    }
  }

  editDiscount(discount: IDiscountResponse): void {
    this.editStatus = true;
    this.discountForm.patchValue(
      {
        title: discount.title,
        desc: discount.desc,
        imgPath: discount.imgPath
      }
    )
    this.currentID = discount.id
  }

  upload(even: any): void {
    const file = even.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue(
          {
            imgPath: data
          }
        )
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imgPath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.discountForm.patchValue({ imgPath: null })
      })
      .catch(err => {
        console.log(err);

      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}