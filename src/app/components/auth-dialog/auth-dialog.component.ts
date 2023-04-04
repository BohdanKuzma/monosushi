import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

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

  public loginSubscription!: Subscription;

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
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      phone: [null, [Validators.required]],
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
        this.router.navigate(['/cabinet'])
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin'])
      }
      this.accountService.isUserLogin$.next(true);
      console.log('user', user);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const { email, password } = this.authForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created')
      this.authForm.reset();

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
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  // async emailSignUp(email: string, password: string): Promise<void> {
  //   const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  //   console.log('emailSignUp', credential);
  //   const user = {
  //     email: credential.user.email,
  //     firstName: '',
  //     lastName: '',
  //     phoneNumber: '',
  //     address: '',
  //     orders: [],
  //     role: 'USER'
  //   };
  //   setDoc(doc(this.afs, 'users', credential.user.uid), user);
  // }
}