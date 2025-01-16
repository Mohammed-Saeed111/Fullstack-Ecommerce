import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import product from '../models/IProduct';
import { environment } from '../../environments/environment.development';
import category from '../models/ICategory';
import brand from '../models/IBrand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  getNewProducts(): Observable<product[]> {
    return this.http.get<product[]>(
      environment.apiUrl + '/customer/home/new-products'
    );
  }
  getfeaturedProducts(): Observable<product[]> {
    return this.http.get<product[]>(
      environment.apiUrl + '/customer/home/featured-product'
    );
  }
  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(
      environment.apiUrl + '/customer/categories'
    );
  }
  getBrands(): Observable<brand[]> {
    return this.http.get<brand[]>(environment.apiUrl + '/customer/brands');
  }
  getProducts(
    searchTerm: string,
    categoryId: string,
    sortBy: string,
    sortOrder: number,
    brandId: string,
    page: number,
    pageSize: number
  ): Observable<product[]> {
    return this.http.get<product[]>(
      environment.apiUrl +
        `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`
    );
  }
  getProductById(id: string): Observable<product> {
    return this.http.get<product>(
      environment.apiUrl + `/customer/product/${id}`
    );
  }
}
