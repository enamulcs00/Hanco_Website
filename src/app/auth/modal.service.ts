import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { VerificationComponent } from './verification/verification.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) { }

  // showModal() {
  //   let dialogRef: MatDialogRef<DialogComponent>;
  //   dialogRef = this.dialog.open(DialogComponent);
  //   // dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  // openSignUp() {
  //   let dialogRef: MatDialogRef<SignUpComponent>;
  //   dialogRef = this.dialog.open(SignUpComponent,
  //     { 
  //       panelClass: 'custom-modalbox',
  //       // width:"800px",
  //    });
  //   // dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  openSignIn() {
    let dialogRef: MatDialogRef<SignInComponent>;
    dialogRef = this.dialog.open( SignInComponent,
      { 
        panelClass: ['custom-modalbox' ,'custom-signpo']
        // width:"800px",
     } );
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  

  openforget() {
    let dialogRef: MatDialogRef<ForgotPasswordComponent>;
    dialogRef = this.dialog.open(ForgotPasswordComponent,{ 
      panelClass: ['custom-modalbox','custom-forget'],
      // width:"800px",
   } );
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  // phoneVerification(val,type) {
  //   let dialogRef: MatDialogRef<PhoneVerificationComponent>;
  //   dialogRef = this.dialog.open(PhoneVerificationComponent);
  //   dialogRef.componentInstance.data = {val, type};
  //   return dialogRef.afterClosed();
  // } 
  // emailVerification(val,type) {
  //   let dialogRef: MatDialogRef<EmailVerificationComponent>;
  //   dialogRef = this.dialog.open(EmailVerificationComponent);
  //   dialogRef.componentInstance.data = {val,type};
  //   return dialogRef.afterClosed();
  // }
  verification(val) {
    let dialogRef: MatDialogRef<VerificationComponent>;
    dialogRef = this.dialog.open(VerificationComponent ,{ 
      panelClass: ['custom-modalbox','custom-verf']
      // width:"800px",
   } );
    dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }

  profileSetup() {
    let dialogRef: MatDialogRef<ProfileSetupComponent>;
    dialogRef = this.dialog.open(ProfileSetupComponent, { 
      panelClass: ['custom-modalbox', 'profile-setup-main'],
      // width:"800px",
   });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }

  setPassword() {
    let dialogRef: MatDialogRef<SetPasswordComponent>;
    dialogRef = this.dialog.open(SetPasswordComponent, { 
      panelClass: ['custom-modalbox', 'set-pass-main'],
      // width:"800px",
   });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
// education(val) {
//     let dialogRef: MatDialogRef<EducationComponent1>;
//     dialogRef = this.dialog.open(EducationComponent1);
//     dialogRef.componentInstance.data = val;
//     return dialogRef.afterClosed();
//   }
//   experience() {
//     let dialogRef: MatDialogRef<WorkExperienceComponent>;
//     dialogRef = this.dialog.open(WorkExperienceComponent);
//     // dialogRef.componentInstance.data = val;
//     return dialogRef.afterClosed();
//   }
  // skill() {
  //   let dialogRef: MatDialogRef<WorkSkillComponent>;
  //   dialogRef = this.dialog.open(WorkSkillComponent);
  //   // dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  // upLoadCertificate() {
  //   let dialogRef: MatDialogRef<UploadProfileComponent>;
  //   dialogRef = this.dialog.open(UploadProfileComponent);
  //   // dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  congrats() {
    let dialogRef: MatDialogRef<CongratulationsComponent>;
    dialogRef = this.dialog.open(CongratulationsComponent,{ 
      panelClass: ['custom-modalbox','main-cls'],
      // width:"800px",
   });
    // dialogRef.componentInstance.data = val;
    return dialogRef.afterClosed();
  }
  // jobDetails(val) {
  //   let dialogRef: MatDialogRef<JobDetailsComponent>;
  //   dialogRef = this.dialog.open(JobDetailsComponent);
  //   dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  // applyJob(val) {
  //   let dialogRef: MatDialogRef<ApplyJobComponent>;
  //   dialogRef = this.dialog.open(ApplyJobComponent);
  //   dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  // jobThankYou() {
  //   let dialogRef: MatDialogRef<JobThankyouComponent>;
  //   dialogRef = this.dialog.open(JobThankyouComponent);
  //   // dialogRef.componentInstance.data = val;
  //   return dialogRef.afterClosed();
  // }
  // openDetails(val,type) {
  //   let dialogRef: MatDialogRef<FireworksNightComponent>;
  //   dialogRef = this.dialog.open(FireworksNightComponent);
  //   dialogRef.componentInstance.data = {data:val,type:type};
  //   return dialogRef.afterClosed();
  // }
}
