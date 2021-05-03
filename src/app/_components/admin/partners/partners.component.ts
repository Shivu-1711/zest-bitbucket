import { Component, OnInit, ViewChild,ElementRef ,NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  rowData: any;
  response: any;
  city
  partnerForm: FormGroup;
  loading = false;
  submitted = false;
  value
  loadings = false;
  values
  spinner= false;
  displayedColumns: string[] = ['ZestID','partnerName', 'officialEmail', 'userName','contactNo', 'Status', 'Action'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;




  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder


  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;
  constructor(public Service: DashboardService, private formBuilder: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
   
    this.partnerForm = this.formBuilder.group({
      partnerName: ['', Validators.required],
      userName: ['', Validators.required],
      officialEmail: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', Validators.required],
      state: ['', Validators.required],
      // country: ['', Validators.required],
      perDayCost: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });

    //call table function
    this.getallpartners();
    this.getcity()
    this.mapopen()
  }



  get f() { return this.partnerForm.controls; }

  //add patners
  onSubmit() {
    this.submitted = true;
    if (this.partnerForm.invalid) {
      alert(this.partnerForm)
      return;
    }
    let partnerdata = {
      "partnerName": this.partnerForm.value.partnerName,
      "userName": this.partnerForm.value.userName,
      "officialEmail": this.partnerForm.value.officialEmail,
      "password": this.partnerForm.value.password,
      "contactNo": this.partnerForm.value.contactNo,
      "address": this.partnerForm.value.address,
      "state": this.partnerForm.value.state,
      // "country": this.partnerForm.value.country,
      // "perDayCost": this.partnerForm.value.perDayCost,
      "city": parseInt(this.partnerForm.value.city),
      "pinCode": this.partnerForm.value.pincode,
      "latitude": this.partnerForm.value.latitude,
      "longitude": this.partnerForm.value.longitude
    }

    this.Service.addPartner(partnerdata).subscribe(res => {

      if(res.status==200)
      {
        swal.fire({
          icon: 'success',
          text: "add partner succefully",
        })
        this.submitted = false
        document.getElementById('id01').style.display = 'none'
        this.ngOnInit()
      }
      else
      {
        swal.fire({
          icon: 'warning',
          text:res.message,
        })
      }
     
     
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "Add Partner failed  ",
      })
      this.submitted = false
      document.getElementById('id01').style.display = 'none'
      this.ngOnInit()
    })

  }


  //api for partnertable
  getallpartners() {
    this.spinner=true
    this.Service.getAllPartner().subscribe((res )=> {
     this.spinner=false 
      this.response = res;
      this.rowData = new MatTableDataSource();
      this.rowData.data = this.response.response;
      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;

    },error=>{
      this.spinner=false 
      swal.fire({
        icon: 'warning',
        text: "No internet connection plz connect to internet",
      })
    })
  }
  //search filter for partnertable
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();

  }



  //add partner form open ---------------

  addpartner() {
    document.getElementById('id01').style.display = 'block'
  }

  //add partner form close
  onReset() {
    document.getElementById('id01').style.display = 'none'
    this.submitted = false
    this.ngOnInit()

  }
  //getcity
  getcity() {
    this.Service.getcity().subscribe((res) => {
      this.city = res.response
    })
  }
  //status function
  status(data, id) {

    if (data == true) { this.value = "Deactive", this.values = "false" }
    else { this.value = "Active", this.values = "true" }
    swal.fire({
      title: 'Are you sure?',
      text: "You want to " + this.value + " this partner",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' + this.value + 'it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Service.partnerStatusChange(this.values, id).subscribe((res => {
          swal.fire(
            'changed succesfully',

            'status'
          )
          this.ngOnInit()
        }), error => {
          swal.fire(
            'change not done',

            'success'
          )
        })
      }
      this.ngOnInit()
    })
  }

//code for map 
mapopen()
{
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
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
}


private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.zoom = 8;
      this.getAddress(this.latitude, this.longitude);
    });
  }
}


markerDragEnd($event: MouseEvent) {
console.log($event)
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}

getAddress(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }

  });
}
}
