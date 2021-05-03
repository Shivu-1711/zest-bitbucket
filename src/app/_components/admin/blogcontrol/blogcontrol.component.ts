import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-blogcontrol',
  templateUrl: './blogcontrol.component.html',
  styleUrls: ['./blogcontrol.component.css']
})
export class BlogcontrolComponent implements OnInit {
  rowData: any;
  response
  value
  values
  images
  blogviewdata: any = []
  id
  ids
  submitted = false;
  datas: any = []
  registerForm: FormGroup;
  imageURL
  editblogform: FormGroup;
  displayedColumns: string[] = [ 'title', 'Status', 'Actions'];
  color: ThemePalette = 'primary';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService) { }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById('uploadFile')).value = "";
    this.datas = []
    this.editblogform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      images: [null],
    });
    this.getallblog()
    this.registerForm = this.formBuilder.group({
      name: ['' , Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      email: ['', Validators.required],
       });

  }
  //image function for update
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editblogform.patchValue({
      images: file
    });
    this.editblogform.get('images').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }



  //edit blog form
  get a() { return this.editblogform.controls; }
  //edit blog submit
  onSubmits() {
    this.submitted = true;
    if (this.editblogform.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('email', this.a.email.value);
    formData.append('content', this.a.content.value)
    formData.append('title', this.a.title.value)
    formData.append('name', this.a.name.value)

    if (this.editblogform.value.images != null) {

      formData.append('image', this.editblogform.value.images)
    }

    formData.append('id', this.ids)

    this.Service.updateblog(formData).subscribe((res) => {

      swal.fire({
        icon: 'success',
        text: "blog updated",
      })
      document.getElementById('id02').style.display = 'none'
      this.submitted = false

      this.ngOnInit()
    }, error => {
      swal.fire({
        icon: 'warning',
        text: "blog not updated",
      })
      document.getElementById('id02').style.display = 'none'
      this.submitted = false

      this.ngOnInit()
    })
  }

  //allblog show
  getallblog() {
    this.Service.getallblogs().subscribe(res => {
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

  //blog status
  //status function
  status(data, id) {

    if (data == true) { this.value = "Deactive", this.values = "false" }
    else { this.value = "Active", this.values = "true" }
    swal.fire({
      title: 'Are you sure?',
      text: "You want to " + this.value + " this blog",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' + this.value + 'it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Service.blogstatuschange(id, this.values).subscribe((res => {
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
  //view blog
  view(data) {
    this.blogviewdata = data


    document.getElementById('id01').style.display = 'block'
  }
  //close view blog form
  onResets() {
    document.getElementById('id01').style.display = 'none'
  }
  //delete blog
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
        this.Service.deleteblog(id).subscribe((res => {
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
  //edit blog
  edit(data) {
    this.datas = data
    this.ids = this.datas.id
    this.imageURL = this.datas.imageUrl

    document.getElementById('id02').style.display = 'block'
  }
  //close edit blog form
  onResetss() {
    document.getElementById('id02').style.display = 'none'
    this.ngOnInit()
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
       
const formData = new FormData();
formData.append('email',this.f.email.value);
formData.append('content',this.f.content.value)
formData.append('title',this.f.title.value)
formData.append('name',this.f.name.value)
formData.append('image',this.images)
this.Service.postblog(formData).subscribe((res)=>{
  
  swal.fire({
    icon: 'success',
    text: "blog post succesfully after admin verify it show on website",
  })
 this.submitted=false
this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "blog not added due to extra blog content",
  })
  this.submitted=false
 this.ngOnInit()
})
}
fileChangeEvent(event){
       
  if(event.target.files.length > 0){
    const file =event.target.files[0]
    this.images =file;
    }
} 
onResetssss()
{
  document.getElementById('id05').style.display = 'none'
  this.submitted=false
  this.registerForm.reset()
}
addblogs()
{
  document.getElementById('id05').style.display = 'block'
}
configs: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Arial',
  toolbarHiddenButtons: [
    ['bold']
    ],
  customClasses: [
    {
      name: "quote",
      class: "quote",
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1",
    },
  ]
};
}
