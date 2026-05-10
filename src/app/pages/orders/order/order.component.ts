import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpCustomService } from '../../../services/http.service';
import { catchError, map, Observable, of } from 'rxjs';
import { OrderDetails } from '../../../interfaces/interfaces';
import { RouterLink } from "@angular/router";
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-order',
  imports: [CommonModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  constructor(private _http: HttpCustomService, private _Popup: AlertService) {
    this.orderId = window.location.pathname.split('/').pop() || '';
  } 

  order$!: Observable<OrderDetails>;
  orderId!: string;

  ngOnInit(): void {
    this.order$ = this._http.fetchOrderDetails(this.orderId).pipe(map(res => res.order)).pipe(
      catchError((error) => {
        console.error('Error fetching order details:', error);
        this._Popup.showError(error.error?.message || 'Failed to fetch order details. Please try again.');
        // Handle error (e.g., show a notification to the user)
        return of((null as unknown) as OrderDetails); // Return null or an appropriate fallback value
      })
    );
  }
}
