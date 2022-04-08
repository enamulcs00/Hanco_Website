import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchList:any;
  constructor(private http:ApiService,private common:CommonService) { }

  ngOnInit(): void {
    this.getWatchList();
  }
  
  getWatchList(){
    this.http.getRequest('myFavouriteList',{}).subscribe(res=>{
      this.watchList=res.data;
    })
  }

  removeWatchList(id){
    let body={
      "vehicleId": id
     }
    this.http.postRequest('removeFromFavourite',body).subscribe(res=>{
      if(res.statusCode==200){
      // this.common.successMsg(res.message);
      this.getWatchList()
      }
    })
  }

}
