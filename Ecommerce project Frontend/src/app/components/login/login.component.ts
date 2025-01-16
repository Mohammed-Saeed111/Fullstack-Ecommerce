import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]], 
  });

  // دالة للتعامل مع عملية تسجيل الدخول
  login() {
    let value = this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe(
      (result: any) => {
        console.log(result);
        // تخزين الـ token وبيانات المستخدم في localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        // التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error(error);
        // إظهار رسالة خطأ عند فشل تسجيل الدخول
        alert("Invalid email or password!");
      }
    );
  }
}
