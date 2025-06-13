import { Injectable } from '@angular/core';
import { Product } from "../models/product.model"
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:Product[] = [];
  private cartCount=new BehaviorSubject<number>(0);
  cartCountObserve=this.cartCount.asObservable();

  addToCart(product:Product):void{
    this.cartItems.push({...product})
    this.updateCartCount();
  }
  getCartItems():Product[]{
    return [...this.cartItems];
  }
  removeFromCart(productId:number):void{
    this.cartItems=this.cartItems.filter(item=> item.id!==productId);
    this.updateCartCount();

  }
  clearCart():void{
    this.cartItems=[];
    this.updateCartCount();

  }
  getTotal():number{
    return this.cartItems.reduce((total,item)=>total+item.price,0)
  }
  getCartCount():number{
    return this.cartItems.length;
  }
  private updateCartCount():void{
    this.cartCount.next(this.cartItems.length);
  }
}
