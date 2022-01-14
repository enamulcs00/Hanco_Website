import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private dialog: MatDialog,private commonData:CommonDialogService) { }

  ngOnInit(): void {
  }
   
  openLogin(){
    //this.dialog.closeAll();
    this.commonData.openSignIn();
  }

}
