import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from 'src/app/auth/create-account/create-account.component';
import { ModalService } from 'src/app/auth/modal.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;

  constructor(private commonData : ModalService,
    private common : CommonService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.common.getProfile().subscribe(res => {
      this.userDetails = JSON.parse(localStorage.getItem("prep_user"));       
    })
  }
  // show(){
  //   this.commonData.showModal().subscribe((res : any)=>{
  //     console.log(res);
  //   })
  // }
  logout(){
    localStorage.clear();
    this.common.setProfile();   
  }

  openLogin(){
    // this.dialog.closeAll();
    this.commonData.openSignIn()
  }

}
