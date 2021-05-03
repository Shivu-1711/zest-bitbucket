import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import QRCode from 'qrcode'
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-partnerdetail',
  templateUrl: './partnerdetail.component.html',
  styleUrls: ['./partnerdetail.component.css']
})
export class PartnerdetailComponent implements OnInit {
  rowData: any;
  partenrid
  displayedColumns: string[] = ['ZestID','facilityName', 'address', 'city', 'status', 'Action'];
  response: any;
  partnerdetail: any = []
  partnerdetails: any = []
  city
  values
  value
  bankdetails: any = []
  facilityForm: FormGroup;
  partnereditForm: FormGroup;
  passwordform: FormGroup;
  addbankform: FormGroup;
  bankform: FormGroup;
  loading = false;
  submitted = false;
  color: ThemePalette = 'primary';
  userid
  bankid
  visible
  visible1
  roles
message
  mycode
  spinner= false;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public Service: DashboardService, private route: ActivatedRoute,
    private _router: Router, private formBuilder: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {




    this.bankdetails = []
    this.partnerdetails = []
    this.visible = false
    this.visible1 = false
    //facilty add 
    this.facilityForm = this.formBuilder.group({
      facilityName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      websiteUrl: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
    //partner edit
    this.partnereditForm = this.formBuilder.group({
      partnerName: ['', Validators.required],
      userName: ['', Validators.required],
      officialEmail: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', Validators.required],
      state: ['', Validators.required],
      // country: ['', Validators.required],
      // perDayCost: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.passwordform = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.bankform = this.formBuilder.group({
      nameOfBank: ['', Validators.required],
      accountNumber: ['', Validators.required],
      swiftCode: ['', Validators.required],
      associatedEmailId: ['', Validators.required],
      transitNo: ['', Validators.required],
      holdername:['', Validators.required],
      contactno:['', Validators.required]
    });
    this.addbankform = this.formBuilder.group({
      nameOfBank: ['', Validators.required],
      accountNumber: ['', Validators.required],
      swiftCode: ['', Validators.required],
      associatedEmailId: ['', Validators.required],
      transitNo: ['', Validators.required],
      holdername:['', Validators.required],
      contactno:['', Validators.required]
    });
    this.partenrid = this.route.snapshot.paramMap.get('id');
    var roles = localStorage.getItem('role')
    this.roles = JSON.parse(roles);
    //for unknown user
    if (this.roles.role == "Partner") {
      if (this.roles.user.id != this.partenrid) {
        localStorage.clear()
        this.router.navigate([''])
      }
    }

    this.partnerdetailbyid()
    this.getfacility();
    this.getcity()
    this.bankdetail()
  }

  //bank detail by partner   
  bankdetail() {
    this.Service.getallbankdetailbypartnerid(this.partenrid).subscribe((res) => {
      if (res.status == 200) {
        this.visible = true
        this.bankdetails = res.response

        this.bankid = this.bankdetails.id
      }
      else {
        this.visible1 = true
      }

    })
  }
  //edit bank detail  form close
  onResetsss() {
    document.getElementById('id04').style.display = 'none'
    this.submitted = false
    this.ngOnInit()
  }
  get a() { return this.bankform.controls; }
  //edit account detail
  onSubmitsss() {
    this.submitted = true;
    if (this.bankform.invalid) {
      return;
    }
    let bankdata = {
      "nameOfBank": this.bankform.value.nameOfBank,
      "accountNumber": this.bankform.value.accountNumber,
      "partnerId": this.partenrid,
      "swiftCode": this.bankform.value.swiftCode,
      "id": this.bankid,
      "associatedEmailId": this.bankform.value.associatedEmailId,
      "transitNo": this.bankform.value.transitNo,
      "holderName":this.bankform.value.holdername,
    "contactNo":this.bankform.value.contactno
    }

    this.Service.updatebankdetail(bankdata).subscribe(res => {
      swal.fire({
        icon: 'success',
        text: "Edit succesfully",
      })
      this.submitted = false
      document.getElementById('id04').style.display = 'none'
      this.ngOnInit()
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "Edit failed",
      })
      this.submitted = false
      document.getElementById('id04').style.display = 'none'
      this.ngOnInit()
    })

  }
  //add bank detail  form close
  onResetssss() {
    document.getElementById('id05').style.display = 'none'
    this.submitted = false
    this.ngOnInit()
  }
  get b() { return this.addbankform.controls; }
  //add submit form
  onSubmitdata() {
    this.submitted = true;
    if (this.addbankform.invalid) {
      return;
    }
    let bankdata = {
      "nameOfBank": this.addbankform.value.nameOfBank,
      "accountNumber": this.addbankform.value.accountNumber,
      "partnerId": this.partenrid,
      "swiftCode": this.addbankform.value.swiftCode,
      "associatedEmailId": this.addbankform.value.associatedEmailId,
      "transitNo": this.addbankform.value.transitNo,
      "holderName":this.bankform.value.holdername,
    "contactNo":this.bankform.value.contactno
    }

    this.Service.addbankdetail(bankdata).subscribe(res => {
      swal.fire({
        icon: 'success',
        text: "add succefully",
      })
      this.submitted = false
      document.getElementById('id05').style.display = 'none'
      this.ngOnInit()
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "add failed",
      })
      this.submitted = false
      document.getElementById('id05').style.display = 'none'
      this.ngOnInit()
    })

  }





  //all facilty work start from here---------------------
  get f() { return this.facilityForm.controls; }
  //add facilty
  onSubmit() {
    this.submitted = true;
    if (this.facilityForm.invalid) {
      return;
    }
    let facilitydata = {
      "facilityName": this.facilityForm.value.facilityName,
      "address": this.facilityForm.value.address,
      "partnerId": this.partenrid,
      "city": this.facilityForm.value.city,
      "openTime": this.facilityForm.value.openTime,
      "closeTime": this.facilityForm.value.closeTime,
      "phoneNo": this.facilityForm.value.phoneNo,
      "websiteUrl": this.facilityForm.value.websiteUrl,
      "latitude": this.facilityForm.value.latitude,
      "longitude": this.facilityForm.value.longitude
    }

    this.Service.addfacilty(facilitydata).subscribe(res => {

      var facilityid = res.response.id
      this.submitted = false
      //qr code
      QRCode.toDataURL("" + facilityid)
        .then(url => {
          // console.log(url)
          this.mycode = url

          let qrcodedat = {
            "facilityId": facilityid,
            "link": this.mycode
          }
          this.Service.addqrcode(qrcodedat).subscribe((res) => {
            swal.fire({
              icon: 'success',
              text: "add facilty succefully",
            })

            document.getElementById('id01').style.display = 'none'
            this.ngOnInit()
          })

        })
        .catch(err => {
          document.getElementById('id01').style.display = 'none'
          this.ngOnInit()

        })

    }, error => {
      swal.fire({
        icon: 'warning',
        text: "add facilty failed",
      })
      this.submitted = false
      document.getElementById('id01').style.display = 'none'
      this.ngOnInit()
    })

  }
  //api for table
  getfacility() {
    this.spinner=true
    this.Service.getfaciltybypartnerid(this.partenrid).subscribe(res => {
      // this.rowData = res.JsonData;
      this.spinner=false
      this.rowData = new MatTableDataSource();
      this.response = res.response;
      this.rowData.data = this.response;

      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;


    }, error => {
      this.rowData = new MatTableDataSource();
      this.message="No Data available"
      this.spinner=false
      this.rowData.data = [];
      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;
    })
  }
  //status change for facilty 
  status(data, id) {

    if (data == true) { this.value = "Deactive", this.values = "false" }
    else { this.value = "Active", this.values = "true" }
    swal.fire({
      title: 'Are you sure?',
      text: "You want to " + this.value + " this facility",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' + this.value + 'it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Service.facilityStatusChange(this.values, id).subscribe((res => {
          swal.fire(
            'changed succesfully',

            'status'
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
  //search filter facilty  table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();

  }
  //add facility form open 
  addfacility() {
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
    document.getElementById('id01').style.display = 'block'
  }
  //add facilty form close
  onReset() {
    document.getElementById('id01').style.display = 'none'
    this.submitted = false
    this.facilityForm.reset()
  }
  //all facility work over-------------------------------------



  //partner work start---------------------


  get g() { return this.partnereditForm.controls; }
  //update patners
  onSubmits() {
    this.submitted = true;
    if (this.partnereditForm.invalid) {
      return;
    }
    let partnerdata = {
      "partnerName": this.partnereditForm.value.partnerName,
      "userName": this.partnereditForm.value.userName,
      "officialEmail": this.partnereditForm.value.officialEmail,
      "id": this.partenrid,
      "contactNo": this.partnereditForm.value.contactNo,
      "address": this.partnereditForm.value.address,
      "state": this.partnereditForm.value.state,
      // "country": this.partnereditForm.value.country,
      // "perDayCost": this.partnereditForm.value.perDayCost,
      "city": parseInt(this.partnereditForm.value.city)
    }

    this.Service.updatepartner(partnerdata).subscribe(res => {
      swal.fire({
        icon: 'success',
        text: "edit  partner succefully",
      })

      document.getElementById('id02').style.display = 'none'
      this.submitted = false
      this.ngOnInit()

    }, error => {
      swal.fire({
        icon: 'warning',
        text: "edit partner failed",
      })

      document.getElementById('id02').style.display = 'none'
      this.submitted = false
      this.ngOnInit()
    })


  }
  //add facilty form close
  onResets() {
    document.getElementById('id02').style.display = 'none'
    this.submitted = false
    this.ngOnInit()
  }

  //partnerfindbyid
  partnerdetailbyid() {
    this.Service.getpartnerbyid(this.partenrid).subscribe((res => {
      this.partnerdetail = res.response
      console.log(this.partnerdetail)
      this.partnerdetails = res.response
    }))
  }

  //partner work over----------------

  //getcity
  getcity() {
    this.Service.getcity().subscribe((res) => {
      this.city = res.response
    })
  }




  //user password change start-----
  get p() { return this.passwordform.controls; }
  //password submit
  onSubmitss() {
    this.submitted = true;
    if (this.passwordform.invalid) {
      return;
    }
    let updatepassword = {
      "id": parseInt(this.partenrid),
      "password": this.passwordform.value.password
    }
    this.Service.updatepartnerpassword(updatepassword).subscribe((res) => {
      swal.fire({
        icon: 'success',
        text: "password change  succesfully",
      })
      this.submitted = false
      document.getElementById('id03').style.display = 'none'
      this.ngOnInit()
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "password not change",
      })
      this.submitted = false
      document.getElementById('id03').style.display = 'none'
      this.ngOnInit()
    })
  }

  //password form close
  onResetss() {
    document.getElementById('id03').style.display = 'none'
    this.submitted = false
    this.ngOnInit()
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
