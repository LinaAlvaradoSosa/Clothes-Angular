import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    apiUrl: String = "http://localhost:4000/api"
    token:any = sessionStorage.getItem('token')
  constructor(private http : HttpClient) { }

  addUser (body:any){
    return this.http.post(`${this.apiUrl}/adduser`, body)
  }
  login(body:any){
    return this.http.post(`${this.apiUrl}/validacion`, body)
  }

}
