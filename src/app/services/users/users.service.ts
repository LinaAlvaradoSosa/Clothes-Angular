import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string ="https://calm-savannah-05009-2b9edf3ccbff.herokuapp.com"
  token: any = ""

  constructor(private http: HttpClient) {}

  GetUser(id:string){
      return this.http.get(`${this.apiUrl}/user/${id}`)
  }
  Validar(id:string){


    const token = sessionStorage.getItem('token')

    return this.http.post(`${this.apiUrl}/validar/${id}`,{token})

  }
  UpdateUser(id:string,body:any){
    this.token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set ("Authorization", `Bearer ${this.token}`)
    return this.http.put(`${this.apiUrl}/updateuser/${id}`,body, {headers})

  }
}
