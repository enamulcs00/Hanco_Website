import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { CommonDialogService } from '../common-dialog.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  data : any;
  jobDetails: any;

  constructor(
    public dialog: MatDialogRef<JobDetailsComponent>,
    private api : ApiService,
    private common : CommonService,
    private commonDialog : CommonDialogService
  ) { }

  ngOnInit(): void {
    this.getJobDetails();
  }

  getJobDetails(){
    this.api.getRequest(`getjobdetail?jobId=${this.data}`,'').subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.jobDetails = res?.data[0];
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }

  applyJob(){
    if(localStorage.getItem('token')){    
      this.commonDialog.applyJob(this.data).subscribe((res : any)=>{
        this.dialog.close();
      })
    }else{
      this.dialog.close();
      this.commonDialog.showModal().subscribe((res : any)=>{
        this.getJobDetails();
      })
    }

  }

  addBookmark(val,isSaved){
    if(localStorage.getItem('token')){
      this.api.postRequest("savedlist",{jobId : val , isSaved : !isSaved}).subscribe((res : any)=>{
        if(res.statusCode == 200){
          this.getJobDetails();
        }else{
          this.common.errorMsg(res.message);
        }
      })
    }else{
      this.dialog.close();
      this.commonDialog.showModal().subscribe((res : any)=>{
        this.getJobDetails();
      })
    }
  }

}
