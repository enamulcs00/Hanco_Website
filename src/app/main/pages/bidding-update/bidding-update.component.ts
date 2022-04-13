import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-bidding-update',
  templateUrl: './bidding-update.component.html',
  styleUrls: ['./bidding-update.component.scss']
})
export class BiddingUpdateComponent implements OnInit {

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
    this.getVehicleById(this.vechileId);
    this.myBids(this.vechileId);
  }

  getVehicleById(id){
    this.http.getRequestWithId('getVehicleById',id).subscribe(res=>{
      this.vechileData=res?.data;
      this.productImg=this.vechileData.vehicleImage[0];
    })
  }

  addBid(){
    this.submitted=true;
    if(this.biddingForm.invalid){
      this.biddingForm.markAllAsTouched();
      console.log("invalid");
      return
    }
    let body={
      // "vehicleId": [this.vechileId.toString()],
      // "bidType":this.bidType,
      "offerPrice":(Number(this.myBidsIds[0].offerPrice)+ Number(this.biddingForm.value.offerPrice)).toString()
     }

    this.http.putRequestWithId('updateBidPrice',this.myBidsIds[0]._id,body).subscribe(res=>{
      if(res.statusCode==200){
      this.common.successMsg(res.message);
      this.router.navigate(['/main/mybids']);
      }
    })
  }

  cancelBid(){
    this.submitted=true;
    // if(this.biddingForm.invalid){
    //   this.biddingForm.markAllAsTouched();
    //   console.log("invalid");
    //   return
    // }
    let body={
      // "vehicleId": [this.vechileId.toString()],
      // "bidType":this.bidType,
      // "offerPrice":(Number(this.myBidsIds[0].offerPrice)+ Number(this.biddingForm.value.offerPrice)).toString()
     }

    this.http.putRequestWithId('cancelBid',this.myBidsIds[0]._id,body).subscribe(res=>{
      if(res.statusCode==200){
      this.common.successMsg(res.message);
      this.router.navigate(['/main/mybids']);
      }
    })
  }

  myBids(id){
    var params=new HttpParams().set('bidType','single');
    this.http.getRequestWithParam('myBids',params).subscribe(res=>{
      this.myBidsIds=res.data.filter(res=>res.vehicleId[0]._id==id);
      console.log(this.myBidsIds);
      
    })
    }

}
