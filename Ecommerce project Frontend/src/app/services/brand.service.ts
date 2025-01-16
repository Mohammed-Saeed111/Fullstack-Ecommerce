import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import brand from '../models/IBrand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}
  getBrands(): Observable<brand[]> {
    return this.http.get<brand[]>(environment.apiUrl + '/brand/getallbrands');
  }
  getBrandById(id: string): Observable<brand> {
    return this.http.get<brand>(environment.apiUrl + `/brand/getbrand/${id}`);
  }
  addBrand(name: string) {
    return this.http.post(environment.apiUrl + '/brand/addbrand', {
      name: name,
    });
  }
  updateBrand(id: string, name: string) {
    return this.http.put(environment.apiUrl + `/brand/updatebrand/${id}`, {
      name: name,
    });
  }
  deleteBrand(id: string) {
    return this.http.delete(environment.apiUrl + `/brand/deletebrand/${id}`);
  }
}
