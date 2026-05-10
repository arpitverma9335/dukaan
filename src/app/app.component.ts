import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { ErrorPopupComponent } from './shared-components/error-popup/error-popup.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, ErrorPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bazaar';

  showError: boolean = false; // 1. State to control error popup visibility
}
