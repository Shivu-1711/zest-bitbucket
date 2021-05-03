import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
@Component({
  selector: 'app-transactionpartner',
  templateUrl: './transactionpartner.component.html',
  styleUrls: ['./transactionpartner.component.css']
})
export class TransactionpartnerComponent implements OnInit {

  public format: string = 'yyyy-MM-dd ';
  rowData: any;
  roles
  partenrid
  response
  startdate
  enddate
  end
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['facilityName', 'transactiondate', 'endUserName', 'creditAmount', 'totalAmount'];
  view: boolean = false
  constructor(public Service: DashboardService, private route: ActivatedRoute,
    private _router: Router, private formBuilder: FormBuilder, private router: Router,public datepipe: DatePipe) { }

  ngOnInit() {



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
    this.view = false
this.lastfivedays()
}

  //date by transaction call
  getDater(data) {
    if (data.value == null) {
      return
    }

    this.end = data.text.split(" ")
    this.startdate = this.end[0]
    this.enddate = this.end[3]

    this.Service.gettransbydate(this.partenrid, this.startdate, this.enddate).subscribe(res => {
if(res.status==400)
{
  swal.fire({
    icon: 'warning',
    text: "Thier is no transaction between this Date  ",
  })
  
}
      this.rowData = new MatTableDataSource();
      this.response = res.response;
      this.rowData.data = this.response;

      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;


    }, error => {
      this.rowData = new MatTableDataSource();
      swal.fire({
        icon: 'warning',
        text: "Thier is no transaction by this last date plz change last date ",
      })
      this.rowData.data = [];
      this.rowData.paginator = this.paginator;
      this.rowData.sort = this.sort;
    })

  }
//searching for table 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();

  }


  lastfivedays()
  {

    var enddatetemp = new Date();
   
    enddatetemp.setDate(enddatetemp.getDate()-7);
    
    this.startdate=enddatetemp
    this.enddate= new Date();
    this.startdate =this.datepipe.transform(this.startdate, 'yyyy-MM-dd');
    this.enddate =this.datepipe.transform(this.enddate, 'yyyy-MM-dd');
   
    this.Service.gettransbydate(this.partenrid, this.startdate, this.enddate).subscribe(res => {
      if(res.status==400)
      {
        swal.fire({
          icon: 'warning',
          text: "Thier is no transaction in last five days ",
        })
        
      }
            this.rowData = new MatTableDataSource();
            this.response = res.response;
            this.rowData.data = this.response;
      
            this.rowData.paginator = this.paginator;
            this.rowData.sort = this.sort;
      
      
          }, error => {
            this.rowData = new MatTableDataSource();
      
            this.rowData.data = [];
            this.rowData.paginator = this.paginator;
            this.rowData.sort = this.sort;
          })
  }
}
