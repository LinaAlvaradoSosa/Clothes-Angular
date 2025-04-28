import { Component, inject } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    userService=inject(RegisterService)
    formRegister!: FormGroup
    constructor(private fb : FormBuilder, private router:Router){
        this.formRegister=this.fb.group({
            nombre:['',[]],
            apellido:['',[]],
            email:['',[]],
            password:['',[]],
            telefono:['',[]],
            direccion:['',[]],
            ciudad:['',[]],
            dob:['',[]],
            imagen:['',[]],
        })
    }
    register(){
        this.userService.addUser(this.formRegister.value).subscribe({
            next:(resApi: any)=>{
                Swal.fire({
                    icon:"success",
                    title:"¡Gracias por registrarte!",
                    text:`¡Ahora inicia sesión ${resApi.nombre} y empieza a salvar al mundo! `
                })
                this.router.navigate(['/login'])
            },
            error:(error:any)=>{
                console.log(error);
                Swal.fire({
                    icon:"error",
                    title:"Usuario no registrado!",
                    text:`${error.error.msj}`
                })
            }
        })
    }
}
