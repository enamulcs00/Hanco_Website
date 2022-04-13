import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import {ThemePalette} from '@angular/material/core';
import { ApiService } from 'src/app/servies/api/api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  currentSlide: any=1;
  allComplete: boolean = false;
  priceFlag:any=''
  modalComplete: boolean=false;
  constructor(private http:ApiService,private router:Router) {
  }

  ngOnInit(): void {
    this.getBrand();
  }

  
  


  updateAllComplete(brandName) {
    this.modalComplete=false;
    this.brandItem.filter(x=>{
      if(x.brandName==brandName){
    this.allComplete = x.brandModel != null && x.brandModel.every(t => t.modalChecked);
    x.brandChecked=this.allComplete;
    x.brandModel.filter(t => t.modalChecked?this.modalComplete=true:'');
    }
    })
  }

  someComplete(brandName): boolean {
    var flag=false;
    this.brandItem.filter((res:any)=>{
    if (res.brandModel == null) {
      flag=false;
    }
    if(res.brandName==brandName){
      flag= res.brandModel.filter(t => t.modalChecked).length > 0 && !this.allComplete;
  }
  });
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

  reset() {
    this.allComplete = false;
    this.brandItem.filter(res=>{
    res.brandChecked = false
    res.brandModel.forEach(t => (t.modalChecked = false));
  })
  }

  getBrand(){
    this.http.getRequest('getBrand',{}).subscribe(res=>{
      this.getBanner();
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
      }
    })
  }

  getBanner(){
    this.http.getRequest('getBanner',{}).subscribe(res=>{
      if(res.statusCode==200){
      this.bannerItem=res.data
      console.log(this.bannerItem);
      }
    })
  }

  getVehicle(){
    var params=new HttpParams().set('search',this.searchText).set('status',"readyForSale");
    this.http.postRequestWithParam('getVehicle',params,{}).subscribe(res=>{
      if(res.statusCode==200){
        this.vechileItem=res.data;
        console.log(res);
      }})
  }



  searchFuc(e){
    this.searchText=e;
    this.getVehicle();
  }

  clearFilter(){
    this.priceFlag="";
    this.endKm=0;
    this.startKm=0;
    this.startPrice=0;
    this.endPrice=0;
    this.startYear=2000;
    this.endYear=2000;
    this.search="";
    this.reset();
  }

  carListing(){
    let body:any={
      endKm:this.endKm,
      startKm:this.startKm,
      startPrice:this.startPrice,
      endPrice:this.endPrice,
      startYear:this.startYear,
      endYear:this.endYear,
      brandItem:this.brandItem,
      search:this.search,
      allComplete:this.allComplete,
      modalComplete:this.modalComplete
    }
    var params=JSON.stringify(body);
    this.router.navigate(['/main/carlisting/',1])
    this.http.filterParams.next(params);
  }

  afterChange(ev){
this.currentSlide=ev.currentSlide
this.currentSlide=this.currentSlide+1;
// console.log(this.currentSlide);
  }
}
