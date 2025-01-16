import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import cart from '../../models/ICart';
import product from '../../models/IProduct';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { order } from '../../models/IOrder';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    public CartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {}
  paymentMethod = 'cash';
  addressForm = this.formBuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode: [''],
  });
  ngOnInit(): void {
    this.CartService.init();
    this.calculatePrices();
    console.log(this.CartService.items);
  }
  redirectToShop() {
    this.router.navigateByUrl('/');
  }
  calculatePrices(): void {
    this.CartService.items.forEach((item: any) => {
      item.discount = item.discount || 0;
      item.finalPrice = item.price - (item.price * item.discount) / 100;
    });
  }
  getTotal(): number {
    return this.CartService.items.reduce((total: number, item: any) => {
      return total + item.finalPrice * item.quantity;
    }, 0);
  }
  CartItems(): cart[] {
    return this.CartService.items;
  }
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  incrementQuantity(item: any) {
    item.quantity++;
  }
  sellingPrice(product: product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }
  addToCart(productId: string, quantity: number) {
    this.CartService.addToCart(productId, quantity).subscribe(
      (result) => {
        this.CartService.init();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  get totalAmount() {
    let amount = 0;
    for (let i = 0; i < this.CartService.items.length; i++) {
      const element = this.CartService.items[i];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }
  orderStep: number = 0;
  checkOut() {
    this.orderStep = 1;
  }
  addAddress() {
    this.orderStep = 2;
  }
  completeOrder() {
    let order: order = {
      items: this.CartItems(),
      paymentType: this.paymentMethod,
      address: this.addressForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };
    this.orderService.addOrder(order).subscribe(
      (result) => {
        alert('Your order is complete');
        this.CartService.init();
        this.orderStep = 0;
        this.router.navigateByUrl('/orders');
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(order);
  }
}
