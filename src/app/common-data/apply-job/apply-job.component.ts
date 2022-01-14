import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { CommonDialogService } from '../common-dialog.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  data : any;
  jobDetails: any;
  resume : any;
  constructor(
    public dialog: MatDialogRef<ApplyJobComponent>,
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

  onImageSelect(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.common.validateImageFile(event.target.files[0])) {
        this.common.uploadFile(event.target.files[0]).subscribe((response: any) => {
          this.resume = response['data'][0];
          console.log(this.resume);
          
        })
      }
    }
  }

  applyNow(){
    const body = {
      jobId : this.data,
      resume : this.resume
    }
    this.api.postRequest("applyjob",body).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.common.successMsg(res.message);
        this.commonDialog.jobThankYou().subscribe((res : any)=>{
          this.dialog.close();
        })
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }
}
