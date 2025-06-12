import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  constructor(public cartService:CartService,private toastr: ToastrService
){ console.log('cart items ',this.cartService.getCartItems())
  }

  removeItem(productId:number){
    this.cartService.removeFromCart(productId);
  }
  checkout():void{
    this.toastr.success('Order placed Successfully')
    this.cartService.clearCart();
  }
}
