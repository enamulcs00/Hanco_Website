import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  setForm:FormGroup;
  submitted: boolean=false;
  user:any;
  constructor(private dialog: MatDialog,
    private fb:FormBuilder,
    private common:CommonService,
    private http:ApiService,
    private commonData:ModalService) {
      this.setForm = this.fb.group({
        password: ['', [Validators.required,Validators.minLength(8)]],
        cnfpassword:['',[Validators.required]]
      },{
        validator: this.http.MustMatch("password","cnfpassword"),
      });
     }

  ngOnInit(): void {
    this.user =JSON.parse(sessionStorage[environment.storageKey]);
  }

  openLogin(){
    this.submitted=true;
    if(this.setForm.invalid){
      this.setForm.markAllAsTouched();
      return
    }
    let body = {
      "newPassword": this.setForm.controls['password'].value,
      "_id":this.user._id
    }
    this.http.postRequest('resetPassword', body).subscribe((res: any) => {
      if (res.statusCode == 200) {
    this.common.successMsg(res.message)
    this.dialog.closeAll();
    this.commonData.openSignIn();
  }});
  }

}
