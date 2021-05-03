import { Component, OnInit,ViewChild } from '@angular/core';
import * as moment from 'moment';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
 value
 values
  rowData: any;
  roles
  partenrid
  response
  city
  cityshow:boolean
  click:boolean = false
  loc:boolean = false
  glo:boolean 
  addadvert: FormGroup;
  loading = false;
  submitted = false;
  images
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['url', 'advertismentType','city','status','Action'];
  constructor(public Service: DashboardService, private route: ActivatedRoute,
    private _router: Router, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.rowData=[]
this.click=true
this.loc=false 
this.glo=false
this.cityshow=false
this.getcity()
this.addadvert = this.formBuilder.group({
  type: ['' , Validators.required],
  city: [''],
   });
}
//show global table 
global()
{
  this.glo=true
this.loc=false
this.click=false
this.tabledata("Global")
}
//show local table 
local()
{
  this.glo=false
this.loc=true
this.click=false
  this.tabledata("Local")
}
tabledata(data)
{
this.rowData=[]
  this.Service.advertisment(data).subscribe(res => {
      
    this.rowData = new MatTableDataSource();
    this.response = res.response;
    this.rowData.data = this.response;

    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;
})
}
 //filter for blog
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.rowData.filter = filterValue.trim().toLowerCase();
}
//status function
status(data, id) {

  if (data == true) { this.value = "Deactive", this.values = "false" }
  else { this.value = "Active", this.values = "true" }
  swal.fire({
    title: 'Are you sure?',
    text: "You want to " + this.value + " this Advertisement",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes' + this.value + 'it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.Service.statusadvertisemnt(id,this.values).subscribe((res => {
        swal.fire(
          'changed succesfully',

          'status'
        )
        this.ngOnInit()
      }), error => {
        swal.fire(
          'change not done',

          'success'
        )
      })
    }
    this.ngOnInit()
  })
}
 //getcity
 getcity() {
  this.Service.getcity().subscribe((res) => {
    this.city = res.response
  })
}
//function to check advertisement are global or local
Global(value)
{
  if(value=="Global")
  {
    this.cityshow=false
  }
  else
  {
    this.cityshow=true
  }


}

//fetch image
fileChangeEvent(event){
       
  if(event.target.files.length > 0){
    const file =event.target.files[0]
    this.images =file;
    }
} 

//add advertisement
get f() { return this.addadvert.controls; }
onSubmit() {
  this.submitted = true;
  if (this.addadvert.invalid) {
    return;
}
     console.log(this.f.city.value)
const formData = new FormData();
formData.append('advertismentType',this.f.type.value);
formData.append('image',this.images)
formData.append('cityId',this.f.city.value)

this.Service.addAdvertisment(formData).subscribe((res)=>{

swal.fire({
  icon: 'success',
  text: "Advertisment added Succesfully",
})
this.submitted=false
document.getElementById('id01').style.display='none'
this.ngOnInit()
},error=>{
swal.fire({
  icon: 'warning',
  text: "Advertisement not added",
})
document.getElementById('id01').style.display='none'
this.submitted=false
this.ngOnInit()
})
}
onResetss()
{
  document.getElementById('id01').style.display='none'
  this.submitted=false
  this.ngOnInit()
}

deleted(id)
{
this.Service.deleteaddvert(id).subscribe((res)=>{

  swal.fire({
    icon: 'success',
    text: "Advertisment deleted Succesfully",
  })

  
  this.ngOnInit()
  },error=>{
  swal.fire({
    icon: 'warning',
    text: "Advertisement not deleted",
  })
 

  this.ngOnInit()
  })
}
}
