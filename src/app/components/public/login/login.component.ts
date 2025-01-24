import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../../services/register.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
     userService = inject(RegisterService)
     formlogin!: FormGroup
     constructor(private fb : FormBuilder, private router:Router){
        this.formlogin=this.fb.group({
            email:['',[Validators.required, Validators.email]],
            password:['',[Validators.required, Validators.minLength(5)]]
        })
     }

     ngOnInit(){

            }
     login(){

        if (this.formlogin.valid) {
            this.userService.login(this.formlogin.value).subscribe({
                next:(resApi:any)=>{
                    let token = resApi.token
                    let id = resApi.id
                    sessionStorage.setItem('token', token)
                    sessionStorage.setItem('id', id)
                    Swal.fire({
                        icon:"success",
                        title:"Gracias por volver!",
                        text:"Compra, vende y repite"
                    })
                    this.router.navigate([`/home`])


                },
                error:(error:any)=>{
                    console.log(error);

                    Swal.fire({
                        icon:"error",
                        title:"Ups!",
                        text:"¡Ingresa la información correcta!"
                      })
                }
            })
        }else{
            Swal.fire({
                icon:"warning",
                title:"Información incompleta",
                text:"Ingresa tu correo y contraseña correctamente"
            })
        }
     }

}
