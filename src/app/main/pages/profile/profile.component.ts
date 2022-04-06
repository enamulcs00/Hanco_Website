import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails:any;
  userTypeValue:any="1";
  todayDate=moment(new Date()).format('YYYY-MM-DD')
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  formattedaddress1:any;
  profileForm:FormGroup;
  separateDialCode = false;
  submitted = false;
  constructor(private http:ApiService,
    private common:CommonService,
    private router:Router,
    private fb:FormBuilder,
    ) {
    this.profileForm=this.fb.group({
      image: [""],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phoneNo: ["", [Validators.required]],
      userType: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      state: ["", [Validators.required]],
      birthDate: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      crNumber: ["", [Validators.required]],
      address1: ["", [Validators.required]],
      address2: ["", [Validators.required]],
      vatRegistrationNo: ["", [Validators.required]],
      customerId: ["", [Validators.required]],
      customerIdExpDate: ["", [Validators.required]],
      license: ["", [Validators.required]],
      licenseExpDate: ["", [Validators.required]],
      latitude: ["30.7046"],
      longitude: ["76.7179"],
      nationality:  ["", [Validators.required]],
  })
   }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.http.getRequest('getProfile',{}).subscribe((res:any)=>{
      this.userDetails=res?.data;
      this.updateUser({target:{value:this.userDetails.userType=='INDIVIDUAL'?1:2}});
      this.profileForm.patchValue(this.userDetails);
      this.profileForm.patchValue({latitude:this.userDetails.latitude.toString()});
      this.profileForm.patchValue({longitude:this.userDetails.longitude.toString()});
      this.profileForm.patchValue({phoneNo:this.userDetails.dialCode+" "+this.userDetails.phoneNo});
    })
    }

    updateUser(e){
      this.userTypeValue=e.target.value;
      if(e.target.value==1){
      var key=['license','licenseExpDate'];
      var key1=['vatRegistrationNo','crNumber'];
      key.filter(res=>{
      this.profileForm.controls[res].setValidators([Validators.required]);
      this.profileForm.controls[res].patchValue('');
      this.profileForm.controls[res].updateValueAndValidity();
      });
      key1.filter(res=>{
        this.profileForm.controls[res].clearValidators();
        this.profileForm.controls[res].patchValue('0');
        this.profileForm.controls[res].updateValueAndValidity();
        });
      this.profileForm.patchValue({userType:'INDIVIDUAL'})
      }
      else if(e.target.value==2){
      var key=['vatRegistrationNo','crNumber'];
      var key1=['license','licenseExpDate'];
      key.filter(res=>{
        this.profileForm.controls[res].setValidators([Validators.required]);
        this.profileForm.controls[res].patchValue('');
        this.profileForm.controls[res].updateValueAndValidity();
        });
        key1.filter(res=>{
          this.profileForm.controls[res].clearValidators();
          this.profileForm.controls[res].patchValue('0');
          this.profileForm.controls[res].updateValueAndValidity();
          });
      this.profileForm.patchValue({userType:'CORPORATE'})
      }
      }

    onFileChanged(evt){
      var files = evt.target.files;
      var file = files[0];
      if (files && file) {
        this.upload(file);
      }
    }
  
      //upload
      upload(data:any){
        const formData=new FormData;
        formData.append('files',data);
        this.http.postRequest('uploadProfilePic',formData).subscribe((res:any)=>{
        if(res.statusCode==200){
        console.log(res);
        this.profileForm.patchValue({image:res?.data?.image});
        }})
      }

      get f(): any {
        return this.profileForm.controls;
      }
  
      onInputChange(event) {
        var locationName: any = '';
        locationName = this.profileForm.value.address1;
        if (locationName != this.formattedaddress1) {
          this.profileForm.patchValue({ address1: '' });
        }
      }

         //Location Dropdown
  public AddressChange(address: any) {
    this.profileForm.get('address1').patchValue(address.formatted_address);
    this.formattedaddress1=address.formatted_address;
    address.address_components.forEach((res) => {
      console.log(res);
      if (
        res.types.includes("locality") ||
        res.types.includes("postal_town") ||
        res.types.includes("sublocality") ||
        res.types.includes("sublocality_level_1") ||
        res.types.includes("sublocality_level_2") ||
        res.types.includes("sublocality_level_3") ||
        res.types.includes("sublocality_level_4") ||
        res.types.includes("sublocality_level_5")
      ) {
        this.profileForm.controls["city"].patchValue(res.long_name);
      }
      if (
        res.types.includes("administrative_area_level_1") ||
        res.types.includes("administrative_area_level_2") ||
        res.types.includes("administrative_area_level_3") ||
        res.types.includes("administrative_area_level_4") ||
        res.types.includes("administrative_area_level_5")
      ) {
        this.profileForm.controls["state"].patchValue(res.long_name);
      }
      if (res.types.includes("postal_code")) {
        this.profileForm.controls["pinCode"].patchValue(res.long_name);
      }
      if (res.types.includes("country")) {
        this.profileForm.controls["country"].patchValue(res.long_name);
        this.profileForm.controls["address2"].patchValue(res.long_name);
      }
    });
  }
  
  openCongrats(){
    this.submitted = true;
    if (this.profileForm.invalid) {
      console.log(this.profileForm);
      this.profileForm.markAllAsTouched();
      return
    }
    if(this.profileForm.value.documents?.length<4){
    return
    }
    let body=this.profileForm.value;
    body['dialCode']=this.profileForm.value.phoneNo?.dialCode;
    body['phoneNo']=this.profileForm.value.phoneNo?.e164Number.replace(this.profileForm?.value?.phoneNo?.dialCode,'');
    this.http.putRequest('updateProfile',body).subscribe((res:any)=>{
    if (res.statusCode == 200) {
    this.common.successMsg(res.message);
    this.http.isLoggedInOut.next(true);
    this.router.navigate(['/main/home']);
    }});
  }

}
