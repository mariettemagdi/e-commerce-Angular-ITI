import { Injectable } from '@angular/core';
import { Product } from "../models/product.model"
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:Product[] = [];

  addToCart(product:Product):void{
    this.cartItems.push({...product})
    // console.log(this.cartItems)
  }
  getCartItems():Product[]{
    return [...this.cartItems];
  }
  removeFromCart(productId:number):void{
    this.cartItems=this.cartItems.filter(item=> item.id!==productId)
  }
  clearCart():void{
    this.cartItems=[];
  }
  getTotal():number{
    return this.cartItems.reduce((total,item)=>total+item.price,0)
  }
}
