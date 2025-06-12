import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
user={
  username:"mariette",
  email: "m@m.com",
  gender:"female",
  createdAt :"19-5-2025",
  orders:[
    {id:1,status:'accepted',item:'laptop'},
    {id:1,status:'pending',item:'phone'},
    {id:1,status:'rejected',item:'tablet'},

  ]
}
  // constructor(private authService: AuthService) {}
  cancelOrder(orderId:number){
    this.user.orders=this.user.orders.map(order => {
      if(order.id === orderId && order.status === 'pending'){
        return {...order,status:'cancelled'};
      }
      return order;
    })
  
  }
}
