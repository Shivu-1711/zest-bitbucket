import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  rowData: any;
  response
  value
  values
  faciltydetail:any =[]
  image: any = []
  eventsviewdata: any = []
  submitted = false;
  editeventform: FormGroup;
  ids
  latitude
  longitude
  displayedColumns: string[] = ['facilityid', 'name', 'title', 'date', 'cost', 'contactPerson', 'Status', 'Action'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService) { }

  ngOnInit() {
    this.faciltydetail=[]
    this.eventsviewdata = []
    this.editeventform = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
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
      facilityId: ['', Validators.required],
    });
    this.getevents()
  }


  getevents() {
    this.Service.getallevents().subscribe(res => {
      this.response = res;

      this.rowData = new MatTableDataSource();
      this.rowData.data = this.response.response;
      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;

    })
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
      "address": this.editeventform.value.address,
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
      "facility_id": parseInt(this.editeventform.value.facilityId)

    }
    this.Service.updateEventDetails(eventsdata).subscribe((res) => {

      swal.fire({
        icon: 'success',
        text: "events updated",
      })
      document.getElementById('id02').style.display = 'none'
      this.submitted = false

      this.ngOnInit()
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "events not updated",
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

  onResetss() {
    document.getElementById('id02').style.display = 'none'
    this.ngOnInit()
  }
  facilityfetch(data)
  {
    this.Service.getfaciltybyid(parseInt(data)).subscribe((res)=>{

this.faciltydetail=res.response
document.getElementById('id03').style.display = 'block'
    })
  }
  onResetsss()
  {
    document.getElementById('id03').style.display = 'none'
    this.ngOnInit()
  }
}
