import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { order } from '../../models/IOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css',
})
export class CustomerOrdersComponent implements OnInit {
  orders: order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
    this.orderService.getCustomerOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Failed to fetch orders:', error);
      }
    );
  }
  redirectToShop(): void {
    this.router.navigate(['/']);
  }
  calculateSellingPrice(price: number, discount: number): number {
    return Math.round(price - (price * discount) / 100);
  }
  getOrderTotal(items: any[]): number {
    return items.reduce((total, item) => {
      return (
        total +
        this.calculateSellingPrice(item.product.price, item.product.discount) *
          item.quantity
      );
    }, 0);
  }
}
