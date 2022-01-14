import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonService } from 'src/app/servies/common/common.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonDialogService } from '../common-dialog.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  form: FormGroup;
  userData: any;
  data : any;

  constructor(public dialog: MatDialogRef<ProfileSetupComponent>,
    private common : CommonService,
    private fb : FormBuilder,
    private api : ApiService,
    private modal : CommonDialogService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      image: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      Gender: ["", [Validators.required]]
    });
    this.userData = JSON.parse(localStorage.getItem("signupData")) || JSON.parse(localStorage.getItem("prep_user"));
    if(this.data == 1){
      console.log(this.userData);
      
      this.form.patchValue(this.userData);
    }else{
      this.form.controls['email'].setValue(this.userData['email']);
      this.form.controls['phone'].setValue(this.userData['phone']);
    }
    
  }
  Close(){
    this.dialog.close();
  }
  onImageSelect(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.common.validateImageFile(event.target.files[0])) {
        this.common.uploadFile(event.target.files[0]).subscribe((response: any) => {
          this.form.controls['image'].setValue(response['data'][0]);
        })
      }
    }
  }
  onSubmit(){
    const data = this.form.value;
    delete data['email'];
    delete data['phone'];
    data['isProfilesetup']= true;
    this.api.postRequest("updateProfile",data).subscribe((res : any)=>{
      if(res.statusCode == 200){
        localStorage.setItem("prep_user", JSON.stringify(res['data']));
        this.common.setProfile();
        this.dialog.close();
        if(this.data == 0){
          this.modal.education(0).subscribe((res : any)=>{
          })
        }
        this.common.successMsg("Profile updated");
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
}
