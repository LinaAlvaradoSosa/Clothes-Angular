import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { NavProductsComponent } from '../navproducts/nav-products.component';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [RouterLink, NavProductsComponent],
  templateUrl: './accesorios.component.html',
  styleUrl: './accesorios.component.css'
})
export class AccesoriosComponent {
    productService = inject(ProductService)
    userService = inject(UsersService)
    product!:any
    tipoacc="accesorios"
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
