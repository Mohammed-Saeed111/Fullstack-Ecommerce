import { Component, Input, input } from '@angular/core';
import product from '../../models/IProduct';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: product;
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}
  addToWishlist(product: product) {
    if (this.isInWishlist(product)) {
      this.wishlistService.removeFromWishlist(product._id!).subscribe(
        (result) => {
          this.wishlistService.init();
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      this.wishlistService.addInWishlist(product._id!).subscribe(
        (result) => {
          this.wishlistService.init();
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }
  isInWishlist(product: product) {
    let isExist = this.wishlistService.wishlist.find(
      (x) => x._id === product._id
    );
    if (isExist) return true;
    else return false;
  }
  addToCart(product: product) {
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(
        (result) => {
          this.cartService.init();
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(
        (result) => {
          this.cartService.init();
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }
  isProductInCart(productId: string) {
    let isExist = this.cartService.items.find(
      (x) => x.product._id === productId
    );
    if (isExist) return true;
    else return false;
  }
}
