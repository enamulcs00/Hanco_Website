import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
    {img: "assets/images/banner1.jpg"},
  ];
    slideConfig = {
    'slidesToShow': 1,
    'slidesToScroll': 1,
    infinite: true, centerMode: true, variableWidth: true, autoplay: true, arrows: false,
    }
  currentSlide: any=1;
  totalSlide:any
  constructor() { }

  ngOnInit(): void {
    this.totalSlide=this.slides.length
    
  }

 

  afterChange(ev){
this.currentSlide=ev.currentSlide
this.currentSlide=this.currentSlide+1;
console.log(this.currentSlide);


  }
}
