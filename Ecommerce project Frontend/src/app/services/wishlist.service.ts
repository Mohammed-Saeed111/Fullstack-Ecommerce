import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import product from '../models/IProduct';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  wishlist: product[] = [];
  init() {
    return this.getWishList().subscribe(
      (result) => {
        this.wishlist = result;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
  getWishList(): Observable<product[]> {
    return this.http.get<product[]>(environment.apiUrl + '/customer/wishlists');
  }
  addInWishlist(productId: string) {
    return this.http.post(
      environment.apiUrl + `/customer/wishlists/${productId}`,
      {}
    );
  }
  removeFromWishlist(productId: string) {
    return this.http.delete(
      environment.apiUrl + `/customer/wishlists/${productId}`
    );
  }
}
