import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()

export class UserService {

  httpOptions = {
    headers:new HttpHeaders(
      {'Content-Type':'application/json'}
    )
  }

  constructor(private httpClient:HttpClient) { 

  }

  register(user){
    return this.httpClient.post<any>("api/User/Register",user,this.httpOptions)
  }

  login(UserID:string) :Observable<any>
  {
    return this.httpClient.post<any>("api/User/Login",{UserID},this.httpOptions)
  }

}