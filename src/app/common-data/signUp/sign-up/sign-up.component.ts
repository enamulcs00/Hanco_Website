import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonDialogService } from '../../common-dialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from '../../../servies/validator.service'
import { MustMatch } from 'src/app/validator/must-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  submitted : any = false;
  shownPassword: boolean;
  shownPasswordd: boolean;
  constructor(public dialog: MatDialogRef<SignUpComponent>,
    private modal : CommonDialogService,
    private fb : FormBuilder,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ["", [Validators.required]],
      email: ["", [Validators.required , Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    },{
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  
  Close(){
    this.dialog.close();
  }

  openLogin(){
    this.dialog.close();
    this.modal.showModal().subscribe((res : any)=>{

    })
  }

  onSubmit(){
    if(this.form.valid){
      const data = this.form.value;
      data['phone'] = JSON.stringify(this.form.value.phone)
      localStorage.setItem("signupData", JSON.stringify(data));
      this.dialog.close();
      this.modal.verification().subscribe((res : any)=>{
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
  togglePasswordd(id){
    this.shownPasswordd = !this.shownPasswordd;
    if(this.shownPasswordd){
      document.getElementById(id).setAttribute('type', 'text');        
    }else{
      document.getElementById(id).setAttribute('type', 'password');
    }
  }
}
