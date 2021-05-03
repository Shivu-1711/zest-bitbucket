import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  city
  usercount:any=[]
  rowData:any;
  response:any;
  value
  spinner= false;
  values
  editenduserForm : FormGroup
  enduserForm: FormGroup;
  passwordform: FormGroup;
  loading = false;
  submitted = false;
  enduserid
  enduserdata
  editdata:any=[]
  id
  name
  cities
  userid
  transactions
  month:any=[]
  graph
  displayedColumns: string[] = [ 'ZestID','name', 'userName', 'email','contactNumber','Date','Status','Action'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,public Service : DashboardService) { }

  ngOnInit() {

    //user edit 
    this.editenduserForm = this.formBuilder.group({
  name: ['' , Validators.required],
   contactNumber: ['', Validators.required],
   address: ['', Validators.required],
   userName: ['', Validators.required],
   email: ['', Validators.required],
  
   city:['',Validators.required]
  });
    this.enduserForm = this.formBuilder.group({
     name: ['' , Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city:['',Validators.required]
     });
     
     this.passwordform = this.formBuilder.group({
      password: ['', Validators.required],
       });

       //call table function
    this.getallusers();
    //allusercount
    this.totaluser()
   //city call
    this.getcity()
//graph
this.linegraph()

  }



//add end user start---------------------


  //add function
  get f() { return this.enduserForm.controls; }
 //for submit form
 onSubmit() {
  this.submitted = true;
  if (this.enduserForm.invalid) {
    return;
}
let enduserdata={
"name":this.enduserForm.value.name,
"contactNumber":this.enduserForm.value.contactNumber,
"address":this.enduserForm.value.address,
"userName":this.enduserForm.value.userName,
"email":this.enduserForm.value.email,
"password":this.enduserForm.value.password,
"city":parseInt(this.enduserForm.value.city)
}
//api for end user add data
this.Service.addenduser(enduserdata).subscribe(res=>{
  swal.fire({
    icon: 'success',
    text: "end user  added succesfully",
  })
  this.submitted=false
  document.getElementById('id01').style.display='none'
  this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "end user not added",
  })
  this.submitted=false
    document.getElementById('id01').style.display='none'
    this.ngOnInit()
})
  }
//function to close addend user form
onreset()
{
  document.getElementById('id01').style.display='none'
  this.submitted=false
  this.ngOnInit()
}

//add end user stop-------------------------




//table   start---------------------------
  //api for table
  getallusers(){
    this.spinner=true
    this.Service.getallenduser().subscribe(res => {
        this.response = res;
        this.spinner=false
        this.rowData = new MatTableDataSource();
        this.rowData.data= this.response.response;
        this.rowData.paginator = this.paginator;
        this.rowData.sort = this.sort;
        
        })
  }
  //search filter for table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();
    
  }
//total user
  totaluser()
  {
this.Service.getallcount().subscribe(res=>{
  this.usercount=res.response
  this.transactions=res.response.noOfDebitTransection
  for(var j=1;j<=12;j++)
{
  var count=0
  for(var i=0;i<this.transactions.length;i++)
  {
    if(this.transactions[i].months==j)
    {
      this.month.push(this.transactions[i].count)
      count=1
    }  

  }
  if(count==0)
  {
    this.month.push(0)
  }
}

})
  }
//table function end ------------


//status updated
status(data,id)
{
  
  if(data==true){this.value="Deactive",this.values="false"}
  else{this.value="Active",this.values="true"}
  swal.fire({
    title: 'Are you sure?',
    text: "You want to "+this.value+" this user",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes' +this.value +'it!'
  }).then((result) => {
    if (result.isConfirmed) {
           this.Service.enduserstatuschange(this.values,id).subscribe((res=>{
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

//city fetch
//getcity
getcity()
{
  this.Service.getcity().subscribe((res)=>{
    this.city=res.response
  })
}

//edit user start -------
edit(data)
{
  
  this.id=JSON.stringify(data)
  this.editdata=JSON.parse(this.id)
  
  this.name=this.editdata.name
  this.cities=parseInt(this.editdata.city.id)
  
document.getElementById('id02').style.display='block'
  
}
onresets()
{
  document.getElementById('id02').style.display='none'
   this.ngOnInit()
}
get g() { return this.editenduserForm.controls; } 
//submit edit form function
onSubmits() {
  this.submitted = true;
  if (this.editenduserForm.invalid) {
    return;
}
let editenduserdata={
"name":this.editenduserForm.value.name,
"contactNumber":parseInt(this.editenduserForm.value.contactNumber),
"address":this.editenduserForm.value.address,
"userName":this.editenduserForm.value.userName,
"email":this.editenduserForm.value.email,
"id":parseInt(this.editdata.id),
"city":parseInt(this.editenduserForm.value.city)

}
this.Service.updateednuser(editenduserdata).subscribe(res=>{
  swal.fire({
    icon: 'success',
    text: "end user edit succesfully",
  })
  this.submitted=false
  document.getElementById('id02').style.display='none'
  this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "end user not edit plz check username, contact and email should be unique",
  })
  this.submitted=false
    document.getElementById('id02').style.display='none'
    this.ngOnInit()
})
}

//edit user end -----------



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
this.Service.updateenduserpassword(updatepassword).subscribe((res)=>{
  swal.fire({
    icon: 'success',
    text: "password change  succesfully",
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

//THIRD GRAPH
linegraph()
{
  var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE','JULY','AUG','SEP','OCT','NOV','DEC'],
        datasets: [{
            label: 'TRANSACTION DETAILS',
            data: this.month,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

}

