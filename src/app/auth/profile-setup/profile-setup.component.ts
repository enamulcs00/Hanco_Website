import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ApiService } from 'src/app/servies/api/api.service';
import { environment } from 'src/environments/environment';
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
  customerFront:any='';
  customerBack:any='';
  vatFront:any='';
  crFront:any='';
  licenseFront:any='';
  licenseBack:any='';
  formattedaddress1:any;
  todayDate=moment(new Date()).format('YYYY-MM-DD')
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
        documents:[[],[Validators.required]],
        latitude: "30.7046",
        longitude: "76.7179",
        nationality:  ["", [Validators.required]],
    })
    }
  
  ngOnInit(): void {
    if (this.data?.email) {
      this.profileForm.patchValue({email:this.data.email});
      this.profileForm.controls['email'].disable();
    }
    else if(this.data?.phoneNo!='') {
        this.profileForm.patchValue({'phoneNo':{number:this.data.dialCode+' '+this.data.phoneNo}});
        this.profileForm.controls['phoneNo'].disable();
  }
  this.updateUser({target:{value:1}});
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
    body['documents']=this.profileForm.value.documents.map(res=>{res.image})
    body['dialCode']=this.profileForm.value.phoneNo?.dialCode;
    body['phoneNo']=this.profileForm.value.phoneNo?.e164Number.replace(this.profileForm?.value?.phoneNo?.dialCode,'');
    this.http.putRequest('updateProfile',body).subscribe((res:any)=>{
    if (res.statusCode == 200) {
    localStorage.removeItem(environment.storageKey);
    this.http.isLoggedInOut.next(true);
    this.dialog.closeAll();
    this.commonData.congrats();
    }});
  }
 
  updateUser(e){
  this.userTypeValue=e.target.value;
  var type=['customerFront','customerBack','vatFront','crFront','licenseFront','licenseBack']
  this.profileForm.patchValue({documents:[]});
  type.filter(res=>{this[res]=''});
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
   
    onFileChanged1(evt,type){
      var files = evt.target.files;
      var file = files[0];
      if (files && file) {
        this.upload1(file,type);
      }
    }
  
      //upload
      upload1(data:any,type){
        const formData=new FormData;
        formData.append('files',data);
        this.http.postRequest('uploadFile',formData).subscribe((res:any)=>{
        if(res.statusCode==200){
        console.log(res);
        this[type]=res?.data?.url;
        var docFlag=false;
        var doc=this.profileForm.value.documents;
        doc.filter(res=>{if(res.type==type){docFlag=true;return res['image']=res?.data?.url}});
        !(docFlag)?doc.push({type:type,image:res?.data?.url}):"";
        this.profileForm.patchValue({documents:doc});
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

}
