import { Component, OnInit ,ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})

export class IssuesComponent implements OnInit {
  rowData:any;
  type
  
  response:any;
  
  displayedColumns: string[] = ['facility', 'remark','issuedate', 'issueCategory','endUser'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  background: ThemePalette = 'primary'
  constructor(public Service : DashboardService,private router: Router) { }

  ngOnInit() {
  this.faciltyissue()

  }
faciltyissue()
{
  this.type="Facility issue"
  this.Service.getallissue().subscribe(res => {
    this.response = res;
    this.rowData = new MatTableDataSource();
    this.rowData.data= this.response.response;
    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;
    
    })
}
//search filter for partnertable
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.rowData.filter = filterValue.trim().toLowerCase();
  
}

}
