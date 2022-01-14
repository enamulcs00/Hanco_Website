import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MustMatch } from 'src/app/validator/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  type: any;
  code: any;
  id: any;
  form: FormGroup;
  submitted : boolean;

  constructor(
    private activateRoute : ActivatedRoute,
    private api : ApiService,
    private common : CommonService,
    private route : Router,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .subscribe(params => {
        this.type = params['type'];
        this.code = params['code'];
        this.id = params['id'];
        if(this.type == 0){
          this.verify();
        }
      })
      this.form = this.fb.group({
        newPassword: ["", [Validators.required]],
        password: ["", [Validators.required]]
      },{
        validator: MustMatch('newPassword', 'password')
    });
  }
  verify(){
    const data ={
      code : this.code,
      userId : this.id,
      isEmailVerify : true
    }
    this.api.postRequest("verifyOtp",data).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.route.navigateByUrl('/main');
        this.common.successMsg(res.message);
        localStorage.setItem("prep_user",res.data);
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
  reset(){
    if(this.form.valid){
      const data ={
        code : this.code,
        userId : this.id,
        newpassword : this.form.value.password
      }
      this.api.postRequest("newPass",data).subscribe((res : any)=>{
        if(res.statusCode == 200){
          this.common.successMsg(res.message);
          this.route.navigateByUrl('/main');
        }else{
          this.common.errorMsg(res.message);
        }
      })
    }else{
      this.submitted = true;
    }
  }

}
