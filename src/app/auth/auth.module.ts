import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerificationComponent } from './verification/verification.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [SignInComponent, ForgotPasswordComponent, CreateAccountComponent, VerificationComponent, SetPasswordComponent, ProfileSetupComponent, CongratulationsComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatDialogModule,
    NgOtpInputModule
  ],
  exports:[SignInComponent, ForgotPasswordComponent, CreateAccountComponent, VerificationComponent, SetPasswordComponent, ProfileSetupComponent, CongratulationsComponent]
})
export class AuthModule { }
