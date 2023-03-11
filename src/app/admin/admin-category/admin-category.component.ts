import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoriesServiceService } from 'src/app/shared/services/categories/categories-service.service';
import { percentage, ref, Storage, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage'

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public currentID!: number;

  public editStatus = false;

  public categoryForm!: FormGroup;

  public adminCategories: Array<ICategoryResponse> = [];

  public uploadPercent!: number;

  public isUploaded = false;

  constructor(
    private categoryService: CategoriesServiceService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.loadCategory()
    this.initCategoryForm()
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group(
      {
        title: [null, Validators.required],
        path: [null, Validators.required],
        imgPath: [null, Validators.required],
      }
    )
  }

  loadCategory(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateOne(this.categoryForm.value, this.currentID).subscribe(() => {
        this.loadCategory()
        this.categoryForm.reset()
        this.editStatus = false;
        this.isUploaded = false;
      })
    } else {
      this.categoryService.createOne(this.categoryForm.value).subscribe(() => {
        this.loadCategory()
        this.categoryForm.reset()
        this.editStatus = false;
        this.isUploaded = false;

      })
    }

  }

  deleteCategory(id: number): void {
    if (confirm("Rly delete?")) {
      this.categoryService.deleteOne(id).subscribe(() => {
        this.loadCategory()
      })
    }
  }

  editCategory(category: ICategoryResponse): void {
    this.editStatus = true;
    this.categoryForm.patchValue(
      {
        title: category.title,
        path: category.path,
        imgPath: category.imgPath
      }
    )
    this.currentID = category.id
  }

  upload(even: any): void {
    const file = even.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue(
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
      this.categoryForm.patchValue(
        {
          imgPath: null
        }
      )
    })
  }


  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }


}
