import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import category from './../models/ICategory';
import { environment } from './../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(
      environment.apiUrl + '/category/getallcategories'
    );
  }
  getCategoryById(id: string): Observable<category> {
    return this.http.get<category>(
      environment.apiUrl + `/category/getcategory/${id}`
    );
  }
  addCategory(name: string) {
    return this.http.post(environment.apiUrl + '/category/addcategory', {
      name: name,
    });
  }
  updateCategory(name: string, id: string) {
    return this.http.put(
      environment.apiUrl + `/category/updatecategory/${id}`,
      {
        name: name,
      }
    );
  }
  deleteCategory(id: string) {
    return this.http.delete(
      environment.apiUrl + `/category/deletecategory/${id}`
    );
  }
}
