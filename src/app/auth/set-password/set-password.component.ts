import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  constructor(private dialog: MatDialog,private commonData:ModalService) { }

  ngOnInit(): void {
  }

  openLogin(){
    this.dialog.closeAll();
    this.commonData.openSignIn();
  }

}
