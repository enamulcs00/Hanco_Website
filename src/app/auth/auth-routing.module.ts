import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerificationComponent } from './verification/verification.component';


const routes: Routes = [
  {
    path : 'signin',
    component: SignInComponent
  },
  {
    path : 'forgotpassword',
    component: ForgotPasswordComponent   
  },

  {
    path : 'createaccount',
    component: CreateAccountComponent   
  },
  {
    path : 'verification',
    component: VerificationComponent   
  },
  {
    path : 'setpassword',
    component: SetPasswordComponent   
  },
  {
    path : 'profilesetup',
    component: ProfileSetupComponent   
  },
  {
    path : 'Congratulations',
    component: CongratulationsComponent   
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
