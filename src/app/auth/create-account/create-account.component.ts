import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';
import { ModalService } from '../modal.service';
import { ProfileSetupComponent } from '../profile-setup/profile-setup.component';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  isOpenDialog:boolean = false;
  phoneEmail = 'email';
  signUpForm:FormGroup;
  separateDialCode = false;
  submitted = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  constructor(private dialog: MatDialog,
    private fb:FormBuilder,
    private http:ApiService,
    private common:CommonService,
    private commonData:ModalService) { 
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
      cnfpassword:['',[Validators.required]]
    },{
      validator: this.http.MustMatch("password","cnfpassword"),
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isOpenDialog = true
    }, 100);
  }
   
  openLogin(){
    this.commonData.openSignIn();
  }
  
  openSigUp(){
    this.profileSetup();
  }

  profileSetup() {
    this.dialog.closeAll();
     this.commonData.verification(0);
    }
}
