import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import product from '../../../models/IProduct';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'shortDescription',
    'price',
    'discount',
    'action',
  ];
  dataSource: MatTableDataSource<product>;
  products!: product[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private productservice: ProductService) {
    this.dataSource = new MatTableDataSource<product>([]);
  }
  ngOnInit(): void {
    this.getServerData();
  }
  private getServerData() {
    this.productservice.getProducts().subscribe((data) => {
      this.products = data; // Store the fetched categories
      this.dataSource.data = data;
      console.log(this.products);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id: string) {
    this.productservice.deleteProduct(id).subscribe((result) => {
      console.log(result);
      alert('product deleted');
      this.getServerData();
    });
  }
}
