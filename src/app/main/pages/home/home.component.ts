import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import {ThemePalette} from '@angular/material/core';
import { ApiService } from 'src/app/servies/api/api.service';
import { HttpParams } from '@angular/common/http';

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
  options: Options = {
    floor: 0,
    ceil: 250
  };
  searchText:any='';
  bannerItem:any=[];
  minValue: number = 50;
  maxValue: number = 200;
  minYear: number = 2000;
  maxYear: number = 2022;
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
  constructor(private http:ApiService) { }

  ngOnInit(): void {
    this.getBrand();
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;
  price:any=''
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  getBrand(){
    this.http.getRequest('getBrand',{}).subscribe(res=>{
      console.log(res);
      this.getBanner();
      if(res.statusCode==200){
      this.brandItem=res.data.filter(((x:any)=>x.brandName!=""));
      this.getVehicle();
      }
    })
  }

  getBanner(){
    this.http.getRequest('getBanner',{}).subscribe(res=>{
      console.log(res);
      if(res.statusCode==200){
      this.bannerItem=res.data;
      }
    })
  }

  getVehicle(){
    var params=new HttpParams().set('search',this.searchText)
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

  afterChange(ev){
this.currentSlide=ev.currentSlide
this.currentSlide=this.currentSlide+1;
// console.log(this.currentSlide);
  }
}
