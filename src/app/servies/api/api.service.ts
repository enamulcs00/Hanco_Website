import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;
  uploadProfile = environment.baseUrl + '/upload/';
  isLoggedInOut = new Subject();
  constructor(
    private _commonService: CommonService,
    private _http: HttpClient,
    private _router: Router
  ) { }

  getRequest(endPoint, reqBody) {
    return this._http.get(`${this.baseUrl}${endPoint}`, reqBody)
    .pipe(
      catchError(this.handleError<any>('Get Request'))
    );
  }

  postRequest(endPoint, reqBody) {    
    return this._http.post(`${this.baseUrl}${endPoint}`, reqBody)
    .pipe(
      catchError(this.handleError<any>('Post Request'))
    );
  }

  postRequestUpload(endPoint, reqBody) {
    return this._http.post(`${this.uploadProfile}${endPoint}`, reqBody)
    .pipe(
      catchError(this.handleError<any>('Post Request'))
    );
  }

  putRequest(endPoint, reqBody) {
    return this._http.put(`${this.baseUrl}${endPoint}`, reqBody)  
    .pipe(
      catchError(this.handleError<any>('Put Request'))
    );
  }

  deleteRequest(endPoint, reqBody) {
    return this._http.delete(`${this.baseUrl}${endPoint}`, reqBody)
    .pipe(
      catchError(this.handleError<any>('Delete Request'))
    );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(false){
        this._commonService.errorMsg("Error!")
      } else {
        console.error(error);
        this._commonService.errorMsg(error)
      }
      return;
    };
  }
}
