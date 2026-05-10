import { Component, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { Observable, of } from 'rxjs';
import { Product } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { HttpCustomService } from '../../services/http.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-catalogue',
  imports: [ProductComponent, CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  constructor(private _http: HttpCustomService, private _popup: AlertService) {}

  productsToRender$: Observable<Product[]> = of([])
  
  ngOnInit() {
    this._http.getAllProducts().subscribe({
      next: (response) => {
        this.productsToRender$ = of(response.data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this._popup.showError(err.error?.message || 'Failed to fetch products. Please try again.');
      }
    });
  }
}
