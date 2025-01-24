import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito/carrito.service';
import { UsersService } from '../../services/users/users.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule

  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
    productosCart: any = []
    user!: any

    constructor (private carritoServive:CarritoService, private UsersService:UsersService ) {}

    ngOnInit(){

    this.productosCart = this.carritoServive.getProductsCart()
    console.log(this.productosCart);

    for (let i = 0; i < this.productosCart.length; i++) {
    const producto = this.productosCart[i];


    this.UsersService.GetUser(producto.owner).subscribe({
        next: (resApi: any) => {
        console.log(resApi);
        producto.nombre = resApi.nombre;
        producto.apellido = resApi.apellido;
        this.productosCart[i] = producto;
        },
        error: (error: any) => {
        console.log(error);
        }
    });
}
    }
}
