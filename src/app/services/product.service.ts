import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { forkJoin, map,delay, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl='http://localhost:3000';
  private productsUrl=`${this.apiUrl}/products`;
  private promotionalProducts=`${this.apiUrl}/promotionalProducts`;

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return forkJoin([
      this.http.get<Product[]>(`${this.productsUrl}`),
      this.http.get<any[]>(`${this.promotionalProducts}`)
    ]).pipe(
      map(([products, promotions]) => {
        return products.map(product => {
          const promo = promotions.find(p => p.productId === product.id);
          if (promo) {
            return {
              ...product,
              originalPrice: promo.originalPrice,
              discount: promo.discount,
              isPromotional: true,
              promoEndDate: promo.promoEndDate
            };
          }
          return product;
        });
      })
    );
  }

  getPromotionalProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.isPromotional))
    );
  }
  
  getProduct(id:number):Observable<Product>{
     return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.productsUrl,product);
  }

  updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`,product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }

}