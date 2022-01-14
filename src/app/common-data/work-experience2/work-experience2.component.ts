import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-work-experience2',
  templateUrl: './work-experience2.component.html',
  styleUrls: ['./work-experience2.component.scss']
})
export class WorkExperience2Component implements OnInit {

  constructor(public dialog: MatDialogRef<WorkExperience2Component>,) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }

}
