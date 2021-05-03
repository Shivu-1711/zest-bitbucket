import { Component, OnInit,  ViewChild,ElementRef ,NgZone} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-partner-register',
  templateUrl: './partner-register.component.html',
  styleUrls: ['./partner-register.component.css']
})
export class PartnerRegisterComponent implements OnInit {

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


  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder


  displayedColumns: string[] = ['partnerName', 'officialEmail', 'userName','contactNo', 'Status', 'Action'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
      pincode: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.getcity()

    this.mapopen()
  }
  get f() { return this.partnerForm.controls; }

  //add patners
  onSubmit() {
    this.submitted = true;
    if (this.partnerForm.invalid) {
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
      "country": "CANADA",
    "pinCode": this.partnerForm.value.pincode,
      "city": parseInt(this.partnerForm.value.city),
      "latitude": this.partnerForm.value.latitude,
      "longitude": this.partnerForm.value.longitude
    }
console.log(partnerdata)
    this.Service.addpartnernewapi(partnerdata).subscribe(res => {

      if(res.status==200)
      {
        swal.fire({
          icon: 'success',
          text: "THANK YOU FOR REGISTER, ZEST TEAM WILL GET IN TOUCH WITH YOU FOR FURTHER PROCESS",
        })
        this.submitted = false
        this.ngOnInit()
      }
     else
     {
      swal.fire({
        icon: 'success',
        text: res.message,
      })
      this.submitted = false
     }
    
     
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "register Partner failed",
      })
      this.submitted = false
    
     
    })

  }
  getcity() {
    this.Service.getcity().subscribe((res) => {
      this.city = res.response
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
