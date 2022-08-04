import {HTTP_INTERCEPTORS,HttpEvent,HttpErrorResponse,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http';
import { catchError,  Observable, throwError } from 'rxjs';
import { AuthServicesService } from '../services/authServices/auth-services.service';
import { Router } from '@angular/router';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {
  toasters: any;
  constructor(private token: AuthServicesService, private router:Router) { 

  }
  intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    let authReq = req;

    const token = this.token.getToken();
    console.log(this.token.getToken() + 'hello');
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, token),
      });
    }
    return next.handle(authReq).pipe(
                catchError(this.handleError));
    }
     private handleError(error: HttpErrorResponse) {
      let errorMessage:string='';  
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${error.error.message}`;  
      } else
       switch (error.status) {
        case 400:
          errorMessage = "Bad Request.";
          break;
        case 401:
          errorMessage = "You need to log in to do this action."; 
          break;
        case 403:
          errorMessage = "Access! Denied."
          
          break;
        case 404:
          errorMessage = "The requested resource does not exist.";
          // this.router.navigate(['./auth'])   
          break;
        case 412:
          errorMessage = "Precondition Failed.";
          break;
        case 500:
          errorMessage = "Internal Server Error.";
          break;
        case 503:
          errorMessage = "The requested service is not available.";
          break;
        case 422:
          errorMessage = "Validation Error!";
          break;
        default:
          errorMessage = "Something went wrong!";
          // this.router.navigate(['auth']);    
      }
      if (errorMessage) {
        return throwError(errorMessage); 
      }  
    }
}

