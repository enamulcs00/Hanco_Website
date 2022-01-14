import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
// import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class SetInterceptorService implements HttpInterceptor  {
  user : any;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.common.showSpinner();
    const clonedReq = this.handleRequest(req);    
    return next.handle(clonedReq);
  }
  handleRequest(req: HttpRequest<any>){
    let auth;
    if(localStorage.getItem('token')){
      // console.log(localStorage.getItem('dxg_dating_admin_token'))
      auth = JSON.parse(localStorage.getItem('token'));
    }
    let authReq;
    if ((req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put') && req.body instanceof FormData) {
      authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: auth ? 'Bearer '+ auth : 'guest'
        })
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: auth ? 'Bearer '+ auth : 'guest'
        })
      });
    }
    return authReq;
  }

}
