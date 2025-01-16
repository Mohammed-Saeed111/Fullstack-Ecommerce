import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import product from '../../models/IProduct';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: product;
  mainImage: string = '';
  similarProducts: product[] = [];
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.customerService.getProductById(id).subscribe(
      (result) => {
        this.product = result;
        this.mainImage = this.product.images[0];
        this.loadSimilarProducts(result.categoryId);
      },
      (error) => {
        console.error(error);
      }
    );
    this.wishlistService.init();
  }

  setMainImage(image: string) {
    this.mainImage = image;
  }
  loadSimilarProducts(categoryId: string) {
    this.customerService
      .getProducts('', categoryId, 'name', 1, '', 1, 4)
      .subscribe(
        (products) => {
          console.log(products);
          this.similarProducts = products.filter(
            (p) => p._id !== this.product._id
          );
        },
        (error) => {
          console.error(error);
        }
      );
  }
  addToWishlist(product: product) {
    console.log(product);
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
