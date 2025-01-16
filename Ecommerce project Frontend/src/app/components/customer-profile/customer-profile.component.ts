import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css',
})
export class CustomerProfileComponent {
  constructor(private authservice: AuthService) {}
  name = this.authservice.userName;
  email = this.authservice.userEmail;
}
