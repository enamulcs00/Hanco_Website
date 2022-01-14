import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-job-thankyou',
  templateUrl: './job-thankyou.component.html',
  styleUrls: ['./job-thankyou.component.scss']
})
export class JobThankyouComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<JobThankyouComponent>,

  ) { }

  ngOnInit(): void {
  }

}
