import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ResetPassComponent>,) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }

}
