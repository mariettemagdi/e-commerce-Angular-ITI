import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,NgClass,FormsModule ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
 registerForm:FormGroup;
 imagePreview:string | null =null;
 imageUrl:string |null =null; 
 imageApiKey ='a51a3174748da0660e015c935563ae87'

 constructor(
  private fb:FormBuilder,
  private toastr:ToastrService,
  private router:Router,
  private http: HttpClient

 ){
  this.registerForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required]],
    gender:['',[Validators.required]],
    role:['user',[Validators.required]]
  },{validator: this.passwordMatchValidator})
 }

 passwordMatchValidator(formGroup:FormGroup){
  const password=formGroup.get('password')?.value;
  const confirmPassword=formGroup.get('confirmPassword')?.value;
  return password===confirmPassword ? null : {mismatch:true }

 }
 showError(controlName:string):boolean{
  const control=this.registerForm.get(controlName);
  return !!control && control.invalid && (control.dirty || control.touched)
 }

   onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      const base64Image = (this.imagePreview as string).split(',')[1];
      this.uploadImageToImgBB(base64Image);
    };
    reader.readAsDataURL(file);
  }

  uploadImageToImgBB(base64Image: string) {
    const formData = new FormData();
    formData.append('key', this.imageApiKey);
    formData.append('image', base64Image);

    this.http.post<any>('https://api.imgbb.com/1/upload', formData).subscribe({
      next: (response) => {
        this.imageUrl = response.data.url;
        this.toastr.success('Image uploaded successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to upload image');
        console.error(err);
      }
    });
  }

onSubmit(){
  if(this.registerForm.valid){
    const { confirmPassword, ...userData}=this.registerForm.value;
    const registerationData={
    email:userData.email,
    password:userData.password,
    username: userData.name,
    gender:userData.gender,
    imageUrl:this.imageUrl || null,
    role:userData.role,
    createdAt: new Date(),          
    updatedAt: new Date() 

    };
    this.http.post('http://localhost:3000/register',registerationData).subscribe({
      next:(response:any)=>{
          localStorage.setItem('token', response.accessToken);
          this.toastr.success('Registeration Success');
          this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
        if(err.error?.error === 'Email Already Exists'){
          this.toastr.error('This email is already registered');
        }else{
          this.toastr.error('Registration failed. Please try again.');
        }
      }})
  
  }
  else{
    this.toastr.error('Please fix the form errors')
  }
 }

}
