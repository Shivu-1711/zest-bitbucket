import { Component, OnInit } from '@angular/core';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HomepageService } from '../../_services/homepage.service';
declare var $:any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
	allblogs:any=[]
	name
	data
	allcount:any=[]
  constructor(public Service : HomepageService) { }

  ngOnInit() {
	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
	        600:{
	            items:2,
	            nav:false
	        },
	        1000:{
	            items:2,
	            nav:true,
	            loop:false
	        }
	    }
	})
  this.Service.getalltestimonials().subscribe((res)=>{
	  
	this.allblogs=res.response
	this.name=this.allblogs[0].name
	//   console.log(this.name)
	 })
  

	 this.Service.getallcount().subscribe((res)=>{
		 this.allcount=res.response
	 })
}

}
