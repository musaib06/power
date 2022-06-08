import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  getUser(data:any){
    return this._http.post("https://app.alfamindstech.com/powermail-dev/admin/users/list",data);
  }
  getUserStats(){
    return this._http.get<any>("http://localhost:3000/userStats");
  }
}
