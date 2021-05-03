import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../_services/dashboard.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userdetail
  userdetailss
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  id
  roles
  city
  show
  partnereditForm: FormGroup;
  profiledetail: any = []
  partnerdetails: any = []
  constructor(private router: Router, public Service: DashboardService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.partnerdetails = []
    this.userdetailss = null
    this.userdetail=[]
    var userdetails = localStorage.getItem('user')
    this.userdetailss = JSON.parse(userdetails);

    var roles = localStorage.getItem('role')
    this.roles = JSON.parse(roles);
    // console.log(this.userdetailss.id)

    this.id = this.userdetailss.id


    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],

    });

    this.getcity()

    if (this.roles.role == "Admin") {
      this.Service.getadminbyid(this.id).subscribe((res)=>{
        this.userdetail=res.response
      })
      
    }
    if (this.roles.user.role == "Super Admin") {
      this.Service.getsuperadminbyid(this.id).subscribe((res)=>{
        this.userdetail=res.response
      })
      this.userdetail=[]
    }
    if (this.roles.role == "Partner") {
      this.Service.getpartnerbyid(this.id).subscribe(res => {
        this.partnerdetails = res.response

      })
    }



  }


  //logout
  logout() {
    localStorage.clear()
    this.router.navigate(['']);
  }
  //close vie edit admin  form
  onReset() {
    document.getElementById('uid01').style.display = 'none'
    document.getElementById('uid02').style.display = 'none'
    document.getElementById('uid04').style.display= 'none'
    this.ngOnInit()
  }

  //close partner view form
  onResets() {
    document.getElementById('uid03').style.display = 'none'

    this.ngOnInit()
  }



  //view blog open page 
  edits() {
    console.log(this.roles.role)
    if (this.roles.role == "Partner") {
      document.getElementById('uid03').style.display = 'block'
    }
    if (this.roles.role == "Admin") {
      document.getElementById('uid02').style.display = 'block'
    }
    if (this.roles.role == "Super Admin") {
      document.getElementById('uid04').style.display = 'block'
    }

  }




  //getcity
  getcity() {
    this.Service.getcity().subscribe((res) => {
      this.city = res.response
    })
  }

  edit()
  {
   
    if (this.roles.role == "Admin") {
      document.getElementById('uid01').style.display = 'block'
      document.getElementById('uid02').style.display = 'none'
    }
    
  }

  get f() { return this.registerForm.controls; }  
  //edit form
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  let userdata={
   "id":this.id, "name":this.registerForm.value.name,"contactNumber":this.registerForm.value.contactNumber,"address":this.registerForm.value.address,"userName":this.registerForm.value.userName,"email":this.registerForm.value.email,
  }
  this.Service.editadmin(userdata).subscribe(res=>{
    swal.fire({
      icon: 'success',
      text: "admin  edit succefully",
    })
    
    document.getElementById('uid01').style.display='none'
    this.submitted=false
    this.ngOnInit()
  },error=>{
    swal.fire({
      icon: 'warning',
      text: "edit failed",
    })
    this.submitted=false
    this.ngOnInit()
    document.getElementById('uid01').style.display='none'
  })
 
}
}
