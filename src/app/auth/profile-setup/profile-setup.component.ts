import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiService } from 'src/app/servies/api/api.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  userTypeValue:any="1";
  profileForm:FormGroup;
  separateDialCode = false;
  submitted = false;
  formattedaddress1:any;
  formattedaddress2:any;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  constructor(private dialog: MatDialog,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http:ApiService,
    private commonData:ModalService) { 
      this.profileForm=this.fb.group({
        image: [''],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        phoneNo: ['', [Validators.required]],
        userType: ['', [Validators.required]],
        pinCode: ['', [Validators.required]],
        state: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        crNumber: ['', [Validators.required]],
        address1: ['', [Validators.required]],
        address2: ['', [Validators.required]],
        vatRegistrationNo: ['', [Validators.required]],
        customerId: ['', [Validators.required]],
        customerIdExpDate: ['', [Validators.required]],
        license: ['', [Validators.required]],
        licenseExpDate: ['', [Validators.required]],
        latitude: "30.7046",
        longitude: "76.7179",
        nationality:  ['', [Validators.required]],
    })
    }
  
  ngOnInit(): void {
    console.log('profile');
  }

  openCongrats(){
    this.dialog.closeAll();
    this.commonData.congrats();
  }
 
  updateUser(e){
  this.userTypeValue=e.target.value;
  if(e.target.value==1){
  this.profileForm.patchValue({userType:'INDIVIDUAL'})
  }
  else if(e.target.value==2){
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

    onInputChange1(event) {
      var locationName: any = '';
      locationName = this.profileForm.value.address2;
      if (locationName != this.formattedaddress2) {
        this.profileForm.patchValue({ address2: '' });
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
      }
    });
  }

     //Location Dropdown
     public AddressChange1(address: any) {
      this.profileForm.get('address2').patchValue(address.formatted_address);
      this.formattedaddress2=address.formatted_address;
    }

}
