import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import { CommonService } from '../common/common.service';
import { environment } from 'src/environments/environment';
import { finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SetInterceptorService implements HttpInterceptor  {
  totalRequests: number = 0;
  constructor(private common:CommonService,private toastr :ToastrService){ }
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.totalRequests++;
    this.common.showSpinner();
    let token:any;
    token = !(sessionStorage[environment.storageKey] == undefined || sessionStorage[environment.storageKey] == null || sessionStorage[environment.storageKey] == '') ? JSON.parse(sessionStorage[environment.storageKey]) : '';
    console.log("token",token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token?.accessToken}`,
        },
      });
    }
  
    return next.handle(request).pipe(tap((data: any) => {
      if(data.body && data.body.statusCode == 208){
        this.toastr.error(data?.body?.message);
        return 
      }}),finalize(() => {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.common.hideSpinner();
      }
      timer(300000).subscribe((val)=>{if(val==300000){
        this.common.hideSpinner();
      }})
    }));
  }

}
