import { Component, OnInit, ViewChild,ElementRef, NgZone } from '@angular/core';
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
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
provence=[]
data
  rowData: any;
  response
  value
  values
  blogviewdata: any = []
  id
  ids
  submitted = false;
addcities:FormGroup
  datas: any = []
  imageURL
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  private geoCoder

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;

  editblogform: FormGroup;
  displayedColumns: string[] = ['City',  'Status'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
this.addcities=this.formBuilder.group({
  cityname:['',Validators.required],
  latitude:[''],
  longitude:['']
})

    this.getallblog()
  }
  get p() { return this.addcities.controls; }  
 //allblog show
 getallblog() {
  this.Service.getcity().subscribe(res => {
    this.response = res;

    this.rowData = new MatTableDataSource();
    this.rowData.data = this.response.response;
    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;

  })
}
//filter for blog
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.rowData.filter = filterValue.trim().toLowerCase();
}


addcity()
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
  document.getElementById('id03').style.display='block'
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
// alert("hello")
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  console.log($event)
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


onSubmitss()
{
this.submitted = true;
    if (this.addcities.invalid) {
      return;
    }

    this.geoCoder.geocode({ 'location': { lat: this.addcities.value.latitude, lng: this.addcities.value.longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
      
          this.address = results[0].formatted_address;
console.log(this.address)
this.provence= this.address.split(',');
this.data=this.provence[this.provence.length-3]+","+this.provence[this.provence.length-2]+","+this.provence[this.provence.length-1]
console.log(this.provence[this.provence.length-3],this.provence[this.provence.length-2],this.provence[this.provence.length-1])
          let share=
          {
            "cityName":this.data,
            "longitude":this.addcities.value.longitude,
            "latitude":this.addcities.value.latitude
          }
          this.Service.addcity(share).subscribe((res)=>{
            swal.fire({
              icon: 'success',
              text: "City add  succefully",
            })
            document.getElementById('id03').style.display='none'
          },error=>{
            swal.fire({
              icon: 'warning',
              text: "City not added succesfully",
            })
            document.getElementById('id03').style.display='none'
          })






        
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    }); 

    







}
onResetss() {
  document.getElementById('id03').style.display = 'none'
  this.submitted = false
  this.ngOnInit()
}

fetch()
{
  alert("hello")
  console.log(event)
}


}
