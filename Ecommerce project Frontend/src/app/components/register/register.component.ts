

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], 
  });

  // دالة للتعامل مع عملية التسجيل
  register() {
    if (this.registerForm.valid) {
      let value = this.registerForm.value;
      this.authService
        .register(value.name!, value.email!, value.password!)
        .subscribe(
          (result) => {
            console.log(result);
            alert('User registered successfully');
            this.router.navigateByUrl('/login');
          },
          (error) => {
            alert('Failed to register user');
            console.error(error);
          }
        );
    } else {
      alert('Please fill in all required fields correctly!');
    }
  }
}

