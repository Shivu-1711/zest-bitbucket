import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_layout/header/header.component';
import { SidenavComponent } from './_layout/sidenav/sidenav.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { DashboardComponent } from './_components/admin/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { PartnersComponent } from './_components/admin/partners/partners.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {  MatPaginatorModule, MatProgressSpinnerModule,MatSortModule } from "@angular/material";
import{AdminGuard} from './security/admin.guard'
import { MatInputModule } from '@angular/material/input';
import { AdmindetailComponent } from './_components/superadmin/admindetail/admindetail.component';
import { AddadminComponent } from './_components/superadmin/addadmin/addadmin.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import{SuperadminGuard} from'./security/superadmin.guard';
import { UsersComponent } from './_components/admin/users/users.component';
import { GymfacilityComponent } from './_components/admin/partners/gymfacility/gymfacility.component';
import { PartnerdetailComponent } from './_components/admin/partners/partnerdetail/partnerdetail.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { LandingComponent } from './_components/landing/landing.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { BlogsComponent } from './_components/blogs/blogs.component';
import { BlogDetailComponent } from './_components/blog-detail/blog-detail.component';
import { HomeheaderComponent } from './_layout/homeheader/homeheader.component';
import { HomefooterComponent } from './_layout/homefooter/homefooter.component';
import { BlogcontrolComponent } from './_components/admin/blogcontrol/blogcontrol.component';
import { EventsComponent } from './_components/admin/events/events.component';
import {PartnersGuard} from './security/partners.guard'
import { AgmCoreModule } from '@agm/core';
import {NgxPrintModule} from 'ngx-print';
import { IssuesComponent } from './_components/admin/issues/issues.component';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TestimonialComponent } from './_components/admin/dynamicpages/testimonial/testimonial.component';
import { TransactionpartnerComponent } from './_components/admin/partners/transactionpartner/transactionpartner.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AdvertisementComponent } from './_components/admin/advertisement/advertisement.component';
import {MatSelectModule} from '@angular/material/select';
import { FaciltyeventsComponent } from './_components/admin/partners/faciltyevents/faciltyevents.component';
import { CityComponent } from './_components/admin/city/city.component';
import { DatePipe } from '@angular/common';
import { TransactionfaciltyComponent } from './_components/admin/partners/transactionfacilty/transactionfacilty.component';
import { PartnerloginComponent } from './_components/partnerlogin/partnerlogin.component';
import { PartnerpageComponent } from './_components/partnerpage/partnerpage.component';
import { Blog1Component } from './_components/blog1/blog1.component';
import { Blog2Component } from './_components/blog2/blog2.component'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PartnerRegisterComponent } from './_components/partner-register/partner-register.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { AddBlogComponent } from './_components/admin/blogcontrol/add-blog/add-blog.component';
import { SliderModule } from 'angular-image-slider';
import { TestingComponent } from './testing/testing.component';
import { Testing2Component } from './testing2/testing2.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './paymentfailed/paymentfailed.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { ContactusComponent } from './_components/contactus/contactus.component';
import { ContactDetailComponent } from './_components/admin/contact-detail/contact-detail.component';
import { PolicyComponent } from './policy/policy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    PartnersComponent,
    AdmindetailComponent,
    AddadminComponent,
    UsersComponent,
    GymfacilityComponent,
    PartnerdetailComponent,
    LandingComponent,
    BlogsComponent,
    BlogDetailComponent,
    HomeheaderComponent,
    HomefooterComponent,
    BlogcontrolComponent,
    EventsComponent,
    IssuesComponent,
    TestimonialComponent,
    TransactionpartnerComponent,
    AdvertisementComponent,
    FaciltyeventsComponent,
    CityComponent,
    TransactionfaciltyComponent,
    PartnerloginComponent,
    PartnerpageComponent,
    Blog1Component,
    Blog2Component,
    PartnerRegisterComponent,
    AddBlogComponent,
    TestingComponent,
    Testing2Component,
    PaymentsuccessComponent,
    PaymentfailedComponent,
    PaymentCardComponent,
    ContactusComponent,
    ContactDetailComponent,
    PolicyComponent,
    TermsandconditionComponent
	
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatCarouselModule,
    AngularEditorModule,
    SliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjZ6ZvtdimyZMY0drJjSroQj8k7bC7aXo',
      libraries: ['places']
    }),
     BrowserModule, FormsModule, NgImageSliderModule,
    NgxPrintModule,
    MatTabsModule,
    RouterModule,
    DateRangePickerModule,
    MatSelectModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: AdminGuard, useClass: AdminGuard },{provide: SuperadminGuard, useClass: SuperadminGuard },{provide: PartnersGuard, useClass: PartnersGuard },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
