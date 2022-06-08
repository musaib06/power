import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServicesService } from '../services/authServices/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService:AuthServicesService,private _router:Router){}

  canActivate(): boolean  {
    if (this._authService.loggedin()){
      return true
    }else{
      this._router.navigate(['auth'])
      return false
    }
  }
}
