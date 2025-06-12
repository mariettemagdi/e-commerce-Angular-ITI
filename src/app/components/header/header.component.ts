import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  API_URL='http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {}

 logout(){
   localStorage.removeItem('token');
    this.router.navigate(['/login']);

}
}