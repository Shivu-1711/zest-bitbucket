import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  rowData:any;
  color: ThemePalette = 'primary';
  value
  admindata
  
  editdata:any=[]
  passwordform: FormGroup;
  userid
  loadings = false;
  
  cities
 
  disabled = false;
  displayedColumns: string[] = ['firstname','contactNumber','email','subject','Action'];
  values
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  constructor(public Service : DashboardService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
  

    //call table function
    this.userdetail();
  }
  get f() { return this.registerForm.controls; }  
  //edit form
 
  
  //status function
 
     
  
  //api for table
  userdetail(){
   
    this.Service.detailofuser().subscribe((res) => {
      
           this.rowData = new MatTableDataSource();
        this.rowData.data= res.response;
        this.rowData.paginator = this.paginator;
        this.rowData.sort = this.sort;
        },error=>{
          
          swal.fire({
            icon: 'warning',
            text: "No internet connection plz connect to internet",
          })
        })
  }
  //search filter for table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();
  }




}
