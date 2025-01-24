import { Component, inject } from '@angular/core';
import { NavProductsComponent } from '../navproducts/nav-products.component';
import { ProductService } from '../../services/product/product.service';
import { UsersService } from '../../services/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-zapatos',
  standalone: true,
  imports: [NavProductsComponent, RouterLink],
  templateUrl: './zapatos.component.html',
  styleUrl: './zapatos.component.css'
})
export class ZapatosComponent {
    productService = inject(ProductService)
        userService = inject(UsersService)
        product!:any
        tipoacc="zapatos"
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
