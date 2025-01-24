import { Component } from '@angular/core';
import { AboutusnavComponent } from '../aboutusnav/aboutusnav.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    AboutusnavComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
