import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './service/backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService : SocialAuthService , private backendService : BackendServiceService){
    
  }
  
  ngOnInit(): void {
    this.authService.authState.subscribe({
      next:(user)=>{
        alert("login successful");
        console.log("login successful");
        console.log(user);
        this.backendService.loginWithGoogle(user).subscribe({
          next:(data)=>{
            console.log("login successful & data from backend");
            console.log(data);
          },
          error:(error)=>{
            console.log("request denied");
          },
          complete:()=>{
            console.log("request complete from backend");
          }
        });
        
      },
      error:(error)=>{
        alert("login denied");
        console.log(error);
      },
      complete:()=>{
        console.log("request completed");
      }
    })
  }
  title = 'LoginWithGoogle';
}
