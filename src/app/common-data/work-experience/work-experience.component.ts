import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonService } from 'src/app/servies/common/common.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonDialogService } from '../common-dialog.service';
import * as moment from 'moment'

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  form: FormGroup;
  userData: string;
  experienceList: any=[];

  constructor(public dialog: MatDialogRef<WorkExperienceComponent>,
    private common : CommonService,
    private fb : FormBuilder,
    private api : ApiService,
    private modal : CommonDialogService
    ) {
    }
    
    
    ngOnInit(): void {
      this.form = new FormGroup({
        ExperienceDetails: new FormArray([
          this.initExperienceDetails()
        ]),
      });
      this.getExperience();
  }
  initExperienceDetails() {
    return new FormGroup({
      EmployerName:new FormControl('',Validators.required),
      position: new FormControl('',Validators.required),
      responsibilities: new FormControl('',Validators.required),
      currentlyworking: new FormControl(false,Validators.required),
      dateStarted: new FormControl('',Validators.required),
      dateEnd: new FormControl(''),
    }); 
  }
  getEducation(form) {
    return form.controls.ExperienceDetails.controls;
  }
  getExperience(){
        if(localStorage.getItem('prep_user')){
          this.userData = JSON.parse(localStorage.getItem("prep_user"));
          if(this.userData['ExperienceDetails'] && this.userData['ExperienceDetails'].length>0){
            this.setValues(this.userData['ExperienceDetails']);
          }
        }
  }
  setValues = data => {
    if (data) {
      console.log(data,"data set value");      
      this.form.setControl('ExperienceDetails', this.setExperienceDetail(data));      
    }
  };

  setExperienceDetail(data: any[]): FormArray {
    return new FormArray(data.map(item => new FormGroup({
      EmployerName: new FormControl(item['EmployerName'], Validators.required),
      position: new FormControl(item['position'], Validators.required),
      responsibilities : new FormControl(item['responsibilities'], Validators.required),
      currentlyworking : new FormControl(item['currentlyworking'], Validators.required),
      dateStarted: new FormControl(moment(item['dateStarted']).format('YYYY-MM-DD'), Validators.required),
      dateEnd:new FormControl(moment(item['dateEnd']).format('YYYY-MM-DD'))
    })));    
  } 
  Close(){
    this.dialog.close();
  }

  onDelete(data,index){
    const control = <FormArray>this.form.get('ExperienceDetails');
    control.removeAt(index);
    this.onSubmit('')
  }

  onAdd(){
    const control = <FormArray>this.form.get('ExperienceDetails');
    control.push(this.initExperienceDetails());
  }

  onSubmit(type){  
    for (let index = 0; index < this.form.controls['ExperienceDetails'].value.length; index++) {
      if(this.form.controls['ExperienceDetails'].value[index].currentlyworking){
        this.form.controls['ExperienceDetails'].value[index].dateEnd.setValidators([Validators.required]);
      }      
    }
    
    if(this.form.valid){
      let data = this.form.value;
      data['workexperience'] = true;
      this.api.postRequest("updateProfile",data).subscribe((res : any)=>{
        localStorage.setItem("prep_user", JSON.stringify(res['data']));
        this.userData = res['data'];
        if(this.userData['ExperienceDetails'] && this.userData['ExperienceDetails'].length>0){
          this.setValues(this.userData['ExperienceDetails']);
        }
        if(type =='next'){
          this.api.postRequest("updateProfile",data).subscribe((res : any)=>{
            if(res.statusCode == 200){
              this.dialog.close();
              this.common.successMsg("Updated");
              this.modal.skill().subscribe((res : any)=>{
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

}
