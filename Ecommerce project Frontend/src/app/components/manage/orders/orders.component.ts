import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { order } from '../../../models/IOrder';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService, private router: Router) {}
  orders: order[] = [];
  ngOnInit(): void {
    this.orderService.getAdminOrders().subscribe(
      (result) => {
        this.orders = result;
        console.log(this.orders);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  redirectToShop(): void {
    this.router.navigate(['/admin']);
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
  statusChanged(status: any, order: order) {
    console.log(status.value);
    this.orderService.updateOrderStatus(order._id!, status.value).subscribe(
      (result) => {
        alert('Order Status updated');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
