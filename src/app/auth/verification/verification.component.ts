import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private dialog: MatDialog,private commonData:CommonDialogService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  profileSetup() {
    this.dialog.closeAll();
     if(this.data==1){
     this.commonData.setPassword();
     }else{
     this.commonData.profileSetup();
    }
    }

}
