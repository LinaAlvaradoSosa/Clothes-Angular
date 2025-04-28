import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    apiUrl: String = "https://calm-savannah-05009-2b9edf3ccbff.herokuapp.com/api"
    token:any = sessionStorage.getItem('token')
  constructor(private http : HttpClient) { }

  addUser (body:any){
    return this.http.post(`${this.apiUrl}/adduser`, body)
  }
  login(body:any){
    return this.http.post(`${this.apiUrl}/validacion`, body)
  }

}
