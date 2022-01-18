import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { CommonDialogService } from '../common-dialog.service';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss']
})
export class PhoneVerificationComponent implements OnInit {
  data : any;
  phone: any;
  code: any;
  type: any;
  constructor(public dialog: MatDialogRef<PhoneVerificationComponent>,
    private api :ApiService,
    private route : Router,
    private modal : CommonDialogService,
    private common : CommonService
    ) { }

  ngOnInit(): void {
    this.phone = this.data.val.username || this.data.val.phone;
    this.type = this.data.type;
    console.log(this.data);
    
  }

  Close(){
    this.dialog.close();
  }
  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }
  onOtpChange(e){
    console.log(e);
    this.code = e;
  }
  verifyOtp(){
    const body = {
      code : this.code,
      phone : this.phone
    }
    this.api.postRequest("verifyOtp",body).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.dialog.close();
        if(this.type == 1){
          this.common.successMsg(res.message);
          this.route.navigate(['/resetPassword'], { queryParams: { id: res['data']['id'], type: 1 }})
        }
        if(this.type == 0){
          this.common.successMsg(res.message);
          localStorage.setItem("token",JSON.stringify(res.data.token));
          this.common.setProfile();
          localStorage.setItem("prep_user",res.data);
          this.modal.profileSetup().subscribe((res : any)=>{
          })
        }
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
  resend(){
    this.api.postRequest("resendOtp",{phone : this.phone}).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.common.successMsg("OTP sent succesfully");
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
}
