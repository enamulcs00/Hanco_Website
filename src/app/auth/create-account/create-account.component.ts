import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { ModalService } from '../modal.service';
import { ProfileSetupComponent } from '../profile-setup/profile-setup.component';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  isOpenDialog:boolean = false;
  phoneEmail = 'email';
  signUpForm:FormGroup;
  separateDialCode = false;
  submitted = false;
  passText="password";
  passText1="password";
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  constructor(private dialog: MatDialog,
    private fb:FormBuilder,
    private http:ApiService,
    private common:CommonService,
    private commonData:ModalService) { 
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      cnfpassword:['',[Validators.required]]
    },{
      validator: this.http.MustMatch("password","cnfpassword"),
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpenDialog = true
    }, 100);
    this.changeStatus('email');
  }
   
  openLogin(){
    this.commonData.openSignIn();
  }
  
  openSigUp(){
    this.profileSetup();
  }
  
  changeStatus(res: any) {
    this.phoneEmail = res;
    if (this.phoneEmail == 'email') {
      this.signUpForm.controls[this.phoneEmail].setValidators([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]);
      this.signUpForm.controls[this.phoneEmail].updateValueAndValidity();
      this.signUpForm.controls['phone'].reset();
      this.signUpForm.controls['phone'].clearValidators();
      this.signUpForm.controls['phone'].updateValueAndValidity()
    }
    else {
      if (this.phoneEmail == 'phone') {
        this.signUpForm.controls[this.phoneEmail].setValidators([Validators.required]);
        this.signUpForm.controls[this.phoneEmail].updateValueAndValidity();
        this.signUpForm.controls['email'].reset();
        this.signUpForm.controls['email'].clearValidators();
        this.signUpForm.controls['email'].updateValueAndValidity()
      }
    }
  }


  profileSetup() {
    this.submitted=true;
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched();
      return
    }
    let body: any;
    if (this.phoneEmail == 'email') {
      body = {
        "email": this.signUpForm.controls['email'].value,
        "password": this.signUpForm.controls['password'].value,
        "verifyBy": 'email',
        "role" : "USER",
        "latitude": "30.7046",
        "longitude": "76.7179"
      }
    } else {
      body = {
        "phoneNo": this.signUpForm.controls['phone'].value.number,
        "dialCode": this.signUpForm.controls['phone'].value.dialCode,
        "password": this.signUpForm.controls['password'].value,
        "verifyBy": 'phone',
        "role" : "USER",
        "latitude": "30.7046",
        "longitude": "76.7179"
      }
    }
    console.log(body, this.signUpForm)
    this.http.postRequest('register', body).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.common.successMsg(res.message)
        this.dialog.closeAll();
        this.commonData.verification(body);
      }
    })
    }
}
