import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userDetails = new BehaviorSubject<any>('');
  uploadProfile = environment.baseUrl + '/upload';

  constructor(
    private http : HttpClient,
    private toastr : ToastrService,
    private ngxService: NgxUiLoaderService
  ) { 
    if(localStorage.getItem('token')){
      this.setProfile();
    }
  }

  setProfile(){
    if(localStorage.getItem('token')){
      var value = JSON.parse(localStorage.getItem('token'));      
      this.userDetails.next(value);
    }else{
      this.userDetails.next('');
    }
  }
  getProfile(): Observable<boolean> {
    return this.userDetails.asObservable()
  }
  uploadFile(data) {
    const reqBody = new FormData();
    reqBody.append('files', data)
    return this.http.post(`${this.uploadProfile}`, reqBody);
  }
  validateImageFile(fileData) {
    if (fileData.type == 'image/jpeg' || fileData.type == 'image/png' || fileData.type == 'image/jpg' || fileData.type == 'image/svg' || fileData.type == 'image/webp' || fileData.type == 'image/gif') {
      return true;
    } else {
      // this.errorMsg('Only Image file is accepted!')
      return false;
    }
  }

  errorMsg(msg) {    
    this.toastr.error(msg);
  }

  successMsg(msg) {
    this.toastr.success(msg);
  }
   
  showSpinner(){
    this.ngxService.start();
  }

  hideSpinner(){
    this.ngxService.stop();
  }

} 
