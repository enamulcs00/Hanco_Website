import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  cms:any;
  isSubmitted:boolean=false;
  helpCenter:FormGroup;
  constructor(private fb:FormBuilder,
    private http:ApiService,
    private commonService:CommonService) { }

  ngOnInit(): void {
    this.getCMS();
    this.helpCenter=this.fb.group({
      userName:['',[Validators.required]],
      userEmail:['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),]],
      message:['',[Validators.required]]
    })
  }

  onProcced() {
    this.isSubmitted=true;
    if(this.helpCenter.invalid){
      this.helpCenter.markAllAsTouched();
      return;
    }
    this.http.postRequest("sendContactUs",this.helpCenter.value).subscribe(res=>{
      if(res.statusCode==200){
      this.commonService.successMsg(res["message"]);
      this.helpCenter.reset();
      this.isSubmitted=false;
      }
    })
  }
  
  
  get fval() {
    return this.helpCenter.controls;
  }

  getCMS(){
    var params=new HttpParams().set('page',"ContactUs");
    this.http.getRequestWithParam('getCMS',params).subscribe((res:any)=>{
      this.cms=res?.data;
    })
    }

}
