import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import product from '../models/IProduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(
      environment.apiUrl + '/product/getproducts'
    );
  }
  getProductById(id: string): Observable<product> {
    return this.http.get<product>(
      environment.apiUrl + `/product/getproduct/${id}`
    );
  }
  addProduct(model: FormData) {
    return this.http.post(environment.apiUrl + '/product/addproduct', model);
  }
  updateProduct(id: string, model: FormData) {
    return this.http.put(
      environment.apiUrl + `/product/updateproduct/${id}`,
      model
    );
  }
  deleteProduct(id: string) {
    return this.http.delete(
      environment.apiUrl + `/product/deleteproduct/${id}`
    );
  }
}
