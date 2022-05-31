import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private  formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
    })
  }
  get email (){ return this.loginForm.get('email')}
  get password (){ return this.loginForm.get('password')}
  logIn(){
    console.log(this.loginForm.value);
    alert("success");
    this.router.navigate(['admin'])
  }

}
