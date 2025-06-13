import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  API_URL='http://localhost:3000'
  cartItemCount=0;
  isLoggedIn = false;
  isAdmin = false;


  constructor(private http: HttpClient, private router: Router,private cartService:CartService,private authService: AuthService) {}
  
  ngOnInit():void{
    this.cartService.cartCountObserve.subscribe(count=>{
      this.cartItemCount=count;
    })
    this.checkAuthStatus();
  }

  checkAuthStatus() : void {
    this.isLoggedIn=this.authService.isLoggedIn();
    this.isAdmin=this.authService.isAdmin();
  }

  logout(){
    this.authService.logout();
    this.checkAuthStatus();

  }
}