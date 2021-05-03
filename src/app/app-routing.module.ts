import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './_components/admin/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { PartnersComponent } from './_components/admin/partners/partners.component';
import{AdminGuard} from './security/admin.guard';
import { AdmindetailComponent } from './_components/superadmin/admindetail/admindetail.component';
import { AddadminComponent } from './_components/superadmin/addadmin/addadmin.component';
import{SuperadminGuard} from'./security/superadmin.guard'
import { UsersComponent } from './_components/admin/users/users.component';
import { GymfacilityComponent } from './_components/admin/partners/gymfacility/gymfacility.component';
import { PartnerdetailComponent } from './_components/admin/partners/partnerdetail/partnerdetail.component'
import { LandingComponent } from './_components/landing/landing.component';
import { BlogsComponent } from './_components/blogs/blogs.component';
import { BlogDetailComponent } from './_components/blog-detail/blog-detail.component';
import { BlogcontrolComponent } from './_components/admin/blogcontrol/blogcontrol.component';
import { EventsComponent } from './_components/admin/events/events.component';
import {PartnersGuard} from './security/partners.guard';
import { IssuesComponent } from './_components/admin/issues/issues.component';
import { TestimonialComponent } from './_components/admin/dynamicpages/testimonial/testimonial.component';
import { TransactionpartnerComponent } from './_components/admin/partners/transactionpartner/transactionpartner.component';
import { AdvertisementComponent } from './_components/admin/advertisement/advertisement.component';
import { FaciltyeventsComponent } from './_components/admin/partners/faciltyevents/faciltyevents.component';
import { CityComponent } from './_components/admin/city/city.component';
import { TransactionfaciltyComponent } from './_components/admin/partners/transactionfacilty/transactionfacilty.component'
import { PartnerloginComponent } from './_components/partnerlogin/partnerlogin.component'
import { PartnerpageComponent } from './_components/partnerpage/partnerpage.component'
import { Blog1Component } from './_components/blog1/blog1.component';
import { Blog2Component } from './_components/blog2/blog2.component'
import { PartnerRegisterComponent } from './_components/partner-register/partner-register.component';
import { AddBlogComponent } from './_components/admin/blogcontrol/add-blog/add-blog.component';
import { TestingComponent } from './testing/testing.component';
import { Testing2Component } from './testing2/testing2.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './paymentfailed/paymentfailed.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { ContactusComponent } from './_components/contactus/contactus.component';
import { ContactDetailComponent } from './_components/admin/contact-detail/contact-detail.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'policy',component:PolicyComponent},
  {path:'login',component:LoginComponent},
 {path:'partnerlogin',component:PartnerloginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminGuard] },
  {path:'partners',component:PartnersComponent, canActivate:[AdminGuard]  },
  {path:'admins',component:AdmindetailComponent,canActivate:[SuperadminGuard]},
  {path:'addadmin',component:AddadminComponent,canActivate:[SuperadminGuard]},
  {path:'partner-detail/:id',component:PartnerdetailComponent,canActivate:[PartnersGuard]},
  {path:'gym-facility/:id/:partnerid',component:GymfacilityComponent,canActivate:[PartnersGuard]},
  {path:'users',component:UsersComponent,canActivate:[AdminGuard]},
  {path:'blogs',component:BlogsComponent},
  {path:'detail-blog/:id',component:BlogDetailComponent},
  {path:'manage-blog',component:BlogcontrolComponent},
  {path:'events',component:EventsComponent,canActivate:[AdminGuard]},
  {path:'issues',component:IssuesComponent,canActivate:[AdminGuard]},
  {path:'testimonial',component:TestimonialComponent,canActivate:[AdminGuard]},
  {path:'transaction/:id',component:TransactionpartnerComponent,canActivate:[PartnersGuard]},
  {path:'advertisment',component:AdvertisementComponent,canActivate:[AdminGuard]},
  {path:'facilty-events/:id/:partnerid',component:FaciltyeventsComponent,canActivate:[PartnersGuard]},
  {path:'city',component:CityComponent,canActivate:[AdminGuard]},
  {path:'transactions/:id/:partnerid',component:TransactionfaciltyComponent,canActivate:[PartnersGuard]},
{path:'Partner',component:PartnerpageComponent},
{path:'blog1',component:Blog1Component},
{path:'blog2',component:Blog2Component},
{path:'partner-register',component:PartnerRegisterComponent},
{path:'add-blog',component:AddBlogComponent,canActivate:[AdminGuard]},
{path:'payment/:userid/:auth',component:TestingComponent},
{path:'testing1',component:Testing2Component},
{path:'payment-success',component:PaymentsuccessComponent},
{path:'payment-failed',component:PaymentfailedComponent},
{path:'payment_card/:userid/:auth/:cards',component:PaymentCardComponent},
{path:'contact_us',component:ContactusComponent},
{path:'contact_user',component:ContactDetailComponent},
{path:'terms_and_condition',component:TermsandconditionComponent},
  {path:'**',component:LandingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
