import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorComponent } from './validator/validator/validator.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SetInterceptorService } from './servies/setInter/set-inter.service';
import { GetInterService } from './servies/getInter/get-inter.service';
import { ToastrModule } from 'ngx-toastr';
// import { ForgetPassComponent } from './common-data/forget-pass/forget-pass.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "rgba(255,255,255,0)",
  "bgsOpacity": 1,
  "bgsPosition": "bottom-right",
  "bgsSize": 150,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "rgba(255,255,255,0)",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(255,255,255,0)",
  "pbColor": "#951516",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "maxTime": -1,
  "minTime": 300
};

@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component,
    ValidatorComponent,
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
    PaginationModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxIntlTelInputModule
  ],
  providers: [ 
    NgxUiLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: SetInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: GetInterService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
