import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import product from '../../models/IProduct';
import { ActivatedRoute } from '@angular/router';
import brand from '../../models/IBrand';
import category from '../../models/ICategory';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  products: product[] = [];
  page = 1;
  pageSize = 6;
  brands: brand[] = [];
  categories: category[] = [];
  ngOnInit(): void {
    this.customerService.getCategories().subscribe(
      (result) => {
        this.categories = result;
      },
      (error) => {
        console.error(error);
      }
    );
    this.customerService.getBrands().subscribe(
      (result) => {
        this.brands = result;
      },
      (error) => {
        console.error(error);
      }
    );
    this.route.queryParams.subscribe((x: any) => {
      this.searchTerm = x.search || '';
      this.categoryId = x.categoryId || '';
      console.log(x.search);
      this.getProduct();
    });
  }
  getProduct() {
    setTimeout(() => {
      this.customerService
        .getProducts(
          this.searchTerm,
          this.categoryId,
          this.sortBy,
          this.sortOrder,
          this.brandId,
          this.page,
          this.pageSize
        )
        .subscribe(
          (result) => {
            this.products = result;
            if (result.length < this.pageSize) {
              this.isNext = false;
            }
          },
          (error) => {
            console.error(error);
          }
        );
    }, 1000);
  }
  orderChange(e: any) {
    this.sortBy = 'price';
    this.sortOrder = e;
    this.getProduct();
  }
  isNext = true;
  pageChange(page: number) {
    this.page = page;
    this.isNext = true;
    this.getProduct();
  }
}
