import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import {ThemePalette} from '@angular/material/core';

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
 
  options: Options = {
    floor: 0,
    ceil: 250
  };
  
  minValue: number = 50;
  maxValue: number = 200;
  minYear: number = 2000;
  maxYear: number = 2022;
  slides = [
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/banner2.jpg"},
  ];

  slides1 = [
    {img: "assets/images/banner2.jpg"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/srev_img.jpg"},
    {img: "assets/images/srev_img.jpg"},
    

  ];

  slides2 = [
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
    {img: "assets/images/tesla.png"},
  ];
    slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    infinite: true, autoplay: true, arrows: false,loop: true
    }
    slideConfig1 = {
      'slidesToShow': 6,
      'slidesToScroll': 1,
      infinite: true, centerMode: true, autoplay: true, arrows: true,
      }
      slideConfig2 = {
        'slidesToShow': 3,
        'slidesToScroll': 1,
      infinite: true, centerMode: true, autoplay: true, arrows: true,
       
        }
  currentSlide: any=1;
  totalSlide:any
  constructor() { }

  ngOnInit(): void {
    this.totalSlide=this.slides.length
    
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

  afterChange(ev){
this.currentSlide=ev.currentSlide
this.currentSlide=this.currentSlide+1;
// console.log(this.currentSlide);
  }
}
