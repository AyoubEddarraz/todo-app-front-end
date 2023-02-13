import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';
import { Register } from '../interfaces/register';
import { LoginResponse } from '../interfaces/login-response';
import { RegisterResponse } from '../interfaces/register-response';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtService, private route: Router) {}

  // Login
  login(loginForm: Login){
    return this.http.post<LoginResponse>(`${environment.apiUrl}account/login` , loginForm);
  }

  // Register
  register(registerForm: Register) {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}account/register` , registerForm);
  }

  // confirme mail
  confirmAccount(token: string) {
    return this.http.post<string>(`${environment.apiUrl}account/confirm?token=${token}`, {});
  }

  // logout
  logOut(){
    this.jwtService.resetTokenAndUserIdAndUserDetails();
    this.route.navigateByUrl("/account/SignIn");
  }

  refreshToken() {
    return this.http.post(`${environment.apiUrl}account/refresh` , {} , {headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : `Bearer ${this.jwtService.getRefreshToken()}`
    } });
  }

}
