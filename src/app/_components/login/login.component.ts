import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DashboardService} from '../../_services/dashboard.service'
import swal from 'sweetalert2' 
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: any = {};
  loading = false;
  responseDetails: any ={};
  userdetail:any
  partnerid
  submitted=false
  constructor(private router: Router,public Service : DashboardService) { }

  ngOnInit() {
  }
  get f() { return this.loginform.controls; }

  login(loginform) {
            this.Service.login(loginform.email,loginform.password).subscribe(res=>{
               
              
                 if(res.response.role=="Admin" ||res.response.user.role=="Super Admin" )
                      {
                        
                        this.loading=true
                        localStorage.setItem('role',JSON.stringify(res.response))
                        localStorage.setItem('user',JSON.stringify(res.response.user))
                        
                        this.router.navigateByUrl('dashboard')
                      }
                 else
                      {

                     
                        if(res.response.role=="Partner")
                        {
                          this.loading=true
                          this.partnerid=res.response.user.id
                        localStorage.setItem('role',JSON.stringify(res.response))
                        localStorage.setItem('user',JSON.stringify(res.response.user))
                        this.router.navigateByUrl('partner-detail/'+this.partnerid)
                        }
                        else{
                          this.loading=false
                           this.loginform= {}
                           swal.fire({
                            icon: 'warning',
                            text: "only admin , super admin and partners  can login on this",
                          })
                          this.submitted=false
                           this.ngOnInit()
                        }
                       
                      }  


            },error=>{
              this.loading = false;
              this.submitted=false
              this.loginform= {}
              this.ngOnInit()
              swal.fire({
                icon: 'warning',
                text: "username or password incorrect",
              })
              
            })


     
        
        
               
}
}
