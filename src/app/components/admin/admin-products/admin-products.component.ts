import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent {
//dummy data 
products: Product[] = [
    { id: 1, title: 'T-Shirt', price: 19.99, image: 'images/avatar.png', details: 'Comfortable cotton t-shirt' },
    { id: 2, title: 'Coffee Mug', price: 9.99, image: '', details: 'Ceramic coffee mug' }
  ];

searchText= '';
showForm=false;
isEditing=false;
newProduct:Product={id: 0, title: '', price: 0, image: '', details: ''}

get filteredProducts(){
  return this.products.filter(product =>product.title.toLowerCase().includes(this.searchText.toLowerCase()))
}
 saveProduct() {
  if(this.isEditing){
    const index=this.products.findIndex(product =>product.id===this.newProduct.id);
    this.products[index]={...this.newProduct}
  }
  else{
    //save product
    this.newProduct.id=this.products.length+1;
    this.products.push({...this.newProduct})
  }
  this.showForm = false;
 }

 cancelEdit(){
  //RESET 
    this.newProduct = { id: 0, title: '', price: 0, image: '', details: '' };
    this.isEditing = false;
    this.showForm = false;
 }

 editProduct(product:Product){
  this.newProduct={...product};
  this.isEditing=true;
  this.showForm=true;
 }
 deleteProduct(id:number){
  if(confirm("Are you sure dio you want to delete this product?")){
    this.products=this.products.filter(product=>product.id !== id);
    this.showForm = false
  }
 }
}
