import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { HomeComponent } from './components/home/home.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin-guard.guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authenticationGuard] },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/:id',
    component: CategoryFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands',
    component: BrandsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'orders',
    component: CustomerOrdersComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'profile',
    component: CustomerProfileComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
