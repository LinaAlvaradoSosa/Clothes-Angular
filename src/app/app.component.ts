import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { FooterComponent } from './components/footer/footer.component';

import { NavbarComponent } from "./components/navbar/navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // ProductDisplayComponent,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
     NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clothesproject';

}
