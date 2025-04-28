import { Component, inject } from '@angular/core';
import { NavProductsComponent } from '../navproducts/nav-products.component';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { ProductosComponent } from '../productos/productos.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
    NavProductsComponent,
    ProductosComponent,
    ProductosComponent
],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private router:Router) {}
    productos! : any
    productService = inject(ProductService)
    // pagina : number = 1
    // itemspage: number = 9
    // totalpages: number = Math.ceil(this.productos.length / this.itemspage);

    ngOnInit () {
        // if (sessionStorage.getItem('token') == undefined || null) {
        //      this.router.navigate(['perfil'])
        // }
        this.productService.GetProducts().subscribe({
                next:(resApi : any)=> {

                    this.productos = resApi
                },
                error:(error: any)=>{
                    console.log(error);
                }
            })
    }
    
}
