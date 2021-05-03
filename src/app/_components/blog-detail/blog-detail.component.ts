import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd  } from '@angular/router';
import { HomepageService } from '../../_services/homepage.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blogid
  blogdetail:any=[]
  recentblog:any=[]
  slider:any
  mySubscription:any;
 
  constructor(private route: ActivatedRoute,
    private _router:Router,public Service : HomepageService,
    ) { 
      this._router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this._router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this._router.navigated = false;
        }
      });
    }

  ngOnInit() {
    this.recentblog=[]
    this.blogid = this.route.snapshot.paramMap.get('id');
  this.getblogbyids()
this.allblog()
  }
getblogbyids()
{
this.Service.getblogbyblogid(this.blogid).subscribe((res)=>{
  
  this.blogdetail=res.response
  console.log(res.response)
  
    this.slider=this.blogdetail.image[0].url
  
  console.log(this.slider)
})
}
  //get all blog
allblog()
{
  this.Service.getallblogs().subscribe(res=>{
for(let i=res.response.length-1;i>=res.response.length-3;i--)
{
  this.recentblog.push(res.response[i])
}

  })
}
reload(data)
{
  this._router.navigateByUrl('detail-blog/'+data)

  
  }
ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}

config: AngularEditorConfig = {
   
  enableToolbar: false,
  showToolbar: false,

};
}
  

