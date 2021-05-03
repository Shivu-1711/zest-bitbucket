import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  userdetail
  roles
  superadmin: boolean = false
  admin: boolean = false
  constructor(private router: Router) { }

  ngOnInit() {
    var userdetails=localStorage.getItem('user')
    this.userdetail=JSON.parse(userdetails);
    var roles=localStorage.getItem('role')
    this.roles=JSON.parse(roles);
  if(this.roles.user.role=="Super Admin")
  {
this.superadmin=true
  }
  if(this.roles.role=="Admin" || this.roles.user.role=="Super Admin")
  {
this.admin=true
  }

  }

}
