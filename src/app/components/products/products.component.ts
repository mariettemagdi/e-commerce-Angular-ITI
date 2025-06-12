import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  searchTerm: string='';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  cartItemsCount:number=0;
  
  //constructor to inject service 
  constructor(private cartService:CartService,private router: Router){}
  ngOnInit():void{
    this.loadProducts();
  }
  private loadProducts():void{
    this.allProducts= [
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
  this.filteredProducts=[...this.allProducts];
  }

searchProducts():void{
  if(!this.searchTerm){
    //empty or undefined
    this.filteredProducts=[...this.allProducts];
    return;
  }
  this.filteredProducts=this.allProducts.filter(product =>product.title.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()));
}
addToCart(product:Product):void{
console.log('Adding product:', product);

this.cartService.addToCart(product);
 setTimeout(() => {
    this.router.navigate(['/cart']);
  }, 100);
  console.log('Current cart:', this.cartService.getCartItems());

this.updateCartCount();
}

private updateCartCount():void{
  this.cartItemsCount=this.cartService.getCartItems().length;
  // console.log(this.cartItemsCount)
}}
