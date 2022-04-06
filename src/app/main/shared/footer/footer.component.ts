import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servies/api/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cms:any;
  constructor(private http:ApiService) { }

  ngOnInit(): void {
    this.getCMS();
  }

  getCMS(){
    var params=new HttpParams().set('page','aboutUs');
    this.http.getRequestWithParam('getCMS',params).subscribe((res:any)=>{
      this.cms=res?.data;
    })
    }

}
