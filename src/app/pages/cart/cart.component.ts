import { Component, OnInit } from '@angular/core';
import { HttpCustomService } from '../../services/http.service';
import { catchError, map, Observable } from 'rxjs';
import { Cart } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { DataCentreService } from '../../services/data-centre.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _http: HttpCustomService, private router: Router, private _popup: AlertService, private ds: DataCentreService) {}

  cart!: Cart;

  ngOnInit() {
    this._http.getCart().subscribe({
      next: response => {
        this.cart = response.cart;
      },
      error: error => {
        this._popup.showError(error.error?.message);
      }
    });
  }

  addItemToCart(productId: string) {
    this._http.updateItemInCart(productId, 1).subscribe({
      next: ({ cart: data }) => {
        // 1. Update global totals
        this.cart.totalItems = data.totalItems;
        this.cart.totalPrice = data.totalPrice;
        this.ds.setCartQuantity(data.totalItems);

        // 2. Find the index of the item to update/remove
        const itemIndex = this.cart.items.findIndex(it => it.productId._id === productId);
        if (itemIndex === -1) return;

        // 3. Find the updated state from the server response
        const updatedItem = data.items.find(it => it.productId._id === productId);

        if (updatedItem) {
          // Update existing item safely
          this.cart.items[itemIndex] = { ...updatedItem };
        } else {
          // If server doesn't return the item, it was likely removed (qty 0)
          this.cart.items.splice(itemIndex, 1);
        }
      },
      error: (error) => {
        // Uses the flattened error message from your improved middleware
        this._popup.showError(error.error?.message || 'Failed to update cart');
      }
    });
  }

  reduceItemFromCart(productId: string) {
    this._http.updateItemInCart(productId, -1).subscribe({
      next: ({ cart: data }) => {
        // 1. Update global totals
        this.cart.totalItems = data.totalItems;
        this.cart.totalPrice = data.totalPrice;
        this.ds.setCartQuantity(data.totalItems);

        // 2. Find the index of the item to update/remove
        const itemIndex = this.cart.items.findIndex(it => it.productId._id === productId);
        if (itemIndex === -1) return;

        // 3. Find the updated state from the server response
        const updatedItem = data.items.find(it => it.productId._id === productId);

        if (updatedItem) {
          // Update existing item safely
          this.cart.items[itemIndex] = { ...updatedItem };
        } else {
          // If server doesn't return the item, it was likely removed (qty 0)
          this.cart.items.splice(itemIndex, 1);
        }
      },
      error: (error) => {
        // Uses the flattened error message from your improved middleware
        this._popup.showError(error.error?.message || 'Failed to update cart');
      }
    });
  }

  removeItemFromCart(productId: string) {
    this._http.removeItemInCart(productId).subscribe({
      next: response => {
        const itemIndex = this.cart.items.findIndex(it => it.productId._id === productId);
        if (itemIndex === -1) return;

        this.cart.items.splice(itemIndex, 1);
        this.cart.totalItems = response.cart.totalItems;
        this.ds.setCartQuantity(response.cart.totalItems);
        this.cart.totalPrice = response.cart.totalPrice;
        this._popup.showAlert('Item removed from cart successfully!');
      },
      error: error => {
        console.error('Error removing item to cart:', error);
        this._popup.showError(error.error?.message || 'Failed to remove item from cart. Please try again.');
      }
    })
  }

  placeOrder() {
    this._http.placeOrder().subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.ds.setCartQuantity(0);
        this.router.navigate(['..', 'orders']); // Navigate to orders page after successful order placement
        // Optionally, you can clear the cart or navigate to an order confirmation page here
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this._popup.showError(error.error?.message || 'Failed to place order. Please try again.'); // Show error message to user
        // Handle error (e.g., show a notification to the user)
      }
    });
  }
}
