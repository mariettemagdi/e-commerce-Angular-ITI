import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   promotionalProducts:Product[]=[];
   isLoading:boolean=false;


   ngOnInit(): void {
  // Uncomment the line below to test without API
  this.isLoading=true
  setTimeout(()=>{
    this.promotionalProducts=this.getMockProducts();
    this.isLoading=false;
  },800);
  }
  private getMockProducts(): Product[] {
    return this.promotionalProducts = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 59.99,
      originalPrice: 89.99,
      discount: 33,
      image: 'images/online-banner.jpg',
      details: 'Noise-cancelling wireless headphones with 20-hour battery life.'
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      image: 'images/online-banner.jpg',
      details: 'Fitness tracker with heart-rate monitor and sleep analysis.'
    },
    {
      id: 3,
      title: 'Gaming Mouse',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      image: 'images/online-banner.jpg',
      details: 'Ergonomic gaming mouse with customizable buttons.'
    }
  ];
  }

calculateDiscount(originalPrice:number,salePrice:number):number{
  return Math.round(((originalPrice - salePrice)/originalPrice)*100)
}
}