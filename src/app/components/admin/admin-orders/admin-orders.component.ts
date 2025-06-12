import { Component } from '@angular/core';
import { Order } from '../../../models/order.model';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styles: ``
})
export class AdminOrdersComponent {
orders:Order[]=[];
filteredOrders:Order[]=[];
statusFilter:string='all';
loading=true;

  // constructor(private orderService: OrderService) {}

ngOnInit(){
  this.loadMockOrders();
}
private generateId(prefix:string): string{
  return prefix + Math.random().toString(36).substring(2,10);
}

loadMockOrders(){
      this.loading = true;
       setTimeout(() => {
      this.orders = [
        {
          id: this.generateId('ord-'),
          userId: this.generateId('user-'),  // Added userId
          username: 'John Doe',
          date: new Date('2023-05-15'),
          items: [
              { 
              productId: this.generateId('prod-'),
              title: 'Wireless Headphones', 
              quantity: 1, 
              price: 99.99 
            },
            { 
              productId: this.generateId('prod-'),
              title: 'USB-C Cable', 
              quantity: 2, 
              price: 12.99 
            }   ],
          totalPrice: 125.97,
          status: 'pending'
        },
        {
          id: this.generateId('ord-'),
          userId: this.generateId('user-'),  // Added userId
          username: 'Jane Smith',
          date: new Date('2023-05-10'),
          items: [
            { 
              productId: this.generateId('prod-'),
              title: 'Smartphone Case', 
              quantity: 1, 
              price: 24.99 
            },
            { 
              productId: this.generateId('prod-'),
              title: 'Screen Protector', 
              quantity: 1, 
              price: 9.99 
            }
          ],
          totalPrice: 34.98,
          status: 'accepted'
        },
        {
          id: this.generateId('ord-'),
          userId: this.generateId('user-'),  // Added userId
          username: 'Robert Johnson',
          date: new Date('2023-05-05'),
          items: [
            { 
              productId: this.generateId('prod-'),
              title: 'Bluetooth Speaker', 
              quantity: 1, 
              price: 59.99 
            },
            { 
              productId: this.generateId('prod-'),
              title: 'AA Batteries (4-pack)', 
              quantity: 1, 
              price: 5.99 
            }
          ],
          totalPrice: 65.98,
          status: 'rejected'
        }
      ];

      this.filteredOrders = [...this.orders];
      this.loading = false;
    }, 800); // Simulate network delay
  }


filterOrders(filterStatus: string):void{

  this.statusFilter=filterStatus;
  this.filteredOrders= filterStatus === "all" ?[...this.orders]:this.orders.filter(order=>order.status===filterStatus)

}
updateOrderStatus(orderId:String,newStatus :'accepted' | 'rejected'){


//     this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
//       next: () => {
//         const order = this.orders.find(o => o.id === orderId);
//         if (order) order.status = newStatus;
//         this.filterOrders(this.statusFilter);
//       },
//       error: (err) => console.error('Error updating order', err)
//     });

const order=this.orders.find(o=>o.id===orderId);
if(order){
  order.status=newStatus;
  this.filterOrders(this.statusFilter)
}
  
 }

}
