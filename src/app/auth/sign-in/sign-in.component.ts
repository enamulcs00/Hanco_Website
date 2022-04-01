import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { ModalService } from '../modal.service';
declare var $ :any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isOpenDialog:boolean = false
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private common:ModalService,public dialogRef: MatDialogRef<SignInComponent>,) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpenDialog = true
    }, 100);
  }

  openSignUp(){
    this.dialog.closeAll();
    let dialogRef: MatDialogRef<CreateAccountComponent>;
    dialogRef = this.dialog.open( CreateAccountComponent,
      { 
        panelClass: 'custom-modalbox',
     } );
    return dialogRef.afterClosed();
  }

  forgetPass(){
    this.dialog.closeAll();
    this.common.openforget();
  }

}
