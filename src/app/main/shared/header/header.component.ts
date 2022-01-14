import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountComponent } from 'src/app/auth/create-account/create-account.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDetails: any;

  constructor(private commonData : CommonDialogService,
    private common : CommonService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.common.getProfile().subscribe(res => {
      this.userDetails = JSON.parse(localStorage.getItem("prep_user"));       
    })
  }
  show(){
    this.commonData.showModal().subscribe((res : any)=>{
      console.log(res);
    })
  }
  logout(){
    localStorage.clear();
    this.common.setProfile();   
  }

  openLogin(){
    // this.dialog.closeAll();
    this.commonData.openSignIn()
  //  this.commonData.openSignIn().subscribe(res=>{
   // let dialogRef: MatDialogRef<SignInComponent>;
  //  let dialogRef = this.dialog.open(SignInComponent,{
  //  // width: '250px',
  //  // backdropClass: 'custom-dialog-backdrop-class',
  //   //panelClass: 'custom-dialog-panel-class',
  //   data:{}
  // })
   
   
   
  // dialogRef.afterClosed().subscribe(res=>{

   
  //   // dialogRef.componentInstance.data = val;
  //  // return dialogRef.afterClosed();
  //     if(res.data =='signup')
  //     {
  //     //  let dialogRef: MatDialogRef<CreateAccountComponent>;
  //      let dialogRef1 = this.dialog.open( CreateAccountComponent,
  //         { 
  //           // panelClass: 'custom-modalbox',
  //           width:"800px",
  //        } );
  //     }
  //   });
  }

}
