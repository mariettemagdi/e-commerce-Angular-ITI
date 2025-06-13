import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

   isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
     
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      if (payload.exp && payload.exp < now) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
      return false;
    }
  }

  getUserRole(): string | null {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) return storedRole;
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    }catch(error){
        console.error('Error decoding token:', error);
       return null;
    }}

    
   isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}