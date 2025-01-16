import { Component, OnInit } from '@angular/core';
import category from '../../models/ICategory';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: category[] = [];
  isLoggedIn = false;
  userName: string | null = null;
  isAdmin = false;
  searchTerm!: string;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchCategories();
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin = this.authService.isAdmin;
    this.userName = this.isLoggedIn ? this.authService.userName : null;
  }

  fetchCategories(): void {
    this.customerService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
    this.categories = [];
    this.router.navigateByUrl('/login');
  }

  searchCategory(id: string): void {
    this.searchTerm = '';
    this.router.navigateByUrl('/products?categoryId=' + id);
  }

  onSearch(event: any): void {
    if (event.target.value) {
      this.router.navigateByUrl('/products?search=' + event.target.value);
    }
  }
}
