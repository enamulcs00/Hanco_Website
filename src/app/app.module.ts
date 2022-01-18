import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotFound404Component } from './notFound404/not-found404/not-found404.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './common-data/signUp/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorComponent } from './validator/validator/validator.component';
import { DialogComponent } from './common-data/dialog/dialog.component';
import { ForgetPassComponent } from './common-data/forget-pass/forget-pass.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PhoneVerificationComponent } from './common-data/phone-verification/phone-verification.component';
import { ResetPasswordComponent } from './common-data/reset-password/reset-password.component';
import { SetInterceptorService } from './servies/setInter/set-inter.service';
import { GetInterService } from './servies/getInter/get-inter.service';
import { ToastrModule } from 'ngx-toastr';
import { VerificationComponent } from './common-data/verification/verification.component';
import { EducationComponent1 } from './common-data/education/education.component';
// import { ForgetPassComponent } from './common-data/forget-pass/forget-pass.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { WorkExperienceComponent } from './common-data/work-experience/work-experience.component';
import { UploadProfileComponent } from './common-data/upload-profile/upload-profile.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { JobDetailsComponent } from './common-data/job-details/job-details.component';
import { ApplyJobComponent } from './common-data/apply-job/apply-job.component';
import { JobThankyouComponent } from './common-data/job-thankyou/job-thankyou.component';



@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component,
    SignUpComponent,
    ResetPasswordComponent,
    DialogComponent,
    ValidatorComponent,
    ForgetPassComponent,
    PhoneVerificationComponent,
    VerificationComponent,
    EducationComponent1,
    WorkExperienceComponent,
    UploadProfileComponent,
    JobDetailsComponent,
    ApplyJobComponent,
    JobThankyouComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgOtpInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxSliderModule,
    FormsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss : true,
      preventDuplicates : true
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatFormFieldModule,
    MatInputModule,
    SlickCarouselModule,
    PaginationModule.forRoot()
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: SetInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: GetInterService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
