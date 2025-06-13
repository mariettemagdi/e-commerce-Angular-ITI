import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent {
products: Product[] = [];
searchText= '';
showForm=false;
isEditing=false;
isLoading = false;
error: string | null = null;

newProduct: Product = { 
    id: 0, 
    title: '', 
    price: 0, 
    image: '', 
    details: '',
    category: '',
    stock: 0
  };

constructor(private productService: ProductService) {}

 ngOnInit(): void {
    this.loadProducts();
  }
loadProducts():void{
   this.isLoading = true;
    this.error = null;
    this.productService.getAllProducts().pipe(
      catchError(err => {
        this.error = 'Failed to load products';
        console.error(err);
        return of([]);
      })
    ).subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
}

get filteredProducts(){
  return this.products.filter(product =>product.title.toLowerCase().includes(this.searchText.toLowerCase()))
}
 saveProduct() {
  if(this.isEditing){
    this.productService.updateProduct(this.newProduct).subscribe({
        next:()=>{
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Failed to update product';
          console.error(err);
        }
    });
  }
  else{
    //save product
    this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => {
          this.error = 'Failed to add product';
          console.error(err);
        }
      });
    }
}

 cancelEdit(){
  //RESET 
 this.newProduct = { 
      id: 0, 
      title: '', 
      price: 0, 
      image: '', 
      details: '',
      category: '',
      stock: 0
    };
    this.isEditing = false;
    this.showForm = false;
    this.error = null;

 }

 editProduct(product:Product){
  this.newProduct={...product};
  this.isEditing=true;
  this.showForm=true;
 }
 deleteProduct(id:number){
  if(confirm("Are you sure dio you want to delete this product?")){
    this.productService.deleteProduct(id).subscribe({
      next:()=>{
        this.loadProducts();
      },
      error:(err)=>{
        this.error = 'Failed to delete product';
          console.error(err);
      }
    })
  }
 }
}
