import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UsersService } from '../../services/users/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { producerIncrementEpoch } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  user!:any
  userid!:string
  productService = inject(ProductService)
  misproductos!:any
  favoritos!:any

  products!: any
  formProduct!: FormGroup
  formUser!: FormGroup
  estado:boolean=false
  token: any = ""


    constructor(private fb : FormBuilder,  private UService:UsersService,private PService:ProductService, private route: ActivatedRoute){
        this.formProduct = this.fb.group({
                    prenda: ['', [Validators.required]],
                    tipo: ['', [Validators.required]],
                    precio: ['', [Validators.required]],
                    estado: ['', [Validators.required]],
                    marca: ['', [Validators.required]],
                    imagen: ['', [Validators.required]],
                    descripcion: ['', [Validators.required]],
                    talla: ['', [Validators.required]],
                    owner: ['']
                })
        this.formUser = this.fb.group({
                    nombre: ['', [Validators.required]],
                    apellido: ['', [Validators.required]],
                    email: ['', [Validators.required]],
                    password: ['', [Validators.required]],
                    telefono: ['', [Validators.required]],
                    direccion: ['', [Validators.required]],
                    ciudad:['',[Validators.required]],
                    imagen:['',Validators.required]
        })   }

    ngOnInit(){
        this.token = sessionStorage.getItem('token')
        this.userid = this.route.snapshot.paramMap.get('userid') || '';
          this.getuser(this.userid)
          this.getprendas(this.userid)
          }

    getuser(userid:string){
        this.UService.GetUser(userid).subscribe((usuario)=>{
        this.user=usuario
        this.favoritos=this.user.favoritos
        this.validar(userid)
        })
    }
    addProduct () {
        console.log(this.formProduct.value);
        const control = this.formProduct.get('owner');
        (control as any).customProp = this.userid;
        if (this.formProduct.valid) {
            this.productService.addProduct(this.formProduct.value).subscribe({
                next: (resApi: any) => {
                    this.formProduct.reset()
                    this.ngOnInit()
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



    getprendas(userid:string){
      this.productService.GetProductbyOwner(userid).subscribe((products)=>{
        console.log(products);

        this.misproductos=products
      })
    }
    EPerfil(){
      this.formUser.setValue({
                  nombre:this.user.nombre,
                  apellido:this.user.apellido,
                  email: this.user.email,
                  password: this.user.password,
                  telefono: this.user.telefono,
                  direccion: this.user.direccion,
                  ciudad:this.user.ciudad,
                  imagen:this.user.imagen
      }); console.log(this.formUser.value);

    }
    EditarPerfil(){
      if(this.formUser.valid){
        console.log(this.formUser.value);

        this.UService.UpdateUser(this.userid,this.formUser.value).subscribe({

          next: (resApi: any) => {
            this.ngOnInit()
            Swal.fire({

              icon:"success",
              title:"Cambios hechos en el usuario",
              text:"Exitoso"
          })
        }
        ,
        error: (error: any) => {
                  console.log(error);
                  Swal.fire ({
                      icon: "error",
                      title:"Cambios no hechos",
                      text:"Cambios no pudieron hacerse"
                  })
              }
          })
      } else {
          Swal.fire ({
              icon:"error",
              title:"No se ha editado el perfil",
              text:"Diligiencie correctamente el formulario"
          })
      }

    }
    reloadPage() {
    }
    validar(userid:string){
      this.UService.Validar(userid).subscribe((response:any)=>{
        console.log(this.estado);
        console.log(response);
        console.log(userid);
        this.estado=response
      })
    }
    eliminarproducto(itemid:string){
      Swal.fire({
        title: "Seguro?",
        text: "Esta es una accion permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI! Borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.PService.DeleteProduct(itemid).subscribe(()=>{
            console.log(`producto ${itemid} fue eliminado`)
            this.ngOnInit()
          })
          Swal.fire({
            title: "Borrado!",
            text: "El producto fue eliminado",
            icon: "success"
          });
        }
      });
    }
  }




