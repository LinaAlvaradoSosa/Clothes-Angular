
import { ProductService } from '../../services/product/product.service';
import { UsersService } from '../../services/users/users.service';
import { Component, inject } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-productos',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css'
})
export class ProductosComponent {
    productService = inject(ProductService)
    userService = inject(UsersService)
    items!:any
    usuario!:any
    precio!:string
    products!: any
    formProduct!: FormGroup
    busqueda = new FormControl
    
    page: number = 1;  
    itemsPerPage: number = 6;  
    totalItems: number = 0;  
    loadedItems: number = 0;  

    constructor (private fb : FormBuilder){
        this.formProduct = this.fb.group({
            prenda: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            marca: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
            descricion: ['', [Validators.required]],
            talla: ['', [Validators.required]],
            owner: ['', [Validators.required]]
        })
    }
    ngOnInit() {
        this.productService.GetProducts().subscribe({
            next: (resApi: any) => {
            this.items = resApi;
            this.totalItems = resApi.length;
            this.loadedItems = 0; 
    
            for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
    
            this.userService.GetUser(element.owner).subscribe({
                next: (resApi: any) => {
                    this.usuario = resApi;
                    element.imag = this.usuario.imagen;
                    element.nombre = this.usuario.nombre;
                    element.apellido = this.usuario.apellido;
    
                    this.loadedItems++;  
                if (this.loadedItems === this.items.length) {
                }
                },
                error: (error: any) => {
                console.log(error);
                }
            });
        }
    },
        error: (error: any) => {
            console.log(error);
        }
        });
    }
    get paginatedData() {
        const startIndex = (this.page - 1) * this.itemsPerPage;
        return this.items.slice(startIndex, startIndex + this.itemsPerPage);
    }
    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    prevPage() {
        if (this.page > 1) {
            this.page--;
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
        }
    }


    addProduct () {
        if (this.formProduct.valid) {
            this.productService.addProduct(this.formProduct.value).subscribe({
                next: (resApi: any) => {
                    this.formProduct.reset()

                    Swal.fire ({
                        icon:"success",
                        title:"Nuevo producto creado",
                        text:"Nuevo producto agregado"
                    })
                },
                error: (error: any) => {
                    console.log(error);
                    Swal.fire ({
                        icon: "error",
                        title:"Producto no creado",
                        text:"No se ha agregado el producto"
                    })
                }
            })
        } else {
            Swal.fire ({
                icon:"error",
                title:"No se ha agregado el producto",
                text:"Diligiencie correctamente el formulario"
            })
        }
    }
    buscar(){
        this.productService.busqueda(this.busqueda.value).subscribe({
            next:(resApi:any)=>{
                this.items=resApi
                for (let i = 0; i < this.items.length; i++) {
                    const element = this.items[i];
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
            error(error:any) {
                console.log(error);

            },
        })
    }
}
