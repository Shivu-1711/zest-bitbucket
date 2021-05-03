import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  rowData: any;
  response
  editstestform: FormGroup;
  testimonialdata: any = []
  addtest: FormGroup;
  id
  ids
  submitted = false;
  datas:  any = []
  imageURL
  images
  displayedColumns: string[] = ['name',  'content','designation', 'Actions'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService) { }

  ngOnInit() {
    this.datas = []
    this.editstestform = this.formBuilder.group({
      name: ['', Validators.required],
    
      designation: ['', Validators.required],
      content: ['', Validators.required],
      images: [null],
    });
    this.addtest = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      content: ['', Validators.required],
      images: [null],
    });
    this.alltestimonial()
  }

//image function for update
showPreview(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.editstestform.patchValue({
    images: file
  });
  this.editstestform.get('images').updateValueAndValidity()

  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.imageURL = reader.result as string;
  }
  reader.readAsDataURL(file)
}



//alltest show
alltestimonial() {
  this.Service.getalltestimonial().subscribe(res => {
    this.response = res;

    this.rowData = new MatTableDataSource();
    this.rowData.data = this.response.response;
    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;

  })
}
//filter for test
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.rowData.filter = filterValue.trim().toLowerCase();
}
//view blog
view(data) {
  this.testimonialdata = data


  document.getElementById('id01').style.display = 'block'
}
//close view test form
onResets() {
  document.getElementById('id01').style.display = 'none'
}
//delete test
delete(id) {
  this.id = id


  swal.fire({
    title: 'Are you sure?',
    text: "You really  want to delete this blog",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes delet it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.Service.deletetestimonial(id).subscribe((res => {
        swal.fire(
          'delete succesfully',
        )
        this.ngOnInit()
      }), error => {
        swal.fire(
          'delete failed',
        )
      })
    }
    this.ngOnInit()
  })

}
//edit test
edit(data) {
  this.datas = data
  this.ids = this.datas.id
  this.imageURL = this.datas.imageUrl

  document.getElementById('id02').style.display = 'block'
}
//close edit test form
onResetss() {
  document.getElementById('id02').style.display = 'none'
  this.ngOnInit()
}
 //edit test form
 get a() { return this.editstestform.controls; }
 //edit test submit
 onSubmits() {
   this.submitted = true;
   if (this.editstestform.invalid) {
     return;
   }

   const formData = new FormData();
  
   formData.append('content', this.a.content.value)
   formData.append('designation', this.a.designation.value)
   formData.append('name', this.a.name.value)

   if (this.editstestform.value.images != null) {

     formData.append('image', this.editstestform.value.images)
   }

   formData.append('id', this.ids)

   this.Service.updatetestimonial(formData).subscribe((res) => {

     swal.fire({
       icon: 'success',
       text: "testimonial updated",
     })
     document.getElementById('id02').style.display = 'none'
     this.submitted = false

     this.ngOnInit()
   }, error => {
     swal.fire({
       icon: 'warning',
       text: "testimonial not updated",
     })
     document.getElementById('id02').style.display = 'none'
     this.submitted = false

     this.ngOnInit()
   })
 }
 fileChangeEvent(event){
       
  if(event.target.files.length > 0){
    const file =event.target.files[0]
    this.images =file;
    }
} 
get g() { return this.addtest.controls; }
onSubmit() {
  this.submitted = true;
  if (this.editstestform.invalid) {
    return;
  }

  const formData = new FormData();
 
  formData.append('content', this.g.content.value)
  formData.append('designation', this.g.designation.value)
  formData.append('name', this.g.name.value)
    formData.append('image', this.images)
  this.Service.addtestimonial(formData).subscribe((res) => {

    swal.fire({
      icon: 'success',
      text: "testimonial add",
    })
    document.getElementById('id03').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  }, error => {
    swal.fire({
      icon: 'warning',
      text: "testimonial not added",
    })
    document.getElementById('id03').style.display = 'none'
    this.submitted = false

    this.ngOnInit()
  })
}
//close add form
onResetsss() {
  document.getElementById('id03').style.display = 'none'
  this.ngOnInit()
}
}
