import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactform: FormGroup;
  loading = false;
  submitted = false;
  constructor(public Service: DashboardService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.contactform = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      officialEmail: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
     
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      subject: ['', Validators.required],
    
     
      message: ['', Validators.required],
    
    
    });
  }
  get f() { return this.contactform.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.contactform.invalid) {
      return;
    }

    let share=
    
      {
        "firstName": this.contactform.value.firstname,
        "lastName": this.contactform.value.lastname,
        "subject": this.contactform.value.subject,
        "body": this.contactform.value.message,
        "email": this.contactform.value.officialEmail,
        "contactNo":this.contactform.value.contactNo
        }
    
  this.Service.sendcontact(share).subscribe((res)=>{
    swal.fire({
      icon: 'success',
      text: "zest will contact you as soon as possible",
    })
    this.submitted=false
    this.contactform.reset()
  },error=>{
    swal.fire({
      icon: 'warning',
      text: "something went wrong",
    })
  })
  console.log(this.contactform.value)
  }


}
