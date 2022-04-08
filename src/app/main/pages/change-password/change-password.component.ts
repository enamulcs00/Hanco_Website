import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  userInfo: FormGroup;
  submitted: boolean = false;
  changePasswordForm: any;
  constructor(
    private fb: FormBuilder,
    private _authService: ApiService,
    private common:CommonService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ["", [Validators.required]],
        newPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this._authService.MustMatch(
          "newPassword",
          "confirmPassword"
        ),
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      const reqBody = {
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword,
      };
      this._authService.postRequest('changePassword', reqBody).subscribe(
        (response) => {
          console.log(response);
          this.changePasswordForm.reset();
          this.submitted = false;
          this.common.successMsg(response["message"]);
          this._router.navigate(['main/home']);
        }
      );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

}
