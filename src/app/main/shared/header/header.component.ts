import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAccountComponent } from 'src/app/auth/create-account/create-account.component';
import { ModalService } from 'src/app/auth/modal.service';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;
  showTokenFlag:boolean=false;
  dropdownFlag:any;
  constructor(private commonData : ModalService,
    private common : CommonService,
    public router:Router,
    private http:ApiService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showTokenFlag=sessionStorage[environment?.storageKey]?true:false;
    this.showTokenFlag?this.getProfile():'';
    this.http.isLoggedInOut.subscribe((res:any) => {
      this.showTokenFlag=sessionStorage[environment?.storageKey]?true:false;
      this.showTokenFlag?this.getProfile():"";
    });
  }

  logOut(){
    this.http.postRequest('logout',{}).subscribe(res=>{
    sessionStorage.removeItem(environment.storageKey);
    if(res.statusCode==200){
    this.common.successMsg("Logout Successfully");
    this.http.isLoggedInOut.next(false);
    this.router.navigate(['/main/home']);
    }})
  }

  getProfile(){
    this.http.getRequest('getProfile',{}).subscribe((res:any)=>{
      this.userDetails=res?.data;
    })
    }

  openLogin(){
    this.commonData.openSignIn()
  }

}
