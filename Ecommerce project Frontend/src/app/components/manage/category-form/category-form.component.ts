import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import category from '../../../models/ICategory';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.categoryService
        .getCategoryById(this.id)
        .subscribe((result: category) => {
          this.name = result.name;
          this.isEdit = true;
        });
    }
  }
  name!: string;
  id!: string;
  isEdit = false;
  add() {
    this.categoryService.addCategory(this.name).subscribe((result) => {
      console.log(result);
      alert('category added');
      this.router.navigateByUrl('/admin/categories');
    });
  }
  update() {
    console.log(this.id);
    this.categoryService
      .updateCategory(this.name, this.id)
      .subscribe((result) => {
        console.log(result);
        alert('Category updated');
        this.router.navigateByUrl('/admin/categories');
      });
  }
}
