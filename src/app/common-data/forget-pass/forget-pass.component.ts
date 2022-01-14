import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogService } from '../common-dialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  type: any;
  constructor(public dialog: MatDialogRef<ForgetPassComponent>,
    private modal: CommonDialogService,
    private fb: FormBuilder,
    private api: ApiService,
    private common : CommonService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required]],
    });
  }
  Close() {
    this.dialog.close();
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    if (this.form.valid) {
      this.api.postRequest("forgotPassword", this.form.value).subscribe((res: any) => {
        if(res.statusCode == 200){
          this.type = res.data.verificationType;
          if (this.type == 1) {
            this.dialog.close();
            this.modal.emailVerification(res.data.email,1).subscribe((resp: any) => {
            })
          }
          if (this.type == 0) {
            this.dialog.close();
            this.modal.phoneVerification(this.form.value,1).subscribe((resp: any) => {
            })
          }
        }else{
          this.common.errorMsg(res.message);
        }
      }, (error: any) => {
        console.log(error);
      })
    } else {
      this.submitted = true;
    }
  }
}
