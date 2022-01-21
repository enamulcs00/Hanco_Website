import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { ProfileSetupComponent } from '../profile-setup/profile-setup.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  isOpenDialog:boolean = false
  constructor(private dialog: MatDialog,private commonData:CommonDialogService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpenDialog = true
    }, 100);
  }
   
  openLogin(){
    //this.dialog.closeAll();
    this.commonData.openSignIn();
  }
  
  openSigUp(){
    // this.dialog.closeAll();
    // this.commonData.profileSetup();
    this.profileSetup();
  }

  profileSetup() {
    this.dialog.closeAll();
     this.commonData.verification(0);
    }
}
