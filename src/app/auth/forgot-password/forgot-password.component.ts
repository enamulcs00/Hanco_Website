import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dialog:MatDialog,private commonData:ModalService) { }

  ngOnInit(): void {
  }

  verification() {
    this.dialog.closeAll();
     this.commonData.verification(1);
    }

}
