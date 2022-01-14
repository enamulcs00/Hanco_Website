import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonService } from 'src/app/servies/common/common.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonDialogService } from '../common-dialog.service';
import * as moment from 'moment'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent1 implements OnInit {

  form: FormGroup;
  userData: string;
  educationList: any=[];
  data : any;

  constructor(public dialog: MatDialogRef<EducationComponent1>,
    private common : CommonService,
    private fb : FormBuilder,
    private api : ApiService,
    private modal : CommonDialogService
    ) { }

  ngOnInit(): void {
    this.getEducationList();
    this.form = new FormGroup({
      EducationDetails: new FormArray([
        this.initEducationDetails()
      ]),
    });
  }


  initEducationDetails() {
    return new FormGroup({
      education_id:new FormControl('',Validators.required),
      fieldofstudy: new FormControl('',Validators.required),
      college: new FormControl('',Validators.required),
      dateStarted: new FormControl('',Validators.required),
      EndDate: new FormControl('',Validators.required),
    });
  }

  getEducation(form) {
    return form.controls.EducationDetails.controls;
  }

  getEducationList(){
    this.api.getRequest("getEducation",'').subscribe((res : any)=>{
      if(res){
        this.educationList = res['data'];
        for(let list of this.educationList){
          list['status']= true;
        }
        if(localStorage.getItem('prep_user')){
          this.userData = JSON.parse(localStorage.getItem("prep_user"));
          if(this.userData['EducationDetails'] && this.userData['EducationDetails'].length>0){
            this.setValues(this.userData['EducationDetails']);
          }
          this.updateEductionList();
        }
      }
    })
  }

  setValues = data => {
    if (data) {
      this.form.setControl('EducationDetails', this.setEductionDetail(data));      
    }
  };

  setEductionDetail(data: any[]): FormArray {
    return new FormArray(data.map(item => new FormGroup({
      education_id: new FormControl(item['education_id']['_id'] || item['education_id'], Validators.required),
      fieldofstudy: new FormControl(item['fieldofstudy'], Validators.required),
      college : new FormControl(item['college'], Validators.required),
      dateStarted: new FormControl(moment(item['dateStarted']).format('YYYY-MM-DD'), Validators.required),
      EndDate:new FormControl(moment(item['EndDate']).format('YYYY-MM-DD'), Validators.required)
    })));    
  } 

  Close(){
    this.dialog.close();
  }

  onSubmit(type){    
    console.log(this.form.value,"dssjdshdj");
    if(this.form.valid){
      let data = this.form.value;
      data['isacademicexperience']= true;      
      this.api.postRequest("updateProfile",data).subscribe((res : any)=>{
        localStorage.setItem("prep_user", JSON.stringify(res['data']));
        this.userData = res['data'];
        if(this.userData['EducationDetails'] && this.userData['EducationDetails'].length>0){
          this.setValues(this.userData['EducationDetails']);
        }
        this.updateEductionList();
        if(type =='next'){
          this.api.postRequest("updateProfile",data).subscribe((res : any)=>{
            if(res.statusCode == 200){
              this.dialog.close();
              this.common.successMsg("Updated");
              this.modal.experience().subscribe((res : any)=>{
              })
            }else{
              this.common.errorMsg(res.message);
            }
          })
        }
        if(type =='add'){
          this.onAdd();
        }
      })
    }
  }

  updateEductionList(){
    if (this.userData && this.userData['EducationDetails'] && this.userData['EducationDetails'].length > 0 && this.educationList && this.educationList.length > 0) {
      for (let item of this.educationList) {
        if (this.educationList && this.educationList && this.educationList.length > 0) {
          let findIndexEdcuation = this.userData['EducationDetails'].findIndex(function (elem) {
            return item._id === elem['education_id']['_id'];
          })
          if (findIndexEdcuation !== -1) {
            item['status'] = false;
          } else {
            item['status'] = true;
          }
        }
      }
    }
  }



  onEdit(data, index){
    
  }

  onDelete(data,index){
    const control = <FormArray>this.form.get('EducationDetails');
    control.removeAt(index);
    this.onSubmit('')
  }

  onAdd(){
    const control = <FormArray>this.form.get('EducationDetails');
    control.push(this.initEducationDetails());
  }
}
