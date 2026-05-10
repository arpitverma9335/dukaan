import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertData {
  type: 'WARNING' | 'INFO' | 'ERROR';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // We use a Subject to "push" the alert data to whoever is listening
  private alertSubject = new Subject<AlertData>();
  

  sharePoint() {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string) {
    this.alertSubject.next({ type: 'INFO', message });
  }

  showError(message: string) {
    this.alertSubject.next({ type: 'ERROR', message });
  }

  showWarning(message: string) {
    this.alertSubject.next({ type: 'WARNING', message });
  }
}