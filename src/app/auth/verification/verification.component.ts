import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Config } from 'ng-otp-input/lib/models/config';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})

export class VerificationComponent implements OnInit {

  otpForm:FormGroup;
  otpvalue: any;
  submitted=false;
    config :Config = {
    allowNumbersOnly: false,
    length:4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '60px',
      'height': '60px',
      'border': '1px solid #AA1D1E',
      'padding': '9px',
      'font-size': '30px',
      'font-weight': 'bold',
      'border-radius': '50%',
      'margin-right': '0'
 
    }
  };
  constructor(private dialog: MatDialog,
    private fb:FormBuilder,
    private http:ApiService,
    private common:CommonService,
    private commonData:ModalService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.otpForm = this.fb.group({
        code: ['', [Validators.required]],
      });
    }

  ngOnInit(): void {
  }

  onOtpChange(event: any) {
    this.otpvalue = event;
    if (this.otpvalue.length == 4) {
      this.otpForm.patchValue({ code: this.otpvalue });
      this.otpForm.markAllAsTouched();
      // this.openSetPassword();
    } else {
      // this.otpForm.patchValue({ code: '' });
    }
  }

  profileSetup() {
    this.submitted=true;
    if(this.otpForm.invalid){
      this.otpForm.markAllAsTouched();
      return
    }
    let body=this.data;
    let keyList=['verifyBy','latitude','longitude','password','role','verifyBy']
    keyList.filter(res=>{delete body[res]});
    body['oneTimeCode']=this.otpForm.value.code
    this.http.postRequest('verifyOtp', body).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.dialog.closeAll();
        this.common.successMsg(res.message)
        if(this.data==1){
        this.commonData.setPassword();
        }else{
        localStorage.setItem(environment.storageKey,JSON.stringify(res?.data));
        this.commonData.profileSetup(body);
       }
      }
    })
   
    }

}
