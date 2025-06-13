import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
   promotionalProducts:Product[]=[];
   isLoading:boolean=false;
   error: string | null = null;

   constructor(private productService:ProductService){}


  ngOnInit(): void {
   this.loadPromotionalProducts();
  }
  private loadPromotionalProducts():void {
     this.isLoading = true;
     this.error = null;

     this.productService.getPromotionalProducts().subscribe({
      next:(products)=>{
        this.promotionalProducts = products;
        this.isLoading = false;
      },
      error:(err)=>{
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }})
  }
  


calculateDiscount(originalPrice:number,salePrice:number):number{
  return Math.round(((originalPrice - salePrice)/originalPrice)*100)
}
}