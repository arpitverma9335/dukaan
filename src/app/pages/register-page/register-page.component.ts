import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpCustomService } from '../../services/http.service';
import { AlertService } from '../../services/alert.service';

interface RegistrationPayload {
  username: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

  constructor(private _http: HttpCustomService, private router: Router, private _Popup: AlertService) {}

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    // Initialization logic can be added here if needed
  }

  onSubmit() {
    const payload = { ...this.registrationForm.value };

    this._http.registerUser(payload as RegistrationPayload).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this._Popup.showAlert('Registration successful! Please login to continue.');
        // Optionally, navigate to the login page or show a success message
        this.router.navigate(['..', 'login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this._Popup.showError(error.error?.message || 'Failed to register user. Please try again.');
        // Optionally, show an error message to the user
      }
    })
  }
}
