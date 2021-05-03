import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnersGuard implements CanActivate {
  roles
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  


    var roles=localStorage.getItem('role')
    this.roles=JSON.parse(roles);
    if( this.roles==null ||  this.roles==undefined)
   {
    this.router.navigate([''])
     return false
   }
   else
        {
          if (this.roles.role=="Admin" || this.roles.user.role=="Super Admin" || this.roles.role=="Partner" ) { // determine if the uder is logged in from this method.
          return true;
        }
          else
        {
        this.router.navigate(['']);
        return false;
        }
   }
  }
  
  
}
