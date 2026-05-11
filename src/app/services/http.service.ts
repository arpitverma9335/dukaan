import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Address, Cart, OrderDetails, OrderSummary, Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpCustomService {

  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.baseUrl;

  registerUser(userData: {
    username: string;
    email: string;
    contact: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http.post(this.apiUrl + '/users/register', userData);
  }

  loginUser(credentials: { username: string; password: string }) {
    return this.http.post<
    {
      success: boolean;
      message: string;
      token: string;
      user: {
          username: string;
          email: string;
          contact: string;
          cartQuantity: number;
      }
    }>(this.apiUrl + '/users/login', credentials);
  }


  getAllProducts() {
    return this.http.get<
      {
        "success": boolean;
        "message": string;
        "data": [
          Product
        ]
      }>(this.apiUrl + '/products');
  }

  getCart() {
    return this.http.get<{
      success: boolean;
      cart: Cart;
    }>(this.apiUrl + '/cart');
  }

  updateItemInCart(productId: string, quantity: number) {
    return this.http.post<{
        success: boolean;
        cart: Cart;
      }>(this.apiUrl + `/cart/update`, { productId, quantity });
  }

  removeItemInCart(productId: string) {
    return this.http.post<{
        success: boolean;
        cart: Cart;
      }>(this.apiUrl + `/cart/remove`, { productId });
  }

  fetchAddress() {
    return this.http.get<{
      success: boolean;
      address: Address;
    }>(this.apiUrl + '/users/address');
  }

  saveAddress(addressData: {
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  }) {
    return this.http.post<
      {
        success: boolean;
        message: string;
        address: Address;
      }
    >(this.apiUrl + '/users/address', addressData);
  }

  placeOrder() {
    return this.http.post<{
      success: boolean;
      message: string;
    }>(this.apiUrl + '/orders/place', {});
  }

  fetchAllOrders() {
    return this.http.get<{
      success: boolean;
      orders: OrderSummary[]; // You can replace 'any' with a proper Order interface if you have one
    }>(this.apiUrl + '/orders');
  }

  fetchOrderDetails(orderId: string) {
    return this.http.get<{
      success: boolean;
      order: OrderDetails; // You can replace 'any' with a proper Order interface if you have one
    }>(this.apiUrl + `/orders/${orderId}`);
  }
}
