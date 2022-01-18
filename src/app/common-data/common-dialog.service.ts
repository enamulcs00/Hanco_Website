import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EducationComponent1 } from './education/education.component';
import { DialogComponent } from './dialog/dialog.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { SignUpComponent } from './signUp/sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import { SkillsComponent } from './skills/skills.component';
import { WorkSkillComponent } from './work-skill/work-skill.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { UploadProfileComponent } from './upload-profile/upload-profile.component';
import { CongartsComponent } from './congarts/congarts.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { JobThankyouComponent } from './job-thankyou/job-thankyou.component';
import { FireworksNightComponent } from './fireworks-night/fireworks-night.component';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { ProfileSetupComponent } from '../auth/profile-setup/profile-setup.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {

  constructor(private dialog: MatDialog) { }

  showModal() {
    let dialogRef: MatDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  openSignUp() {
    let dialogRef: MatDialogRef<SignUpComponent>;
    dialogRef = this.dialog.open(SignUpComponent,
      { 
        panelClass: 'custom-modalbox',
        // width:"800px",
     });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  openSignIn() {
    let dialogRef: MatDialogRef<SignInComponent>;
    dialogRef = this.dialog.open( SignInComponent,
      { 
        panelClass: 'custom-modalbox',
        // width:"800px",
     } );
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  

  openforget() {
    let dialogRef: MatDialogRef<ForgetPassComponent>;
    dialogRef = this.dialog.open(ForgetPassComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  phoneVerification(val,type) {
    let dialogRef: MatDialogRef<PhoneVerificationComponent>;
    dialogRef = this.dialog.open(PhoneVerificationComponent);
    dialogRef.componentInstance.data = {val, type};
    return dialogRef.afterClosed();
  } 
  emailVerification(val,type) {
    let dialogRef: MatDialogRef<EmailVerificationComponent>;
    dialogRef = this.dialog.open(EmailVerificationComponent);
    dialogRef.componentInstance.data = {val,type};
    return dialogRef.afterClosed();
  }
  verification() {
    let dialogRef: MatDialogRef<VerificationComponent>;
    dialogRef = this.dialog.open(VerificationComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  profileSetup() {
    let dialogRef: MatDialogRef<ProfileSetupComponent>;
    dialogRef = this.dialog.open(ProfileSetupComponent, { 
      panelClass: 'custom-modalbox',
      // width:"800px",
   });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
education(val) {
    let dialogRef: MatDialogRef<EducationComponent1>;
    dialogRef = this.dialog.open(EducationComponent1);
    dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  experience() {
    let dialogRef: MatDialogRef<WorkExperienceComponent>;
    dialogRef = this.dialog.open(WorkExperienceComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  skill() {
    let dialogRef: MatDialogRef<WorkSkillComponent>;
    dialogRef = this.dialog.open(WorkSkillComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  upLoadCertificate() {
    let dialogRef: MatDialogRef<UploadProfileComponent>;
    dialogRef = this.dialog.open(UploadProfileComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  congrats() {
    let dialogRef: MatDialogRef<CongartsComponent>;
    dialogRef = this.dialog.open(CongartsComponent,{ 
      panelClass: ['custom-modalbox','main-cls'],
      // width:"800px",
   });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  jobDetails(val) {
    let dialogRef: MatDialogRef<JobDetailsComponent>;
    dialogRef = this.dialog.open(JobDetailsComponent);
    dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  applyJob(val) {
    let dialogRef: MatDialogRef<ApplyJobComponent>;
    dialogRef = this.dialog.open(ApplyJobComponent);
    dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  jobThankYou() {
    let dialogRef: MatDialogRef<JobThankyouComponent>;
    dialogRef = this.dialog.open(JobThankyouComponent);
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  openDetails(val,type) {
    let dialogRef: MatDialogRef<FireworksNightComponent>;
    dialogRef = this.dialog.open(FireworksNightComponent);
    dialogRef.componentInstance.data = {data:val,type:type};
    return dialogRef.afterClosed();
  }
}
