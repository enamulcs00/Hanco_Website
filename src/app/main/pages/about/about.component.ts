import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servies/api/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  cms:any;
  timer: number;
  type:any=''
  constructor(private http:ApiService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((e:any)=>{
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {
      this.type=this.route.snapshot.params.type;
      this.getCMS(this.type);
      }, 500);
      })
    this.type=this.route.snapshot.params.type;
    this.getCMS(this.type);
  }

  getCMS(type){
    var params=new HttpParams().set('page',type);
    this.http.getRequestWithParam('getCMS',params).subscribe((res:any)=>{
      this.cms=res?.data;
    })
    }

}
