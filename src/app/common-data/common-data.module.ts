import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonDataRoutingModule } from './common-data-routing.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { SignupVerifyComponent } from './signup-verify/signup-verify.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { AcademicExperienceComponent } from './academic-experience/academic-experience.component';
import { SkillsComponent } from './skills/skills.component';
import { DocumentComponent } from './document/document.component';
import { CongartsComponent } from './congarts/congarts.component';
import { Education2Component } from './education2/education2.component';
import { WorkExperience2Component } from './work-experience2/work-experience2.component';
import { WorkSkillComponent } from './work-skill/work-skill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FireworksNightComponent } from './fireworks-night/fireworks-night.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';


@NgModule({
  declarations: [EmailVerificationComponent,
    ResetPassComponent,
    SignupVerifyComponent,
    EmailVerifyComponent, 
    AcademicExperienceComponent,
    SkillsComponent,
    DocumentComponent,
    CongartsComponent, 
    Education2Component,
    WorkExperience2Component, 
    WorkSkillComponent,  
    FireworksNightComponent, 
    AppliedJobsComponent,  
  ],
  imports: [
    CommonModule,
    CommonDataRoutingModule,
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CommonDataModule { }
