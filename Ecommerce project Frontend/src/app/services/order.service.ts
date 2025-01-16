import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from './../models/IOrder';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  addOrder(order: order) {
    return this.http.post(environment.apiUrl + '/customer/order', order);
  }
  getCustomerOrders(): Observable<order[]> {
    return this.http.get<order[]>(environment.apiUrl + '/customer/orders');
  }
  getAdminOrders(): Observable<order[]> {
    return this.http.get<order[]>(environment.apiUrl + '/orders');
  }
  updateOrderStatus(id: string, status: string) {
    return this.http.post(environment.apiUrl + `/orders/${id}`, {
      status: status,
    });
  }
}
