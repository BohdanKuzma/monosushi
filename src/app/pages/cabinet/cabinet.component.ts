import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})

export class CabinetComponent implements OnInit {

  public cabinetUserForm!: FormGroup;

  public userCabinet!: any

  constructor(
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.getUser()
    this.initCabinetUserForm()
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

  initCabinetUserForm(): void {
    this.cabinetUserForm = this.fb.group({
      firstName: [this.userCabinet.firstName, [Validators.required]],
      lastName: [this.userCabinet.lastName, [Validators.required]],
      email: [this.userCabinet.email, [Validators.required, Validators.email]],
      phone: [this.userCabinet.phoneNumber, [Validators.required]],
    })
  }

  getUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.userCabinet = JSON.parse(localStorage.getItem('currentUser') as string)
    }
    console.log(this.userCabinet);

  }
}
