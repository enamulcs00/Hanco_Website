import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
declare var $ :any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: MatDialog,private common:CommonDialogService) { }

  ngOnInit(): void {
    
  }

  openSignUp(){
    this.dialog.closeAll();
    let dialogRef: MatDialogRef<CreateAccountComponent>;
    dialogRef = this.dialog.open( CreateAccountComponent,
      { 
        // panelClass: 'custom-modalbox',
        // width:"800px",
     } );
    // dialogRef.componentInstance.data = data;
    return dialogRef.afterClosed();
  }

}
