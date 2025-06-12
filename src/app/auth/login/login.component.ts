import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router,RouterModule  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
 })
export class LoginComponent {
  loginForm :FormGroup;
  errorMessage = '';
  private apiUrl = 'http://localhost:3000';


  constructor(
    private fb: FormBuilder,
    private router :Router,
    private http: HttpClient,

  ) {
    this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password:['',[Validators.required,Validators.minLength(6)]]
    });
  }
  showEmailErrors(): boolean{
    const emailControl= this.loginForm.get('email');
    return emailControl!.invalid && (emailControl!.dirty || emailControl!.touched)
  }
    showPasswordErrors(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl!.invalid && (passwordControl!.dirty || passwordControl!.touched);
  }

 async onSubmit(){
    if(this.loginForm.invalid){
     this.errorMessage = 'Please fill all fields correctly';
      return;
    }
    try{
      const response=await lastValueFrom(this.http.post<{accessToken:string}>('http://localhost:3000/login',{email: this.loginForm.value.email, password: this.loginForm.value.password }));
      localStorage.setItem('token',response.accessToken);
      this.router.navigate(['/']);
    }catch(error){
        this.errorMessage = 'Invalid email or password';
        console.log(error);
       
    }

  }
}
