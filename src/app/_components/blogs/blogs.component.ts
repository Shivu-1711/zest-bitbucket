import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../../_services/homepage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { of } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { DashboardService } from '../../_services/dashboard.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  allblogs
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  images
 
  constructor(public Service : HomepageService,private formBuilder: FormBuilder,
   ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['' , Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      email: ['', Validators.required],
       });
    this.allblog()
    
    }
      get f() { return this.registerForm.controls; }
      fileChangeEvent(event){
       
        if(event.target.files.length > 0){
          const file =event.target.files[0]
          this.images =file;
          }
   } 
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

  //get all blog
allblog()
{
  this.Service.getallblogs().subscribe(res=>{
    this.allblogs=res.response
    console.log(this.allblogs)
   },error=>{
    this.allblogs=[]
    })
   

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
}



