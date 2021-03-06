import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss']
})
export class BuyNowComponent implements OnInit {
  vehicleId:any;
  constructor(private http:ApiService,
    private route:ActivatedRoute,
    private common:CommonService) { }

  ngOnInit(): void {
    this.vehicleId=this.route.snapshot.params.id;
    this.addWatchList(this.vehicleId);
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
