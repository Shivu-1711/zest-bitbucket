import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-admindetail',
  templateUrl: './admindetail.component.html',
  styleUrls: ['./admindetail.component.css']
})
export class AdmindetailComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  rowData:any;
  color: ThemePalette = 'primary';
  value
  admindata
  
  editdata:any=[]
  passwordform: FormGroup;
  userid
  loadings = false;
  
  cities
 
  disabled = false;
  displayedColumns: string[] = ['name', 'contactNumber', 'address','email','Status','Action'];
  values
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  constructor(public Service : DashboardService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.editdata=[]
    this.registerForm = this.formBuilder.group({
      name: ['' , Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
     
       });

       this.passwordform = this.formBuilder.group({
        password: ['', Validators.required],
         });

    //call table function
    this.admindetail();
  }
  get f() { return this.registerForm.controls; }  
  //edit form
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  let userdata={
   "id":this.editdata.id, "name":this.registerForm.value.name,"contactNumber":this.registerForm.value.contactNumber,"address":this.registerForm.value.address,"userName":this.registerForm.value.userName,"email":this.registerForm.value.email,
  }
  this.Service.editadmin(userdata).subscribe(res=>{
    swal.fire({
      icon: 'success',
      text: "Admin  Edit succesfully",
    })
    
    document.getElementById('id01').style.display='none'
    this.submitted=false
    this.ngOnInit()
  },error=>{
    swal.fire({
      icon: 'warning',
      text: "Edit Failed",
    })
    this.submitted=false
    this.ngOnInit()
    document.getElementById('id01').style.display='none'
  })
 
}
  
  //status function
  status(data,id)
  {
    
    if(data==true){this.value="Deactive",this.values="false"}
    else{this.value="Active",this.values="true"}
    swal.fire({
      title: 'Are you sure?',
      text: "You want to "+this.value+" this Admin ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' +this.value +'it!'
    }).then((result) => {
      if (result.isConfirmed) {
             this.Service.adminstatus(this.values,id).subscribe((res=>{
              swal.fire(
                'Changed succesfully',
                
                'status'
              )
              this.ngOnInit()
             }),error=>{
              swal.fire(
                'Status not change  '
              )
             })
        }
        this.ngOnInit()
    })
  }

     
  
  //api for table
  admindetail(){
   
    this.Service.admindetails().subscribe((res) => {
      
           this.rowData = new MatTableDataSource();
        this.rowData.data= res.response;
        this.rowData.paginator = this.paginator;
        this.rowData.sort = this.sort;
        },error=>{
          
          swal.fire({
            icon: 'warning',
            text: "No internet connection plz connect to internet",
          })
        })
  }
  //search filter for table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rowData.filter = filterValue.trim().toLowerCase();
  }


//edit
edits(adminid)
{
  
  // this.id=JSON.stringify(adminid)
  this.editdata=adminid
    
    
    document.getElementById('id01').style.display='block' 
    
}
//close edit form
onReset()
{
  document.getElementById('id01').style.display='none'
  this.ngOnInit()
}


//user password change start-----
get p() { return this.passwordform.controls; }
//password submit
onSubmitss() {
  this.submitted = true;
  if (this.passwordform.invalid) {
    return;
}
let updatepasswords={
  "id":this.userid,
  "password":this.passwordform.value.password
}
this.Service.updatepassword(updatepasswords).subscribe((res)=>{
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

}

