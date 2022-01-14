import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-congarts',
  templateUrl: './congarts.component.html',
  styleUrls: ['./congarts.component.scss']
})
export class CongartsComponent implements OnInit {

  constructor(public dialog: MatDialogRef<CongartsComponent>,) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }

}
