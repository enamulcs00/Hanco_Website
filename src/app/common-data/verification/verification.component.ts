import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { CommonDialogService } from '../common-dialog.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  status0 : boolean = false;
  status1 : boolean = false;
  constructor(public dialog: MatDialogRef<VerificationComponent>,
    private api : ApiService,
    private modal : CommonDialogService,
    private common : CommonService
    ) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }
  onSubmit(){
    if(this.status0 || this.status1){
      if(this.status0){
        const data = JSON.parse(localStorage.getItem("signupData"));
        delete data['confirmPassword'];
        data['verificationType'] = 0;
        this.api.postRequest("signup",data).subscribe((res : any)=>{
          this.dialog.close();
          if(res.statusCode == 200 || res.statusCode == 201){
            this.modal.phoneVerification(data,0).subscribe((res : any)=>{
            })
            this.common.successMsg(res.message);
          }else{
            this.common.errorMsg(res.message);
            this.modal.openSignUp().subscribe((res : any)=>{
            })
          }
        })
      }
      if(this.status1){
        const data = JSON.parse(localStorage.getItem("signupData"));
        delete data['confirmPassword'];
        data['verificationType'] = 1;
        this.api.postRequest("signup",data).subscribe((res : any)=>{
          this.dialog.close();
          if(res.statusCode == 200 || res.statusCode == 201){
          this.modal.emailVerification(data,0).subscribe((res : any)=>{
          })
          this.common.successMsg(res.message);
        }else{
          this.common.errorMsg(res.message);
          this.modal.openSignUp().subscribe((res : any)=>{
          })
        }
        })
      }
    }else{

    }
  }

}
