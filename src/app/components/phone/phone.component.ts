import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  public phoneForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initPhoneForm()
  }

  initPhoneForm(): void {
    this.phoneForm = this.fb.group({
      firstName: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }


}
