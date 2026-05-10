import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderSummary } from '../../interfaces/interfaces';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpCustomService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders$!: Observable<OrderSummary[]>;

  constructor(private _http: HttpCustomService, private router: Router, private _Popup: AlertService) { }

  ngOnInit(): void {
    this.orders$ = this._http.fetchAllOrders().pipe(map(res => res.orders)).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        this._Popup.showError(error.error?.message || 'Failed to fetch orders. Please try again.');
        return of([]);
      })
    );
  }

  fetchOrderDetails(orderId: string) {
    this.router.navigate(['..', 'orders', orderId]); // Navigate to order details page
  }
}
