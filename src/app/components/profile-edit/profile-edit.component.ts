import { Component } from '@angular/core';
import { FormGroup ,FormBuilder, Validators ,ReactiveFormsModule} from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profile-edit.component.html',
  styles: ``
})
export class ProfileEditComponent {
profileForm!:FormGroup;
isSubmitting=false;
user:User={
  id:1,
  username:"Mariette",
  email:"m@m.com",
  createdAt: new Date("2025-05-01"),
  updatedAt: new Date("2025-05-25"),
  role: "user", 
  gender: "female",
  imageUrl: "", 
  password: "", 
}
imagePreview:string | null = null;
//auth service
constructor(private fb:FormBuilder,private router:Router){
this.profileForm=this.fb.group({
  username:['',[Validators.required,Validators.minLength(3)]],
  email:['',[Validators.required,Validators.email]],
  gender:[''],
  password:['',[Validators.minLength(6)]],
  image:[null]
});
}
ngOnInit():void{
  // this.user=this.authService.getCurrentUser();
  if(this.user){
    this.profileForm.patchValue({
      username:this.user.username,
      email:this.user.email,
      gender:this.user.gender
    })
    this.imagePreview = this.user.imageUrl || null;
  }

}

onFileChange(event:Event):void{
   const input=event.target as HTMLInputElement;
   if(input.files && input.files.length){
    const file= input.files[0];
    this.profileForm.patchValue({image:file});
    this.profileForm.get('image')?.updateValueAndValidity();

    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);
   }
}
navigateToProfile(){
  this.router.navigate(['/profile']);
     console.log("navugated")

}
onSubmit(){
 if(this.profileForm.invalid ){
  return;
 }

 this.isSubmitting=true;
 const formData=new FormData();
 formData.append('username',this.profileForm.value.username);
 formData.append('email',this.profileForm.value.email);
 formData.append('gender',this.profileForm.value.gender);

 if(this.profileForm.value.image){
  formData.append('image',this.profileForm.value.image);
 }
 if(this.profileForm.value.password){
  formData.append('password',this.profileForm.value.password);
 }

 setTimeout(()=>{
      //   this.authService.updateCurrentUser({
      //   ...this.user!,
      //   username: this.profileForm.value.username,
      //   email: this.profileForm.value.email,
      //   gender: this.profileForm.value.gender,
      //   imageUrl: this.imagePreview || this.user?.imageUrl
      // });

      //to be remived after api 
      this.user={
        ...this.user,
        username:this.profileForm.value.username,
        email:this.profileForm.value.email,
        gender:this.profileForm.value.gender,
        imageUrl:this.imagePreview || this.user.imageUrl,
        updatedAt:new Date(),
        password:this.profileForm.value.password || this.user.password
      }
      console.log(this.user)
      this.isSubmitting=false;
     this.navigateToProfile();

 },1000);
}

}


// 4. Update Auth Service (auth.service.ts)
// Add this method to your existing AuthService:

// typescript
// updateCurrentUser(updatedUser: User): void {
//   this.currentUserSubject.next(updatedUser);
//   localStorage.setItem('currentUser', JSON.stringify(updatedUser));
// }