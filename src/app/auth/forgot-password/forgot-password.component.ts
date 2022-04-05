import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  separateDialCode = false;
  submitted = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneEmail='phone';
  forgetForm:FormGroup;
  constructor(private dialog:MatDialog,
    private fb:FormBuilder,
    private http:ApiService,
    private common:CommonService,
    private commonData:ModalService) { 
      this.forgetForm=this.fb.group({
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        phoneNo: ['', [Validators.required]],
      })
    }

  ngOnInit(): void {
    this.changeStatus('phone');
  }

  changeStatus(res: any) {
    this.phoneEmail = res;
    if (this.phoneEmail == 'email') {
      this.forgetForm.controls[this.phoneEmail].setValidators([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]);
      this.forgetForm.controls[this.phoneEmail].updateValueAndValidity();
      this.forgetForm.controls['phoneNo'].clearValidators();
      this.forgetForm.controls['phoneNo'].updateValueAndValidity()
    }
    else {
      if (this.phoneEmail == 'phone') {
        this.forgetForm.controls['phoneNo'].setValidators([Validators.required]);
        this.forgetForm.controls['phoneNo'].updateValueAndValidity();
        this.forgetForm.controls['email'].clearValidators();
        this.forgetForm.controls['email'].updateValueAndValidity()
      }
    }
  }

  verification() {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
      return
    }
    let body: any;
    if (this.phoneEmail == 'email') {
      body = {
        "email": this.forgetForm.controls['email'].value,
      }
    } else {
      body = {
        "phoneNo": this.forgetForm.controls['phoneNo'].value.e164Number.replace(this.forgetForm?.value?.phoneNo?.dialCode,''),
        "dialCode": this.forgetForm.controls['phoneNo'].value.dialCode,
      }
    }
    this.http.postRequest('forgotPassword', body).subscribe((res: any) => {
      if (res.statusCode == 200) {
    this.common.successMsg(res.message)
    this.dialog.closeAll();
    body['type']=1;
    this.commonData.verification(body);
    }})
    }

}
