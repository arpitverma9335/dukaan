import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from './../../config.json';
import { Address, Cart, OrderDetails, OrderSummary, Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpCustomService {

  constructor(private http: HttpClient) { }

  registerUser(userData: {
    username: string;
    email: string;
    contact: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http.post(config.apiBaseUrl + '/users/register', userData);
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
    }>(config.apiBaseUrl + '/users/login', credentials);
  }


  getAllProducts() {
    return this.http.get<
      {
        "success": boolean;
        "message": string;
        "data": [
          Product
        ]
      }>(config.apiBaseUrl + '/products');
  }

  getCart() {
    return this.http.get<{
      success: boolean;
      cart: Cart;
    }>(config.apiBaseUrl + '/cart');
  }

  updateItemInCart(productId: string, quantity: number) {
    return this.http.post<{
        success: boolean;
        cart: Cart;
      }>(config.apiBaseUrl + `/cart/update`, { productId, quantity });
  }

  removeItemInCart(productId: string) {
    return this.http.post<{
        success: boolean;
        cart: Cart;
      }>(config.apiBaseUrl + `/cart/remove`, { productId });
  }

  fetchAddress() {
    return this.http.get<{
      success: boolean;
      address: Address;
    }>(config.apiBaseUrl + '/users/address');
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
    >(config.apiBaseUrl + '/users/address', addressData);
  }

  placeOrder() {
    return this.http.post<{
      success: boolean;
      message: string;
    }>(config.apiBaseUrl + '/orders/place', {});
  }

  fetchAllOrders() {
    return this.http.get<{
      success: boolean;
      orders: OrderSummary[]; // You can replace 'any' with a proper Order interface if you have one
    }>(config.apiBaseUrl + '/orders');
  }

  fetchOrderDetails(orderId: string) {
    return this.http.get<{
      success: boolean;
      order: OrderDetails; // You can replace 'any' with a proper Order interface if you have one
    }>(config.apiBaseUrl + `/orders/${orderId}`);
  }
}
