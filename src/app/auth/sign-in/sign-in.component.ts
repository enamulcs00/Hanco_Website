import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
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
  yourRedirectURIVar: any = 'https://uniform-deal.com/home';
  clientId: any = 'com.uniformdeal';
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,
  private modal:ModalService,
  private common:CommonService,
  private socialService: SocialAuthService,
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
          remember['phoneNo']=this.LoginForm.controls['phoneNo'].value.number?(this.LoginForm.controls['phoneNo'].value?.dialCode+" "+this.LoginForm.controls['phoneNo'].value.e164Number.replace(this.LoginForm?.value?.phoneNo?.dialCode,'')):''
          remember['dialCode']=this.LoginForm.controls['phoneNo'].value.number?this.LoginForm.controls['phoneNo'].value?.dialCode:'';
          localStorage.setItem("remember",JSON.stringify(remember));
        } else {
          localStorage.removeItem("remember");
        }
        this.dialog.closeAll();
        sessionStorage.setItem(environment.storageKey,JSON.stringify(res?.data));
        this.http.isLoggedInOut.next(true);
      }
    })
  }
  
  signIn(provider: 'facebook' | 'google') {
    const providers = {
      facebook: {
        id: FacebookLoginProvider.PROVIDER_ID
      },
      google: { id: GoogleLoginProvider.PROVIDER_ID },
    };
    const socialProvider = providers[provider];
    this.socialService.signIn(socialProvider.id).then((socialUser: SocialUser) => {
        console.log(socialUser);
        let userData:any = {
          firstName: socialUser.firstName,
          lastName: socialUser.lastName,
          email: socialUser.email,
        };
        provider=='google'?userData['googleId']=socialUser.id:userData['facebookId']=socialUser.id;
        this.http.postRequest('socialLogin', userData).subscribe((response: any) => {
            if (response.statusCode == 200) {
              localStorage.setItem(environment.storageKey,JSON.stringify(response.data));
              this.common.successMsg(response.message);
              this.dialog.closeAll()
              this.http.isLoggedInOut.next(true);
            } else {
              this.common.errorMsg(response.message);
            }
          });
      })
      .catch((error) => {
        let message;
        if (error.error) {
          message = error.error.replace(/_/g, ' ');
        } else {
          message = error.message ? error.message : error;
        }
        if (
          message ===
          'Login providers not ready yet. Are there errors on your console?'
        ) {
          message =
            "Login providers not ready yet. Check your browser's cookie settings.";
        }
        this.common.errorMsg(message);
      });
  }
  
  openAppleAuthWindow() {
    window.open(
      'https://appleid.apple.com/auth/authorize?' +
        `client_id=${this.clientId}&` +
        `redirect_uri=${encodeURIComponent(this.yourRedirectURIVar)}&` +
        //`redirect_uri=${this.yourRedirectURIVar}&` +
        'response_type=code id_token&' +
        'state=state&' +
        'nonce=nonce&' +
        //'scope=name email&' +
        'response_mode=fragment',
      '_self'
    );
  }

}
