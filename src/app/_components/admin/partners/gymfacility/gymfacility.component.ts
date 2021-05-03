import { Component, OnInit ,ViewChild, ElementRef, NgZone} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import {ThemePalette} from '@angular/material/core';
import { MapsAPILoader,MouseEvent } from '@agm/core';
@Component({
  selector: 'app-gymfacility',
  templateUrl: './gymfacility.component.html',
  styleUrls: ['./gymfacility.component.css']
})
export class GymfacilityComponent implements OnInit {
  rowData:any;
  facityid
  faciltydetail:any=[]
  city
  facilityuser: FormGroup;
  editfacilityuser: FormGroup;
  passwordform: FormGroup;
  editfacility: FormGroup;
  loading = false;
  submitted = false;
  value
  editdata:any=[]
  id
  userid
  values
  cities
  qrcode
  partnersid
  latitude: number;
longitude: number;
zoom: number;
address: string;
private geoCoder
message
@ViewChild('search', {static: true})
public searchElementRef: ElementRef;

  
  color: ThemePalette = 'primary';
  displayedColumns: string[] = [ 'name', 'address', 'contactNumber','email','Status','Action'];
  response:any=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public Service : DashboardService,private route: ActivatedRoute,
    private _router:Router,private formBuilder: FormBuilder,  private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }
  ngOnInit() {
    this.faciltydetail=[]
    this.editdata=[]
this.address=null
    this.latitude=null
    this.longitude=null
    this.facilityuser = this.formBuilder.group({
     name: ['' , Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
     city:['',Validators.required]
  });
  this.editfacilityuser = this.formBuilder.group({
    name: ['' , Validators.required],
     contactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
     address: ['', Validators.required],
     userName: ['', Validators.required],
     email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  city:['',Validators.required]
 });

 this.passwordform = this.formBuilder.group({
  password: ['', Validators.required],
   });

   this.editfacility = this.formBuilder.group({
    facilityName: ['' , Validators.required],
    addresss: ['', Validators.required],
    openTime: ['', Validators.required],
    closeTime: ['', Validators.required],
    phoneNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    websiteUrl:['',Validators.required],
    latitudes:['',Validators.required],
    longitudes:['',Validators.required]
 });


    this.facityid = this.route.snapshot.paramMap.get('id');
    this.partnersid=this.route.snapshot.paramMap.get('partnerid');
    console.log(this.partnersid)
    this.facilitybyids()
    this.user();
    this.getcity()
  }




  // /api for table
  user(){
    this.response=[]
    this.Service.getfacilityuserbyfaciltyid(this.facityid).subscribe(res => {
        // this.rowData = res.JsonData;
        if(res.status==400)
        {
          this.message="No Data available"
        }
        this.rowData = new MatTableDataSource();

        
  this.rowData.data= res.response;
      
        this.rowData.paginator = this.paginator;
        this.rowData.sort = this.sort;
        
        
      },error=>{
        
        this.rowData = new MatTableDataSource();
       
        this.rowData.data= [];
        this.message="No Data available"
        this.rowData.paginator = this.paginator;
        this.rowData.sort = this.sort;
      })
  }
  //search filter for table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();
    
  }

  //facility by facilty byid
facilitybyids()
  {
    this.Service.getfaciltybyid(this.facityid).subscribe((res)=>{
      this.faciltydetail=res.response
      this.qrcode=this.faciltydetail.qrCode.link
      this.mapsAPILoader.load().then(() => {
        
        this.latitude=res.response.latitude
        this.longitude=res.response.longitude
        this.address=res.response.address
        this.setCurrentLocation( this.latitude,this.longitude);
        // this.getAddress(this.latitude, this.longitude)

        this.geoCoder = new google.maps.Geocoder;
    
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
    
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });

    })
    
  }

//ADD facilty user Start -----------------

//add  faciltyuser submit
get f() { return this.facilityuser.controls; }


//for add userfacilty submit form
onSubmit() {
  this.submitted = true;
  if (this.facilityuser.invalid) {
    return;
}

let facilityuserdata={
"name":this.facilityuser.value.name,
"contactNumber":this.facilityuser.value.contactNumber,
"address":this.facilityuser.value.address,
"userName":this.facilityuser.value.userName,
"email":this.facilityuser.value.email,
"password":this.facilityuser.value.password,
"city":1,
"facilityId":parseInt(this.facityid)
}

// api for add data
this.Service.addfacilityuser(facilityuserdata).subscribe(res=>{
swal.fire({
  icon: 'success',
  text: "faciltyuser  added succesfully",
})
document.getElementById('id01').style.display='none'
this.submitted=false
this.ngOnInit()
},error=>{
swal.fire({
  icon: 'warning',
  text: "faciltyuser not added",
})
document.getElementById('id01').style.display='none'
this.submitted=false
this.ngOnInit()
})
}

  //add FACILTYuser form open 
  addfacilityusers()
  {
    document.getElementById('id01').style.display='block'
  }
//add faciltyuser form close
onReset()
{
  document.getElementById('id01').style.display='none'
  this.ngOnInit()
}

//add facilty user end----------



//getcity
getcity()
{
  this.Service.getcity().subscribe((res)=>{
    this.city=res.response
  })
}
 //status function
status(data,id)
  {
    
    if(data==true){this.value="Deactive",this.values="false"}
    else{this.value="Active",this.values="true"}
    swal.fire({
      title: 'Are you sure?',
      text: "You want to "+this.value+" this faciltyuser",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' +this.value +'it!'
    }).then((result) => {
      if (result.isConfirmed) {
             this.Service.faciltyuserstatuschange(this.values,id).subscribe((res=>{
              swal.fire(
                'changed succesfully',
                
                'status'
              )
              this.ngOnInit()
             }),error=>{
              swal.fire(
                'change not done',
                
                'success'
              )
            
             })
        }
        this.ngOnInit() 
    })
}
  
//edit facilty user form start -------
edit(data)
{
  
  this.editdata=data
 this.cities=this.editdata.city.id

  document.getElementById('id02').style.display='block'
  
}
get g() { return this.editfacilityuser.controls; }

//for edit userfacilty submit form
onSubmits() {
  
  this.submitted = true;
  if (this.editfacilityuser.invalid) {
    return;
}

let editfacilityuserdata={
"name":this.editfacilityuser.value.name,
"contactNumber":this.editfacilityuser.value.contactNumber,
"address":this.editfacilityuser.value.address,
"userName":this.editfacilityuser.value.userName,
"email":this.editfacilityuser.value.email,
"id":parseInt(this.editdata.id),
"city":parseInt(this.editfacilityuser.value.city)
}

this.Service.updatefaciltyuser(editfacilityuserdata).subscribe(res=>{
  swal.fire({
    icon: 'success',
    text: "faciltyuser  update succesfully",
  })
  document.getElementById('id02').style.display='none'
  this.submitted=false
  this.ngOnInit()
  },error=>{
  swal.fire({
    icon: 'warning',
    text: "faciltyuser not update added",
  })
  document.getElementById('id02').style.display='none'
  this.submitted=false
  this.ngOnInit()
  })
  }
//edit faciltyuser form close
onResets()
{
  document.getElementById('id02').style.display='none'
  this.ngOnInit()
}
//edit facilty user form end -------

//user password change start-----
get p() { return this.passwordform.controls; }
//password submit
onSubmitss() {
  this.submitted = true;
  if (this.passwordform.invalid) {
    return;
}
let updatepassword={
  "id":this.userid,
  "password":this.passwordform.value.password
}
this.Service.updatefaciltyuserpassword(updatepassword).subscribe((res)=>{
  swal.fire({
    icon: 'success',
    text: "password change succesfully",
  })
  this.submitted=false
  document.getElementById('id03').style.display='none'
  this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "password not change",
  })
  this.submitted=false
    document.getElementById('id03').style.display='none'
    this.ngOnInit()
})
}
//password form open
password(data)
{
  this.userid=data.id

  document.getElementById('id03').style.display='block'
}
//password form close
onResetss()
{
  document.getElementById('id03').style.display='none'
  this.submitted=false
  this.ngOnInit()
}


//edit facilty form close
onResetsss()
{
  document.getElementById('id04').style.display='none'
  this.ngOnInit()
}
get o() { return this.editfacility.controls; }
//facilty  submit
onSubmitsss() {
  this.submitted = true;
  if (this.editfacility.invalid) {
    return;
}
let updatefacilty={
  "id":this.facityid,
  "facilityName":this.editfacility.value.facilityName,
  "address":this.editfacility.value.addresss,
  "openTime":this.editfacility.value.openTime,
  "closeTime":this.editfacility.value.closeTime,
  "phoneNo":this.editfacility.value.phoneNo,
  "websiteUrl":this.editfacility.value.websiteUrl,
"latitude":this.editfacility.value.latitudes,
"longitude":this.editfacility.value.longitudes
}
this.Service.updatefacilty(updatefacilty).subscribe((res)=>{
  swal.fire({
    icon: 'success',
    text: "facilty change  succesfully",
  })
  this.submitted=false
  document.getElementById('id04').style.display='none'
  this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "facility not change",
  })
  this.submitted=false
    document.getElementById('id04').style.display='none'
    this.ngOnInit()
})
}




//google map function
private setCurrentLocation(lat,lon) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = lat;
      this.longitude = lon;
     
      this.zoom = 8,
      
      this.getAddress(this.latitude, this.longitude);
    });
  }
}
//google marker
markerDragEnd($event:MouseEvent) {
  
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}
//fetch address
getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
   
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
        console.log(this.address)
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
}
