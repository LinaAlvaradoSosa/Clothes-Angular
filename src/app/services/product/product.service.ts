import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl:string ="https://calm-savannah-05009-2b9edf3ccbff.herokuapp.com/api"

  token: any = ""


  constructor(private http: HttpClient) { }


  GetProduct(id:string){
    return this.http.get(`${this.apiUrl}/product/${id}`)
  }
  GetProductsbyCategories(categorias:string){


        return this.http.get(`${this.apiUrl}/productbyCategory/${categorias}`)
  }
  addProduct (body:any ){
    this.token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set ("Authorization", `Bearer ${this.token}`)
    return this.http.post(`${this.apiUrl}/addproduct`, body, {headers})

  }
  GetProductbyOwner(id:string){
    return this.http.get(`${this.apiUrl}/myproducts/${id}`)
  }

  GetProducts(){
    return this.http.get(`${this.apiUrl}/products`)
    }


  busqueda(prenda:string){
        return this.http.get(`${this.apiUrl}/products/${prenda}`)
    }

  DeleteProduct(productid:string){
    const headers = new HttpHeaders().set ("Authorization", `Bearer ${this.token}`)
    return this.http.delete(`${this.apiUrl}/deleteproduct/${productid}`,{headers})
  }

  }





