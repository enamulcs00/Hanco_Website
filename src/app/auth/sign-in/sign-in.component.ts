import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
declare var $ :any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isOpenDialog:boolean = false;
  LoginForm: FormGroup;
  phoneEmail = 'email';
  separateDialCode = false;
  submitted = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  passText="password";
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private modal:ModalService,
  private common:CommonService,
  private fb: FormBuilder,
  private http: ApiService,
  public dialogRef: MatDialogRef<SignInComponent>,) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phoneNo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [""],
    });
    this.changeStatus('email');
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpenDialog = true
    }, 100);
    if (localStorage.getItem("remember")) {
      let formData = JSON.parse(localStorage.getItem("remember"));
      this.LoginForm.patchValue({
        email: formData.email,
        password: formData.password,
        phoneNo: formData.dialCode+" "+formData.phoneNo,
        rememberMe: formData.rememberMe,
      });
      console.log(formData.phoneNo,formData);
      if(formData.phoneNo!=' ' && formData.phoneNo!='' && formData.phoneNo!=undefined){
      this.changeStatus('phone');
      }
    }
  }

  openSignUp(){
    this.modal.openSignUp();
  }

  forgetPass(){
    this.dialog.closeAll();
    this.modal.openforget();
  }

  changeStatus(res: any) {
    this.phoneEmail = res;
    if (this.phoneEmail == 'email') {
      this.LoginForm.controls[this.phoneEmail].setValidators([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]);
      this.LoginForm.controls[this.phoneEmail].updateValueAndValidity();
      this.LoginForm.controls['phoneNo'].clearValidators();
      this.LoginForm.controls['phoneNo'].updateValueAndValidity()
    }
    else {
      if (this.phoneEmail == 'phone') {
        this.LoginForm.controls['phoneNo'].setValidators([Validators.required]);
        this.LoginForm.controls['phoneNo'].updateValueAndValidity();
        this.LoginForm.controls['email'].clearValidators();
        this.LoginForm.controls['email'].updateValueAndValidity()
      }
    }
  }

  login() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return
    }
    let body: any;
    if (this.phoneEmail == 'email') {
      body = {
        "login": this.LoginForm.controls['email'].value,
        "password": this.LoginForm.controls['password'].value,
        "latitude": "30.713031",
        "longitude": "76.7093724"
      }
    } else {
      body = {
        "login": this.LoginForm.controls['phone'].value.e164Number.replace(this.LoginForm?.value?.phone?.dialCode,''),
        // "countryCode": this.LoginForm.controls['phone'].value.dialCode,
        "password": this.LoginForm.controls['password'].value,
        "latitude": "30.713031",
        "longitude": "76.7093724"
      }
    }
    // body['deviceToken']=this.http.firebaseToken;
		body['deviceType']="WEB";
    // console.log(body, this.LoginForm)
    this.http.postRequest('login', body).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.common.successMsg(res.message);
        if (this.LoginForm.value.rememberMe) {
          var remember=this.LoginForm.value;
          remember['phoneNo']=this.LoginForm.controls['phoneNo'].value?this.LoginForm.controls['phoneNo'].value?.dialCode+" "+this.LoginForm.controls['phoneNo'].value.e164Number.replace(this.LoginForm?.value?.phoneNo?.dialCode,''):''
          remember['dialCode']=this.LoginForm.controls['phoneNo'].value?this.LoginForm.controls['phoneNo'].value?.dialCode:'';
          localStorage.setItem("remember",JSON.stringify(remember));
        } else {
          localStorage.removeItem("remember");
        }
        this.dialog.closeAll();
        localStorage.setItem(environment.storageKey,JSON.stringify(res?.data));
        this.http.isLoggedInOut.next(true);
      }
    })
  }

}
