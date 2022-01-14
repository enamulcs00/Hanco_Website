import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/common-data/common-dialog.service';
import { ApiService } from 'src/app/servies/api/api.service';
import { CommonService } from 'src/app/servies/common/common.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs: any;
  currentPage: any =  1;
  totalItems:any;
  serialNumber: number = 0;
  search : any = '';
  limit: any = 12;

  constructor(
    private api : ApiService,
    private common : CommonService,
    private commonDialog : CommonDialogService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(){
    this.api.getRequest(`getblogs?page=${this.currentPage}&size=${this.limit}&name=${this.search}`,'').subscribe((res : any)=>{
      if(res.statusCode == 200){
        this.blogs = res.data;
        this.totalItems = res?.total;
      }else{
        this.common.errorMsg(res.message);
      }
    }, (error: any) => {
      console.log(error);        
    })
  }

  onPageChange(pages) {
    this.currentPage = pages.page;
    this.getBlogs();
  }

  addBookmark(val,isSaved){
    if(localStorage.getItem('token')){
      this.api.postRequest("savedlist",{socialId : val , isSaved : !isSaved}).subscribe((res : any)=>{
        if(res.statusCode == 200){
          this.getBlogs();
        }else{
          this.common.errorMsg(res.message);
        }
      })
    }else{
      this.commonDialog.showModal().subscribe((res : any)=>{
        this.getBlogs();
      })
    }
  }

  openDetails(data){
    this.route.navigate(['/main/details'], { queryParams: { type: 2 }});
  }

}
