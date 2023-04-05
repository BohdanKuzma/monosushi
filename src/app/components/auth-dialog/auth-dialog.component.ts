import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmedPassword: string
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  public authForm!: FormGroup;
  public regForm!: FormGroup;

  public isRegister = false;
  public isLogin = false;

  public checkPassword = false;

  public loginSubscription!: Subscription;

  private registerData!: IRegister;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initAuthForm()
    this.initRegForm()
  }

  changeRegisterUser(): void {
    this.isRegister = !this.isRegister
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegForm(): void {
    this.regForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      confirmedPassword: [null],
    })
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.success('User successfully login')
    }).catch(e => {
      this.toastr.error(e)
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        // this.router.navigate(['/cabinet'])
      } else if (user && user['role'] === ROLE.ADMIN) {
        // this.router.navigate(['/admin'])
      }
      this.accountService.isUserLogin$.next(true);
      location.reload()
      console.log('user', user);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.regForm.value;
    this.registerData = this.regForm.value
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created')
      this.regForm.reset();
      this.isLogin = !this.isLogin
    }).catch(e => {
      this.toastr.error(e)
    })
  }

  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log('emailSignUp', credential);
    const user = {
      email: credential.user.email,
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phone,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }
  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.regForm.controls['confirmedPassword'].setErrors({
        matchError: 'confirmedPassword doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.regForm.controls['password'];
  }
  get confirmed(): AbstractControl {
    return this.regForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.regForm.controls[control].errors?.[name];
  }
}

