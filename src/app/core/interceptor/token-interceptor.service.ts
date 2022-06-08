import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  
} from '@angular/common/http';
import { catchError,  Observable, throwError } from 'rxjs';
import { AuthServicesService } from '../services/authServices/auth-services.service';
import { AlertfyService } from '../Alert/alertfy.service';
import { Router } from '@angular/router';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private token: AuthServicesService, private alertfy:AlertfyService,private router:Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage=`this is an client side error:${error.error}`
        console.error('An error occurred:hhh', error.error);
        
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
          //this.router.navigate(['auth'])
          errorMessage=`Backend returned code ${error.status}, body was: ${error.error}`;
      }
      errorMessage+=`\n something went wrong`
      // Return an observable with a user-facing error message.
      return throwError(errorMessage);
      
    }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
];
