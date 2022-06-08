import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private _http:HttpClient
    ) { }

  getlog(data:any){
    return this._http.post("https://app.alfamindstech.com/powermail-dev/admin/login", data , {observe:'response'});
  } 

  loggedin(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  
}
