import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-error-popup',
  imports: [CommonModule],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.css'
})
export class ErrorPopupComponent implements OnInit {
  isOpen = false;
  message = '';
  title = '';
  type: 'INFO' | 'WARNING' | 'ERROR' = 'ERROR';

  constructor(private _Popup: AlertService) { }

  get config() {
    return {
      ERROR: {
        bar: 'bg-red-500',
        iconBg: 'bg-red-50',
        iconColor: 'text-red-600',
        btn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      },
      INFO: {
        bar: 'bg-blue-500',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        btn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      },
      WARNING: {
        bar: 'bg-yellow-500',
        iconBg: 'bg-yellow-50', 
        iconColor: 'text-yellow-600',
        btn: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
      }
    }[this.type];
  }

  ngOnInit(): void {
    this._Popup.sharePoint().subscribe((alertData) => {
      this.openModel(alertData.type, alertData.message);
    });
  }

  openModel(title: 'WARNING' | 'INFO' | 'ERROR', message: string) {
    this.message = message;
    this.type = title;
    this.title = title === 'ERROR' ? 'Error' : 'Information';
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
