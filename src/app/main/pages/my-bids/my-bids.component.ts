import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api/api.service';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {
  type:any=['single','multiple'];
  single:any=[];
  multiple:any=[];
  bidSelected="";
  groupItem:any=[];
  constructor(private http:ApiService) { }

  ngOnInit(): void {
    this.bidType();
  }

  bidType(){
  this.bidSelected="offer";
  this.type.filter(x=>{
  var params=new HttpParams().set('bidType',x);
  this.http.getRequestWithParam('myBids',params).subscribe(res=>{
    this[x]=res.data
  })})
  }

  getGroupBid(){
  this.bidSelected="group";
    this.http.getRequest('getGroupBid',{}).subscribe(res=>{
      this.groupItem=res.data
    })
  }

}
