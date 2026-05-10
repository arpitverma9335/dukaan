import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { HttpCustomService } from '../../services/http.service';
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';
import { DataCentreService } from '../../services/data-centre.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _http: HttpCustomService, private router: Router, private loginService: LoginService, private _popup: AlertService, private ds: DataCentreService) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  onLogin() {
    const username = this.loginForm.get('username')?.value as string;
    const password = this.loginForm.get('password')?.value as string;

    this._http.loginUser({ username, password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this._popup.showAlert('Login successful!');
        this.loginService.loadCredentials(response.token, response.user.username);
        this.ds.setCartQuantity(response.user.cartQuantity);
        // Optionally, navigate to the main page or show a success message
        this.router.navigate(['..', 'products']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this._popup.showError(error.error?.message || 'Failed to login. Please try again.');
      }
    });
  }
}
