import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { CommonDialogService } from '../common-dialog.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.scss']
})
export class UploadProfileComponent implements OnInit {
  images : any = [];
  data: any;
  constructor(public dialog: MatDialogRef<UploadProfileComponent>,
    private common : CommonService,
    private api : ApiService,
    private modal : CommonDialogService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem("prep_user")){
      this.data = JSON.parse(localStorage.getItem("prep_user"));
      this.images = this.data.certificates; 
    }
  }
  Close(){
    this.dialog.close();
  }

  onImageSelect(event) {
    if (event.target.files && event.target.files[0]) {
      if (this.common.validateImageFile(event.target.files[0])) {
        this.common.uploadFile(event.target.files[0]).subscribe((response: any) => {
          this.images.push(response['data'][0]);
          console.log(this.images);
        })
      }
    }    
  }
  onSubmit(){
    const body = {
      certificate : true,
      certificates : this.images
    }
    this.api.postRequest("updateProfile",body).subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.dialog.close();
        this.common.successMsg(res.message);
        this.modal.congrats().subscribe((res : any)=>{
        })
      }else{
        this.common.errorMsg(res.message);
      }
    })
  }

}
