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
}
