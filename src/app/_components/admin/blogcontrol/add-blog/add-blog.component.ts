import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../../../_services/dashboard.service';
import { ThemePalette } from '@angular/material/core';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
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
      ['insertImage'],['insertVideo']
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
  file
  files:any=[]
  images
  submitted = false;
  form:FormGroup
  constructor(private formBuilder: FormBuilder,
    private router: Router, public Service: DashboardService) { }

  ngOnInit() {
this.form= this.formBuilder.group({
  Upload: ['', Validators.required],
  Title: ['', Validators.required],
  Containuper: ['', Validators.required],
  Slider: ['', Validators.required],
  Containlower: ['', Validators.required],
  footer: ['', Validators.required],
})
  }
  get f() { return this.form.controls;}

  onSubmit()
  {
    this.submitted = true;
    // if (this.form.invalid) {
    // return;
    // }
if(this.form.value.Upload=="" || this.form.value.Title=="" || this.form.value.Containuper=="" || this.form.value.Slider=="" || this.form.value.Containlower=="" || this.form.value.footer=="" )
{

  swal.fire({
    icon: 'warning',
    text: "Please Fill All Field",
  })

}
else
{
  const formData = new FormData();
  formData.append('title', this.form.value.Title);
  formData.append('contentUpper',this.form.value.Containuper)
  formData.append('contentLower',this.form.value.Containlower)
  formData.append('footer',this.form.value.footer)

  

    formData.append('image', this.images)
  


    formData.append('sliderImage', this.files[0])
  


    console.log(this.form.value)


this.Service.postblog(formData).subscribe((res)=>{
   console.log(res)
   swal.fire({
    icon: 'success',
    text: "blog post succesfully",
  })
 this.submitted=false
 
this.ngOnInit()
},error=>{
  swal.fire({
    icon: 'warning',
    text: "blog not ",
  })
  this.submitted=false
 this.ngOnInit()
})
  
}


}
   

fileChangeEvent(event){
     this.images=""  
  if(event.target.files.length > 0){
    const file =event.target.files[0]
    this.images =file;
    }
} 
selectFile(event){
  if(event.target.files.length > 0){
     
    const file =event.target.files[0]
    this.file =file;
    this.files.push(this.file)
   console.log(this.file)  
    
  }
}

}
