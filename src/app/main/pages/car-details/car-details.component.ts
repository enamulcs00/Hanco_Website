import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  vechileId:any;
  vechileData:any;
  slideConfig1 = { "slidesToShow": 3, "slidesToScroll": 3, arrows: true };
  productImg: any;
  constructor(private route:ActivatedRoute,
    private http:ApiService) { 
  
  }

  ngOnInit(): void {
    this.vechileId=this.route.snapshot.params.id;
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

}
