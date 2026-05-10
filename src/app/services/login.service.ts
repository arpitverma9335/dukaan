import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private username$ = new BehaviorSubject<string>('Unknown');

  constructor() {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (token) {
      this.isLoggedIn$.next(true);
      this.username$.next(storedUsername || 'Unknown');
    }
  }

  loadCredentials(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.isLoggedIn$.next(true);
    this.username$.next(username);
  }

  clearCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn$.next(false);
    this.username$.next('Unknown');
  }

  fetchUserName() {
    return this.username$.asObservable();
  }

  fetchLoginStatus() {
    return this.isLoggedIn$.asObservable();
  }
}
