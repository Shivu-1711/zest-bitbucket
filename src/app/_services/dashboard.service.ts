import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
blank
  

  constructor(private http:HttpClient) { }

  //admin components
  admindetails()
  {
    return this.http.get<any>(environment.baseUrl+ "/admin/getAllAdmin");
  }
  addadmin(data)
  {
    return this.http.post<any>(environment.baseUrl+ "/admin/addAdmin",data);
  }
  adminstatus(data,id)
{
  return  this.http.put<any>(environment.baseUrl+ "/admin/adminStatusChange?adminId="+id+"&status="+data,this.blank);
}
editadmin(data)
{
  return  this.http.put<any>(environment.baseUrl+ "/admin/updateAdmin",data);
}
updatepassword(data)
{
  return  this.http.put<any>(environment.baseUrl+ "/admin/updatePassword",data);
}


//partnercomponent

  getAllPartner()
  {
    return this.http.get<any>(environment.baseUrl+ "/partner/getAllPartner");
  } 
  addPartner(data)
  {
    return this.http.post<any>(environment.baseUrl+ "/partner/addPartner",data);
  }
  partnerStatusChange(data,id)
  {
    return  this.http.post<any>(environment.baseUrl+ "/partner/partnerStatusChange?partnerId="+id+"&status="+data,this.blank);
  }


//dashboard components
  getallcount()
  {
    return this.http.get<any>(environment.baseUrl+ "/partner/getAllCount");
  }




//login components  
   login(username,passwords)
   {
    return this.http.get<any>(environment.baseUrl+ "/user/loginUser?userName="+username+"&password="+passwords);
   }



//partnerdetail component
getfaciltybypartnerid(id)
{
  return this.http.get<any>(environment.baseUrl+ "/facility/getFacilityByPartnerId?id="+id);
}
getpartnerbyid(id)
{
  return this.http.get<any>(environment.baseUrl+ "/partner/getPartnerById?id="+id);
}

addfacilty(data)
{
  return this.http.post<any>(environment.baseUrl+ "/facility/addfacility",data);
}

updatepartner(data)
{
  return this.http.put<any>(environment.baseUrl+ "/partner/updatePartner",data);
}

facilityStatusChange(data,id)
{
  return this.http.get<any>(environment.baseUrl+ "/facility/facilityStatusChange?facilityId="+id+"&status="+data);
}
updatepartnerpassword(data)
{
  return this.http.put<any>(environment.baseUrl+ "/partner/updatePartnerPassword",data);
}
getallbankdetailbypartnerid(data)
{
  return this.http.get<any>(environment.newurl+ "partner/getAllBankDetailsByPartnerId?partnerId="+data)
}
updatebankdetail(data)
{
  return this.http.put<any>(environment.newurl+ "partner/updateBankDetails",data);
}
addbankdetail(data)
{
  return this.http.post<any>(environment.baseUrl+ "/partner/addBankDetails",data);
}

addqrcode(data)
{
  return this.http.post<any>(environment.baseUrl+ "/facility/generateQrCode",data);
}

//facilty components
getfacilityuserbyfaciltyid(id)
{
  return this.http.get<any>(environment.baseUrl+ "/facilityuser/getFacilityUserByFacilityId?facilityId="+id);
}
getfaciltybyid(id)
{
  return this.http.get<any>(environment.baseUrl+ "/facility/getFacilityById?id="+id);
}
addfacilityuser(data)
{
  return this.http.post<any>(environment.baseUrl+ "/facilityuser/addFacilityUser",data);
}
faciltyuserstatuschange(data,id)
{
  return  this.http.post<any>(environment.baseUrl+ "/facilityuser/facilityUserStatusChange?facilityUserId="+id+"&status="+data,this.blank);
}
updatefaciltyuser(data)
{
  return this.http.put<any>(environment.baseUrl+ "/facilityuser/updateFacilityUser",data);
}
updatefaciltyuserpassword(data)
{
  return this.http.post<any>(environment.baseUrl+"/facilityuser/updateFacilityUserPassword",data);
}
updatefacilty(data)
{
  return this.http.put<any>(environment.baseUrl+ "/facility/updateFacility",data);
}

//user component
getallenduser()
{
  return this.http.get<any>(environment.baseUrl+ "/enduser/getAllEndUser");
}
enduserstatuschange(data,id)
{
  return  this.http.post<any>(environment.baseUrl+ "/enduser/endUserStatusChange?endUserId="+id+"&status="+data,this.blank);
}
addenduser(data)
{
  return this.http.post<any>(environment.baseUrl+ "/enduser/addEndUser",data);
}
updateednuser(data)
{
  return this.http.put<any>(environment.baseUrl+ "/enduser/updateEndUser",data);
}
updateenduserpassword(data)
{
  return this.http.put<any>(environment.baseUrl+ "/enduser/updateEndUserPassword",data);
}
//common api
getcity()
{
  return this.http.get<any>(environment.baseUrl+ "/city/getAllCity");
}
//blog components
getallblog()
{
  return this.http.get<any>(environment.baseUrl+ "/blogs/getAllBlogs");
}
blogstatuschange(id,data)
{
  return this.http.get<any>(environment.baseUrl+ "/blogs/blogsStatusChange?blogId="+id+"&status="+data);
}
deleteblog(id)
{
  return this.http.delete<any>(environment.baseUrl+ "/blogs/deleteBlogsById?id="+id)
}
updateblog(data)
{
  return  this.http.put<any>(environment.baseUrl+ "/blogs/updateBlogs",data);
}
postblog(data)
{
  return this.http.post<any>(environment.baseUrl+ "/blogsa/postBlogs",data);
}
deleteaddvert(id)
{
  return this.http.delete<any>(environment.baseUrl+ "/advertisment/deleteAdvertismentStatusById?id="+id)
}
//event components
getallevents()
{
  return this.http.get<any>(environment.baseUrl+ "/Events/getAllEvents");
}
changeEventStatusById(id,data)
{
 
  return  this.http.post<any>(environment.baseUrl+ "/Events/eventChangeStatusById?id="+id+"&status="+data,this.blank);
}
updateEventDetails(data)
{
  return  this.http.put<any>(environment.baseUrl+ "/Events/updateEventDetails",data);
}
getallblogs()
{
  return this.http.get<any>(environment.baseUrl+ "/blogsa/getAllBlogsa");
}

//header components

getadminbyid(data)
{
  
  return this.http.get<any>(environment.baseUrl+ "/admin/getAdminById?adminId="+data);
}

getsuperadminbyid(data)
{
  
  return this.http.get<any>(environment.baseUrl+ "/user/getSuperAdminById?id="+data);
}

//issue compenents

getallissue()
{
  return this.http.get<any>(environment.baseUrl+ "/reports/getAllIssue")

}


//testimonial pagr
getalltestimonial()
{
  
  return this.http.get<any>(environment.baseUrl+ "/testimonials/getAllTestiMonials")
}

updatetestimonial(data)
{
  
  return  this.http.put<any>(environment.baseUrl+ "/testimonials/updateTestiMonials",data);
}


deletetestimonial(id)
{
  
  return this.http.delete<any>(environment.baseUrl+ "/testimonials/deleteTestiMonialsById?id="+id)
}

addtestimonial(data)
{
 return  this.http.put<any>(environment.baseUrl+ "/testimonials/postTestimonal",data);
}
//advertisement components

advertisment(data)
{
  
  return this.http.get<any>(environment.baseUrl+ "/advertisment/getAdvertismentByType?type="+data)
}
statusadvertisemnt(id,data)
{
  return this.http.post<any>(environment.baseUrl+ "/advertisment/changeAdvertismentStatusById?id="+id+"&status="+data,this.blank)
}
addAdvertisment(data)
{
  return this.http.post<any>(environment.baseUrl+ "/advertisment/addadvertisment",data)
}

// transaction components
gettransbydate(id,start,end)
{
 
  return this.http.get<any>(environment.baseUrl+ "/partner/getTransactionByPartnerId?partnerId="+id+"&startDate="+start+"&endDate="+end)
}
//transaction components by facilty



gettranactionbyfacilty(id,start,end)
{
  return this.http.get<any>(environment.baseUrl+ "/facility/getTransactionBetweenDateByFacilityId?startDate="+start+"&endDate="+end+"&facilityId="+id)
}

//faciltyevents components
geteventsbyfaciltyid(id)
{
 
  return this.http.get<any>(environment.baseUrl+ "/Events/getEventByFacilityId?facilityId="+id)

}
addevents(data)
{
  return this.http.post<any>(environment.baseUrl+ "/Events/addEvent",data)
}

sendcontact(data)
{
  return this.http.post<any>(  environment.newurl+"contactUs/addContactUs",data);

}

addpartnernewapi(data)
{
  return this.http.post<any>(   environment.newurl+"partner/addPartner",data);
}
detailofuser()
{
  return this.http.get<any>(environment.newurl+ "contactUs/getAllContactUs")
}
addcity(data)
{
  return this.http.post<any>(   environment.newurl+"city/saveCity",data);
}
}

