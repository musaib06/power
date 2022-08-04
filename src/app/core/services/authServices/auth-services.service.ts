import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private _http:HttpClient
   , private router: Router ) { }

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
