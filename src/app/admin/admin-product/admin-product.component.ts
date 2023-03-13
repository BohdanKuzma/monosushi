import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product.interface';
import { CategoriesServiceService } from 'src/app/shared/services/categories/categories-service.service';
import { ProductsServiceService } from 'src/app/shared/services/products/products-service.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];

  public productForm!: FormGroup;

  public editStatus = false;

  public uploadPercent!: number;

  public isUploaded = false;

  public currentID = 0;

  constructor(
    private productService: ProductsServiceService,
    private categoryService: CategoriesServiceService,
    private fb: FormBuilder,
    private storage: Storage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadCategory()
    this.loadProduct()
    this.initProductForm()
  }

  loadProduct(): void {
    this.productService.getAll().subscribe(data => {
      this.adminProducts = data;
    })
  }

  loadCategory(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  initProductForm(): void {
    this.productForm = this.fb.group(
      {
        category: [null, Validators.required],
        title: [null, Validators.required],
        path: [null, Validators.required],
        desc: [null, Validators.required],
        price: [null, Validators.required],
        weight: [null, Validators.required],
        imgPath: [null, Validators.required],
        count: [1]
      }
    )
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateOne(this.productForm.value, this.currentID).subscribe(() => {
        this.toastr.success('Product Add')
        this.loadProduct()
        this.productForm.reset()
        this.isUploaded = false

      })

    } else {
      this.productService.createOne(this.productForm.value).subscribe(() => {
        this.loadProduct()
        this.productForm.reset()
        this.isUploaded = false
      })
    }
    this.editStatus = false;

  }

  editProduct(product: IProductResponse): void {
    this.editStatus = true;
    this.currentID = product.id;
    this.productForm.patchValue(
      {
        category: product.category,
        title: product.title,
        path: product.path,
        desc: product.desc,
        price: product.price,
        weight: product.weight,
        imgPath: product.imgPath,
        // count: [1]
      }
    )
  }

  deleteProduct(id: number): void {
    if (confirm('Rly delete?')) {
      this.productService.deleteOne(id).subscribe(() => {
        this.loadProduct()
      })
    }
  }

  upload(even: any): void {
    const file = even.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue(
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


  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file)
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);

      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url)

  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imgPath'))
    deleteObject(task).then(() => {
      console.log('File delete');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue(
        {
          imgPath: null
        }
      )
    })
  }


  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
