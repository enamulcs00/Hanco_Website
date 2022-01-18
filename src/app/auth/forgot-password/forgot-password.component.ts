import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dialog:MatDialog,private commonData:CommonDialogService) { }

  ngOnInit(): void {
  }

  verification() {
    this.dialog.closeAll();
     this.commonData.verification(1);
    }

}
