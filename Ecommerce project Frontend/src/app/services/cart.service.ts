import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import cart from '../models/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  items: cart[] = [];
  init() {
    return this.getCartItems().subscribe(
      (result) => {
        this.items = result;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
  getCartItems(): Observable<cart[]> {
    return this.http.get<cart[]>(environment.apiUrl + '/customer/carts');
  }
  addToCart(productId: string, quantity: number) {
    return this.http.post(environment.apiUrl + `/customer/carts/${productId}`, {
      quantity: quantity,
    });
  }
  removeFromCart(productId: string) {
    return this.http.delete(
      environment.apiUrl + `/customer/carts/${productId}`
    );
  }
}
