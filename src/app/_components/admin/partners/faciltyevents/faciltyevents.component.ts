import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faciltyevents',
  templateUrl: './faciltyevents.component.html',
  styleUrls: ['./faciltyevents.component.css']
})
export class FaciltyeventsComponent implements OnInit {
  rowData: any;
  response
  value
  values
  image: any = []
  eventsviewdata: any = []
  submitted = false;
  editeventform: FormGroup;
  addeventform: FormGroup;
  ids
  faciltyid
  latitude
  longitude

  faciltydetail
  zoom: number;
  address: string;
  partnersid

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  displayedColumns: string[] = [ 'name', 'title', 'date', 'cost', 'contactPerson', 'Status', 'Action'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.faciltyid = this.route.snapshot.paramMap.get('id');
    this.partnersid= this.route.snapshot.paramMap.get('partnerid');
    console.log(this.faciltyid)
    this.eventsviewdata = []
    this.editeventform = this.formBuilder.group({
      name: ['', Validators.required],
    
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timing: ['', Validators.required],
      cost: ['', Validators.required],
      about: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      contactPerson: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      
    });
    this.addeventform = this.formBuilder.group({
      name: ['', Validators.required],
     
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timing: ['', Validators.required],
      cost: ['', Validators.required],
      about: ['', Validators.required],
      termsAndConditions: ['', Validators.required],
      contactPerson: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      
    });
    this.getevents()
    this.facilitybyids()
  }
 //filter for event
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.rowData.filter = filterValue.trim().toLowerCase();
}
//status function
status(data, id) {

  if (data == true) { this.value = "Deactive", this.values = "false" }
  else { this.value = "Active", this.values = "true" }
  swal.fire({
    title: 'Are you sure?',
    text: "You want to " + this.value + " this event",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes' + this.value + 'it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.Service.changeEventStatusById(id, this.values).subscribe((res => {
        swal.fire(
          'changed succesfully',


        )
        this.ngOnInit()
      }), error => {
        swal.fire(
          'change not done',


        )
      })
    }
    this.ngOnInit()
  })
}
view(data) {
  this.eventsviewdata = data
  this.image = this.eventsviewdata.image

  document.getElementById('id01').style.display = 'block'
}
//close view events form
onResets() {
  document.getElementById('id01').style.display = 'none'
  this.ngOnInit()
}

//edit blog form
get a() { return this.editeventform.controls; }

onSubmits() {

  this.submitted = true;
  if (this.editeventform.invalid) {
    return;
  }

  let eventsdata = {
    "id": parseInt(this.ids),
    "name": this.editeventform.value.name,
    "address": this.address,
    "title": this.editeventform.value.title,
    "startDate": this.editeventform.value.startDate,
    "endDate": this.editeventform.value.endDate,
    "timing": this.editeventform.value.timing,
    "cost": parseInt(this.editeventform.value.cost),
    "about": this.editeventform.value.about,
    "termsAndConditions": this.editeventform.value.termsAndConditions,
    "contactPerson": this.editeventform.value.contactPerson,
    "mobileNumber": parseInt(this.editeventform.value.mobileNumber),
    "email": this.editeventform.value.email,
    "latitude": parseInt(this.latitude),
    "longitude": parseInt(this.longitude),
    "facilityId": parseInt(this.faciltyid)

  }
  this.Service.updateEventDetails(eventsdata).subscribe((res) => {

    swal.fire({
      icon: 'success',
      text: "class updated",
    })
    document.getElementById('id02').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  }, error => {
    swal.fire({
      icon: 'warning',
      text: "class not updated",
    })
    document.getElementById('id02').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  })
}
edit(data) {
  this.eventsviewdata = data
  this.ids = this.eventsviewdata.id
  this.latitude = this.eventsviewdata.latitude
  this.longitude = this.eventsviewdata.longitude

  document.getElementById('id02').style.display = 'block'
}
getevents() {
  this.Service.geteventsbyfaciltyid(this.faciltyid).subscribe((res )=> {
    this.response = res;

    this.rowData = new MatTableDataSource();
    this.rowData.data = this.response.response;
    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;

  },error=>{
    swal.fire({
      icon: 'warning',
      text: "Thier is no class by this Facilty center ",
    })
  })
}
onResetss() {
  document.getElementById('id02').style.display = 'none'
  document.getElementById('id03').style.display = 'none'
  this.ngOnInit()
}
 //add facility form open 
 addfacility() {
 
  document.getElementById('id03').style.display = 'block'
}







//edit blog form
get f() { return this.addeventform.controls; }

onSubmitss() {

  this.submitted = true;
  if (this.addeventform.invalid) {
    return;
  }

  let eventsdata = {
   
  
    
      "name":this.addeventform.value.name,
      "address":this.address,
      "title":this.addeventform.value.title,
      "startDate":this.addeventform.value.startDate,
      "endDate": this.addeventform.value.endDate,
      "timing":this.addeventform.value.timing,
      "cost":parseInt(this.addeventform.value.cost),
      "about":this.addeventform.value.about,
      "termsAndConditions":this.addeventform.value.termsAndConditions,
      "contactPerson":this.addeventform.value.contactPerson,
      "mobileNumber":parseInt(this.addeventform.value.mobileNumber),
      "email":this.addeventform.value.email,
      "latitude":this.latitude,
      "longitude":this.longitude,
      "facilityId":parseInt(this.faciltyid)
  

  }
  this.Service.addevents(eventsdata).subscribe((res) => {

    swal.fire({
      icon: 'success',
      text: "events added",
    })
    document.getElementById('id03').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  }, error => {
    swal.fire({
      icon: 'warning',
      text: "event  not added ",
    })
    document.getElementById('id03').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  })
}



  //facility by facilty byid
  facilitybyids()
  {
    this.Service.getfaciltybyid(this.faciltyid).subscribe((res)=>{
      this.faciltydetail=res.response
    
      
        
        this.latitude=res.response.latitude
        this.longitude=res.response.longitude
        this.address=res.response.address
       
      })
    
    }
}
