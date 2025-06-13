import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
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
  isLoading = false;

  
  //constructor to inject service 
  constructor(private cartService:CartService,private router: Router, private productService:ProductService){}
  ngOnInit():void{
    this.loadProducts();
  }
 loadProducts():void{
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next:(products)=>{
        console.log('Products loaded:', products);
        this.allProducts=products;
        this.filteredProducts = [...products];
        this.isLoading=false;
        console.log('Merged products:', products);
      },
      error: (err)=>{
        console.error('Failed to load products:', err);
        this.isLoading = false;
      }
    })
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
