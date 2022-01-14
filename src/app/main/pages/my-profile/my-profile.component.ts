import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userDetails: any;
  exp: any;

  constructor(
    private api : ApiService,
    private common : CommonService,
    private modal : CommonDialogService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(){
    this.api.getRequest("profile",{}).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.userDetails = res.data;
        for (let index = 0; index < this.userDetails.ExperienceDetails.length; index++) {
          if(this.userDetails.ExperienceDetails[index].currentlyworking){
            this.exp = this.userDetails.ExperienceDetails[index];
          }
        }
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
  openProfile(){
    this.modal.profileSetup(1).subscribe((res : any)=>{
      this.getProfile();
    })
  }
  openEducation(){
    this.modal.education(1).subscribe((res : any)=>{
      this.getProfile();
    })
  }

  openExp(){
    this.modal.experience().subscribe((res : any)=>{
      this.getProfile();
    })
  }
  openSkill(){
    this.modal.skill().subscribe((res : any)=>{
      this.getProfile();
    })
  }
  openCertificate(){
    this.route.navigate(['/main/certifications-awards']);
  }
}
