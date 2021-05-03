import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http:HttpClient) { }

getallblogs()
{
  return this.http.get<any>(environment.baseUrl+ "/blogsa/getAllBlogsa");
}
//getblogbyid
getblogbyblogid(data)
{
  return this.http.get<any>(environment.baseUrl+ "/blogsa/getBlogsByBlogIda?blogId="+data);
}
//addblog
postblog(data)
{
  return this.http.post<any>(environment.baseUrl+ "/blogs/postBlogs",data);
}

//testimonial

getalltestimonials()
{
  return this.http.get<any>(environment.baseUrl+ "/testimonials/getAllTestiMonials");
}

getallcount()
  {
    return this.http.get<any>(environment.baseUrl+ "/partner/getAllCount");
  }
coupuncode(amount,code)
{
  return this.http.get<any>(environment.baseUrl+ "/couponCode/validateCouponCode?couponCode="+code+"&amount="+amount);
}
generatetoken(data)
{
  return this.http.post<any>( environment.newurl+"paymentJson/addPayment",data);
}
carddetailbyid(id)
{
  return this.http.get<any>( environment.newurl+"card/getCardById?id="+id);
}
generatetokenforcard(data)
{
  return this.http.post<any>( environment.newurl+"paymentJson/addPaymentCard",data);
}

}
