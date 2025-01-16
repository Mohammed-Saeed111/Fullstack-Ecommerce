import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import brand from '../../../models/IBrand';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css',
})
export class BrandFormComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.brandService.getBrandById(this.id).subscribe((result: brand) => {
        this.name = result.name;
        this.isEdit = true;
      });
    }
  }
  name!: string;
  id!: string;
  isEdit = false;
  add() {
    this.brandService.addBrand(this.name).subscribe((result) => {
      console.log(result);
      alert('brand added');
      this.router.navigateByUrl('/admin/brands');
    });
  }
  update() {
    console.log(this.id);
    this.brandService.updateBrand(this.id, this.name).subscribe((result) => {
      console.log(result);
      alert('brand updated');
      this.router.navigateByUrl('/admin/brands');
    });
  }
}
