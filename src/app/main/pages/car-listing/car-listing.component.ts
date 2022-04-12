import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import {ThemePalette} from '@angular/material/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/servies/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.scss']
})

export class CarListingComponent implements OnInit {
  brandItem:any=[];
  vechileItem:any=[];
  options_year: Options = {
    floor: 2000,
    ceil: 2022
  };
  options_price: Options = {
    floor: 0,
    ceil: 1500000
  };
  options_km: Options = {
    floor: 0,
    ceil: 200000
  };
  searchText:any='';
  bannerItem:any=[];
  startPrice:number=0;
  endPrice:number=0;
  startKm: number = 0;
  endKm: number = 0;
  startYear: number = 2000;
  endYear: number = 2000;
  search:any="";
    slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
     arrows: false,loop: true
    }
    slideConfig1 = {
      'slidesToShow': 5,
      'slidesToScroll': 1,
      infinite: true, arrows: true,
      }
      slideConfig2 = {
        'slidesToShow': 3,
        'slidesToScroll': 1,
      infinite: true, arrows: true,
       
        }
  filterParams:any;
  allComplete: boolean = false;
  priceFlag:any=''
  modal: any=[];
  modalComplete: boolean=false;
  constructor(private http:ApiService,
    private cd:ChangeDetectorRef,
    private router:ActivatedRoute) { 
      // this.filterParams=JSON.parse(this.router.snapshot.params.data);
    }

  ngOnInit(): void {
    this.http.filterParams.subscribe((res:any)=>{
      this.filterParams=res?JSON.parse(res):"";
      console.log(this.filterParams);
      this.getBrand();
    })
    this.cd.detectChanges();
  }

  patchFilter(){
    this.filterParams;
    this.endKm=this.filterParams.endKm;
    this.startKm=this.filterParams.startKm;
    this.startPrice=this.filterParams.startPrice;
    this.endPrice=this.filterParams.endPrice;
    this.startYear=this.filterParams.startYear;
    this.endYear=this.filterParams.endYear;
    this.search=this.filterParams.search;
    this.brandItem=this.filterParams.brandItem;
    this.allComplete=this.filterParams.allComplete;
    // this.brandItem.filter(res=>{this.someComplete(res.brandName)});
    console.log("brand",this.brandItem);
    // this.cd.detectChanges();
    this.getVehicle();
  }

  updateAllComplete(brandName) {
    this.modalComplete=false;
    this.brandItem.filter(x=>{
      if(x.brandName==brandName){
    this.allComplete = x.brandModel != null && x.brandModel.every(t => t.modalChecked);
    x.brandChecked=this.allComplete;
    x.brandModel.filter(t => t.modalChecked?this.modalComplete=true:'');
    this.cd.detectChanges();
    }
    })
  }

  someComplete(brandName): boolean {
    var flag=false;
    this.brandItem.filter(x=>{
    if (x.brandModel == null) {
      flag= false;
    }
    if(x.brandName==brandName){
    flag= x.brandModel.filter(t => t.modalChecked).length > 0 && !this.allComplete ;
    }})
    return flag
  }

  setAll(completed: boolean,brandName) {
    this.allComplete = completed;
    console.log(completed,brandName);
    this.brandItem.filter(res=>{
    if (res.brandModel == null) {
      return;
    }
    else if(res.brandName==brandName){
    res.brandChecked = completed
    res.brandModel.forEach(t => (t.modalChecked = completed));
    }
  })
  }

  getBrand(){
    this.http.getRequest('getBrand',{}).subscribe(res=>{
      if(res.statusCode==200){
        this.brandItem=res.data
        this.brandItem.map((val:any) =>{
          val["brandChecked"] = false;
          val.brandModel.map((ele:any)=>{
            ele['modalChecked'] = false;
          })
        });
        console.log(this.brandItem);
        this.getVehicle();
        if(this.filterParams){
        this.patchFilter();
        }
      }
    })
  }
  
  reset() {
    this.allComplete = false;
    this.modalComplete=false;
    this.brandItem.filter(res=>{
    res.brandChecked = false
    res.brandModel.forEach(t => (t.modalChecked = false));
    this.modal=[];
  })
  }

  clearFilter(e){
    switch(e){
    case 1:
    this.startPrice=0;
    this.endPrice=0;
    break;
    case 2:
    this.reset();
    break;
    case 3:
    this.startYear=2000;
    this.endYear=2000;
    break;
    case 4:
    this.endKm=0;
    this.startKm=0;
    break;
    }
    // this.search="";
    this.getVehicle();
  }

  getVehicle(){
    this.priceFlag=0;
    this.brandItem.filter(x=>{x.brandModel.filter(y=>{y.modalChecked?this.modal.push(y._id):""})});
    let body={};
    if(this.modal.length){
      body["modelId"]=this.modal
    }
    var params=new HttpParams().set('search',this.search);
    var startkey=['startKm','startPrice','startYear'];
    var endkey=['endKm','endPrice','endYear'];
    endkey.filter(res=>{this[res] && this[res]!=2000 ?params=params.set(res,this[res].toString()):''});
    startkey.filter(res=>{params=params.set(res,this[res].toString())});
    this.http.postRequestWithParam('getVehicle',params,body).subscribe(res=>{
      if(res.statusCode==200){
        this.vechileItem=res.data;
        console.log(res);
      }})
  }

}
