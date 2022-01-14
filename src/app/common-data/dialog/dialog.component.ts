import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from '../common-dialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  shownPassword: boolean;

  constructor(public dialog: MatDialogRef<DialogComponent>,
    private modal: CommonDialogService,
    private fb: FormBuilder,
    private api : ApiService,
    private common : CommonService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  Close() {
    this.dialog.close();
  }

  openSignUp() {
    this.dialog.close();
    this.modal.openSignUp().subscribe((res: any) => {
    })
  }
  openforget() {
    this.dialog.close();
    this.modal.openforget().subscribe((res: any) => {
    })
  }
  onSubmit(){
    if(this.form.valid){
      this.api.postRequest('login',this.form.value).subscribe((res : any)=>{
        if(res.statusCode == 200){
          localStorage.setItem('prep_user',JSON.stringify(res.data));
          localStorage.setItem('token',JSON.stringify(res.data.token));
          this.dialog.close();
          this.common.setProfile();
          this.common.successMsg("Login successful")
        }else{          
          this.common.errorMsg(res.message)
        }
      }, (error: any) => {
        console.log(error);        
      })
    }else{
      this.submitted = true;
    }      
  }
  get f() {
    return this.form.controls;
  }

  togglePassword(id){
    this.shownPassword = !this.shownPassword;
    if(this.shownPassword){
      document.getElementById(id).setAttribute('type', 'text');        
    }else{
      document.getElementById(id).setAttribute('type', 'password');
    }
  }

}
