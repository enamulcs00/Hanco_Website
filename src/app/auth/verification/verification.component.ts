import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Config } from 'ng-otp-input/lib/models/config';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})

export class VerificationComponent implements OnInit {

  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
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
  onOtpChange(otp) {
    this.otp = otp;
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  constructor(private dialog: MatDialog,private commonData:CommonDialogService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  profileSetup() {
    this.dialog.closeAll();
     if(this.data==1){
     this.commonData.setPassword();
     }else{
     this.commonData.profileSetup();
    }
    }

}
