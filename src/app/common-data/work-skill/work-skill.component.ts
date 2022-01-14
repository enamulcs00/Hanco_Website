import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonDialogService } from '../common-dialog.service';

@Component({
  selector: 'app-work-skill',
  templateUrl: './work-skill.component.html',
  styleUrls: ['./work-skill.component.scss']
})
export class WorkSkillComponent implements OnInit {

  constructor(public dialog: MatDialogRef<WorkSkillComponent>,
    private modal : CommonDialogService
    ) { }

  ngOnInit(): void {
  }
  Close(){
    this.dialog.close();
  }
  onSubmit(){
    this.Close();
    this.modal.upLoadCertificate().subscribe((res : any)=>{
    })
  }

}
