import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpCustomService } from '../../services/http.service';
import { Address } from '../../interfaces/interfaces';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isEditMode = false;
  addressForm!: FormGroup;

  addressData: Address = {
    userId: '',
    name: '',
    street: '', 
    city: '',
    state: '',
    country: '',
    zip: ''
  };

  constructor(private fb: FormBuilder, private _http: HttpCustomService, private _Popup: AlertService) { }

  ngOnInit(): void {
    this._http.fetchAddress().subscribe((response) => {
      if (response.success && response.address) {
        this.addressData = { ...response.address };
      }
    },
    (err) => {
      console.error('Error fetching address:', err);
      this._Popup.showError(err.error?.message || 'Failed to fetch address. Please try again.');
    });
    this.initForm();
  }

  initForm() {
    this.addressForm = this.fb.group({
      name: [this.addressData.name, Validators.required],
      street: [this.addressData.street, Validators.required],
      city: [this.addressData.city, Validators.required],
      state: [this.addressData.state, Validators.required],
      country: [this.addressData.country, Validators.required],
      zip: [this.addressData.zip, Validators.required]
    });
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.addressForm.reset(this.addressData); // Revert if cancelled
    }
  }

  onSave() {
    if (this.addressForm.valid) {
      this._http.saveAddress(this.addressForm.value).subscribe({
        next: (response) => {
          console.log('Updated in DB:', this.addressData);
          this._Popup.showAlert('Address updated successfully!');
          this.addressData = { ...this.addressForm.value };
          this.isEditMode = false;
        },
        error: (err) => {
          this._Popup.showError(err.error?.message || 'Failed to save address. Please try again.');
        }
      })
    } else {
      console.warn('Form is invalid');
    }
  }
}
