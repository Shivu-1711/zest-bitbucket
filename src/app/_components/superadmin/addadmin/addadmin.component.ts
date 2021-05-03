import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2' 
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router'
import {DashboardService} from '../../../_services/dashboard.service';
import { parse } from 'querystring';
@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  output
 sub 
 cities
  constructor(private formBuilder: FormBuilder,
    private router: Router,private route: ActivatedRoute,public Service : DashboardService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
     
      name: ['' , Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
     
  });
  
  }
  get f() { return this.registerForm.controls; }


  //for submit form
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
let userdata={
  "name":this.registerForm.value.name,
  "contactNumber":this.registerForm.value.contactNumber,
  "address":this.registerForm.value.address,
  "userName":this.registerForm.value.userName,
  "email":this.registerForm.value.email,
  "password":this.registerForm.value.password
}
//api for add data
this.Service.addadmin(userdata).subscribe(res=>{
  swal.fire({
    icon: 'success',
    text: "admin  added succesfully",
  })
  this.router.navigateByUrl('admins')
},error=>{
  swal.fire({
    icon: 'warning',
    text: "Admin not added , Plz Check the Username and Number should be unique",
  })
  this.router.navigateByUrl('admins')
})
  }

  //for reset form
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}


}
