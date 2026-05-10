import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/interfaces';
import { HttpCustomService } from '../../../services/http.service';
import { AlertService } from '../../../services/alert.service';
import { CommonModule } from '@angular/common';
import { DataCentreService } from '../../../services/data-centre.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private _http: HttpCustomService, private _popup: AlertService, private ds: DataCentreService) {}

  @Input('product') product!: Product;

  addItemToCart() {
    this._http.updateItemInCart(this.product._id, 1).subscribe({
      next: (response) => {
        console.log('Item added to cart:', response);
        this.product.existsInCart = true; // Update the product's cart status
        this.ds.setCartQuantity(response.cart.totalItems);
        this._popup.showAlert('Item added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        this._popup.showError(error.error?.message || 'Failed to add item to cart. Please try again.');
      }
    });
  }

  removeItemFromCart() {
    this._http.removeItemInCart(this.product._id).subscribe({
      next: response => {
        this.product.existsInCart = false; // Update the product's cart status
        this.ds.setCartQuantity(response.cart.totalItems);
        this._popup.showAlert('Item removed from cart successfully!');
      },
      error: error => {
        console.error('Error removing item to cart:', error);
        this._popup.showError(error.error?.message || 'Failed to remove item from cart. Please try again.');
      }
    })
  }
}
