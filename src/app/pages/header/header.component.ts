import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Observable, of, Subscription } from 'rxjs';
import { DataCentreService } from '../../services/data-centre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false; 
  username = 'Unknown';
  loginUserNameSubscription!: Subscription;
  loginStatusSubscription!: Subscription;

  cartQuantity$: Observable<number> = of(0);

  constructor(private router: Router, private loginService: LoginService, private ds: DataCentreService) { }

  ngOnInit(): void {
    this.loginUserNameSubscription = this.loginService.fetchUserName().subscribe(username => {
      this.username = username;
    });

    this.cartQuantity$ = this.ds.getCartQuantity();

    this.loginStatusSubscription = this.loginService.fetchLoginStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.loginService.clearCredentials();
    this.router.navigate(['..', 'login']);
  }

  ngOnDestroy(): void {
    this.loginUserNameSubscription && this.loginUserNameSubscription.unsubscribe();
    this.loginStatusSubscription && this.loginStatusSubscription.unsubscribe();
  }
}
