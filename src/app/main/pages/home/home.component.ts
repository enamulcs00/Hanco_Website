import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
    infinite: true, centerMode: true, variableWidth: true, autoplay: true, arrows: false,
    }
    slideConfig1 = {
      'slidesToShow': 6,
      'slidesToScroll': 1,
      infinite: true, centerMode: true, autoplay: true, arrows: true,
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
// console.log(this.currentSlide);


  }
}
