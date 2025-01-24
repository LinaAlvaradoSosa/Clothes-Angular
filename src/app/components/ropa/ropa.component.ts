import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavProductsComponent } from '../navproducts/nav-products.component';
import { ProductService } from '../../services/product/product.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-ropa',
  standalone: true,
  imports: [RouterLink, NavProductsComponent],
  templateUrl: './ropa.component.html',
  styleUrl: './ropa.component.css'
})
export class RopaComponent {
     productService = inject(ProductService)
        userService = inject(UsersService)
        product!:any
        tipoacc="ropa"
        items!:any
        usuario!:any

        ngOnInit(){
            this.productService.GetProductsbyCategories(this.tipoacc).subscribe({
                next:(resApi:any)=>{
                    this.product=resApi
                    for (let i = 0; i < this.product.length; i++) {
                        const element = this.product[i];
                        this.userService.GetUser(element.owner).subscribe({
                            next:(resApi:any)=>{
                                this.usuario=resApi
                                element.imag=this.usuario.imagen
                                element.nombre=this.usuario.nombre
                                element.apellido=this.usuario.apellido

                            },
                            error:(error:any)=>{
                                console.log(error);
                            }
                        })
                    }
                },
                error:(error:any)=>{
                    console.log(error);

                }
            })
        }
}
