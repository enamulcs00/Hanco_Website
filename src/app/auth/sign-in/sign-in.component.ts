import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
declare var $ :any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private common:CommonDialogService,public dialogRef: MatDialogRef<SignInComponent>,) { }

  ngOnInit(): void {
    
  }

  openSignUp(){
    this.dialog.closeAll();

 //  this.dialogRef.close({ event: 'close', data: 'sinup' });
    let dialogRef: MatDialogRef<CreateAccountComponent>;
    dialogRef = this.dialog.open( CreateAccountComponent,
      { 
        panelClass: 'custom-modalbox',
        // width:"800px",
     } );
    // dialogRef.componentInstance.data = data;
    return dialogRef.afterClosed();
  }

}
