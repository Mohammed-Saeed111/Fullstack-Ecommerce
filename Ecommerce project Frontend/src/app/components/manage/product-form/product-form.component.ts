import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import category from '../../../models/ICategory';
import brand from '../../../models/IBrand';
import { ActivatedRoute, Router } from '@angular/router';
import product from '../../../models/IProduct';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: category[] = [];
  brands: brand[] = [];
  id!: string;
  deletedImages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      shortDescription: [null, [Validators.required, Validators.minLength(5)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      price: [null, [Validators.required]],
      discount: [null],
      images: this.formBuilder.array([]),
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],
      isFeatured: [false],
      isNewProduct: [false],
    });
  }

  ngOnInit(): void {
    this.addImage(); // Add one empty image field by default.

    // Load categories and brands.
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    // Check for edit mode.
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productService
        .getProductById(this.id)
        .subscribe((result: product) => {
          this.productForm.patchValue({
            name: result.name,
            shortDescription: result.shortDescription,
            description: result.description,
            price: result.price,
            discount: result.discount,
            categoryId: result.categoryId,
            brandId: result.brandId,
            isFeatured: result.isFeatured,
            isNewProduct: result.isNewProduct,
          });

          this.images.clear();

          if (result.images && result.images.length > 0) {
            result.images.forEach((image) => {
              this.images.push(this.formBuilder.control(image));
            });
          }
        });
    }
  }

  isFile(image: any): boolean {
    return image && image instanceof File;
  }

  addImage() {
    if (this.images.length >= 5) {
      alert('You can only add up to 5 images.');
      return;
    }
    this.images.push(this.formBuilder.control(null));
  }

  removeImage(index: number) {
    const imageControl = this.images.at(index);
    if (!this.isFile(imageControl.value)) {
      this.deletedImages.push(imageControl.value);
    }
    this.images.removeAt(index);
  }

  handleFileInput(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      (this.images.at(index) as any).setValue(file);
    }
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, this.productForm.get(key)?.value);
      }
    });

    this.images.controls.forEach((control) => {
      if (control.value instanceof File) {
        formData.append('images', control.value, control.value.name);
      }
    });
    console.log(formData);
    this.productService.addProduct(formData).subscribe(
      (response) => {
        alert('Product added successfully!');
        this.router.navigateByUrl('/admin/products');
      },
      (error) => {
        alert('Failed to add product.');
      }
    );
  }

  updateProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();

    // Ensure isFeatured and isNew are set to false if they are unchecked
    const formValues = {
      ...this.productForm.value,
      isFeatured: this.productForm.get('isFeatured')?.value || false,
      isNew: this.productForm.get('isNew')?.value || false,
    };

    Object.keys(formValues).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, formValues[key]);
      }
    });

    this.images.controls.forEach((control) => {
      if (control.value instanceof File) {
        formData.append('images', control.value, control.value.name);
      }
    });

    if (this.deletedImages.length > 0) {
      formData.append('deletedImages', JSON.stringify(this.deletedImages));
    }

    this.productService.updateProduct(this.id, formData).subscribe(
      (response) => {
        alert('Product updated successfully!');
        this.router.navigateByUrl('/admin/products');
      },
      (error) => {
        alert('Failed to update product.');
        console.error(error);
      }
    );
  }
}
