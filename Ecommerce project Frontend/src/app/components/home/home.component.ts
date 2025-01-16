import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import product from '../../models/IProduct';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private wishlist: WishlistService,
    private cartService: CartService
  ) {}
  newProducts: product[] = [];
  featuredProducts: product[] = [];
  brandsImages: product[] = [];
  ngOnInit(): void {
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      console.log(this.newProducts);
      this.brandsImages.push(...result);
    });
    this.customerService.getfeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log(this.featuredProducts);
      this.brandsImages.push(...result);
    });
    this.wishlist.init();
    this.cartService.init();
  }
}
