import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http : HttpClient) { }

  loginWithGoogle(user:SocialUser){
    return this.http.post(`http://localhost:2023/auth/google` , user);
  }

  getAllUser(token : any){
    console.log("Bearer " + token );
    return this.http.get(`http://localhost:2023/users` ,{
      headers : {
        //added for cors policy 
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin allow-popups",
        "Authorization" : "Bearer " + token 
      }
    })
  }
}
