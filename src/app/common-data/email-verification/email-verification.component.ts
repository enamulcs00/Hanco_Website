import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  data : any;
  type: any;
  datas: any;
  constructor(public dialog: MatDialogRef<EmailVerificationComponent>,
    private api : ApiService,
    private route : Router,
    private common : CommonService
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.datas = this.data.val;
    this.type = this.data.type;

  }
  Close(){
    this.dialog.close();
  }
  resendEmail(){
    this.api.postRequest("resendEmail",{email : this.datas.email}).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.common.successMsg("Email sent succesfully");
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
}
