import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-education2',
  templateUrl: './education2.component.html',
  styleUrls: ['./education2.component.scss']
})
export class Education2Component implements OnInit {

  constructor(public dialog: MatDialogRef<Education2Component>,) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }

}
