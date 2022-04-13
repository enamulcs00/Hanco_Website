import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.scss']
})
export class BiddingComponent implements OnInit {
  vechileId:any;
  vechileData:any;
  productImg: any;
  biddingForm:FormGroup;
  bidType: any;
  submitted=false;
  myBidsIds: any=[];
  constructor(private route:ActivatedRoute,
    private fb:FormBuilder,
    private common:CommonService,
    private router:Router,
    private http:ApiService) { 
      this.biddingForm=this.fb.group({
        offerPrice:['',[Validators.required]]
      })
    }

  ngOnInit(): void {
    this.vechileId=this.route.snapshot.params.id;
    this.bidType=this.route.snapshot.params.type;
    this.myBids(this.vechileId);
    this.getVehicleById(this.vechileId);
    this.addWatchList(this.vechileId);
  }
  
  getVehicleById(id){
    this.http.getRequestWithId('getVehicleById',id).subscribe(res=>{
      this.vechileData=res?.data;
      this.productImg=this.vechileData.vehicleImage[0];
    })
  }

  addWatchList(id){
    let body={
      "vehicleId": id
     }
    this.http.postRequest('addToFavourite',body).subscribe(res=>{
      if(res.statusCode==200){
      // this.common.successMsg(res.message);
      }
    })
  }

  myBids(id){
    var params=new HttpParams().set('bidType','single');
    this.http.getRequestWithParam('myBids',params).subscribe(res=>{
    res.data.filter(res=>this.myBidsIds.push(res.vehicleId[0]._id));
      if(this.myBidsIds.includes(id)){
          this.router.navigate(['/main/biddingupdate/single/',id]);
      }
      
    })
    }

  addBid(){
    this.submitted=true;
    if(this.biddingForm.invalid || this.biddingForm.value.offerPrice<this.vechileData?.price){
      this.biddingForm.markAllAsTouched();
      console.log("invalid");
      return
    }
    let body={
      "vehicleId": [this.vechileId.toString()],
      "bidType":this.bidType,
      "offerPrice":this.biddingForm.value.offerPrice.toString()
     }
    this.http.postRequest('addBid',body).subscribe(res=>{
      if(res.statusCode==200){
      this.common.successMsg(res.message);
      this.router.navigate(['/main/mybids']);
      }
    })
  }

}
