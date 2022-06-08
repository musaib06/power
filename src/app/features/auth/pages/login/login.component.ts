import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginData } from './login.model';
import { AuthServicesService } from 'src/app/core/services/authServices/auth-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  loginmodelobj :loginData=new loginData
  //alertMsg :boolean=false
  public errorMessage:string |undefined=undefined;
 
  
  constructor(private  formBuilder:FormBuilder,private _http:HttpClient,private router:Router,
      private _auth:AuthServicesService) { }

  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  get email (){ return this.loginForm.get('email')}
  get password (){ return this.loginForm.get('password')}
  token:any
  logIn(){
    this.loginmodelobj.email=this.loginForm.value.email
    this.loginmodelobj.password=this.loginForm.value.password
    
    this._auth.getlog(this.loginmodelobj)
    .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.token = res.headers.get('authorization')
        // console.log(res.firstname);
        console.log(this.token)
        localStorage.setItem('token',this.token)
         this.router.navigate(['./admin'])
           return null;  
      }
      ,
      error:(error)=>{
        // this.alertMsg=true
        console.log(error);
        this.errorMessage=error;
        this.router.navigate(['./auth'])
        
      }
    })
  
    
  
     
  
  }

  getlog(){
   
  }
 
}
