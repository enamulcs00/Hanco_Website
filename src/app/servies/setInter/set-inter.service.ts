import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import { CommonService } from '../common/common.service';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetInterceptorService implements HttpInterceptor  {
  totalRequests: number = 0;
  constructor(private common:CommonService){ }
  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.totalRequests++;
    this.common.showSpinner();
    let token:any;
    token = !(localStorage[environment.storageKey] == undefined || localStorage[environment.storageKey] == null || localStorage[environment.storageKey] == '') ? JSON.parse(localStorage[environment.storageKey]) : '';
    // console.log("token",token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token?.token}`,
        },
      });
    }
  
    return next.handle(request).pipe( finalize(() => {
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
