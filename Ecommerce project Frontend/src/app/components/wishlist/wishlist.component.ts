import { Component, OnInit } from '@angular/core';
import product from '../../models/IProduct';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlist: product[] = [];
  constructor(public wishlistService: WishlistService) {}
  ngOnInit(): void {
    this.wishlistService.init();
  }
}
