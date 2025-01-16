import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import brand from '../../../models/IBrand';
import { BrandService } from '../../../services/brand.service';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<brand>;
  category!: brand[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private barandService: BrandService) {
    this.dataSource = new MatTableDataSource<brand>([]);
  }
  id!: string;
  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData() {
    this.barandService.getBrands().subscribe((data) => {
      this.category = data; // Store the fetched categories
      this.dataSource.data = data;
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
    this.barandService.deleteBrand(id).subscribe((result) => {
      console.log(result);
      alert('brand deleted');
      this.getServerData();
    });
  }
}
