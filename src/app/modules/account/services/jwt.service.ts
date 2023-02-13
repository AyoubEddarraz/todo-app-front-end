import { Injectable } from '@angular/core';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  // save && get token
  setToken(token: string){
    localStorage.setItem("token" , token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  // save && get RefreshToken
  setRefreshToken(RefreshToken: string){
    localStorage.setItem("RefreshToken" , RefreshToken);
  }

  getRefreshToken(){
    return localStorage.getItem("RefreshToken");
  }

  // save && get user id
  setUserId(userId: string) {
    localStorage.setItem("userId" , userId);
  }

  getUserId(){
    return localStorage.getItem("userId");
  }

  // save && get user details
  setCurrentUser(userDetails: RegisterResponse){
    localStorage.setItem("currentUser" , JSON.stringify(userDetails));
  }

  getCurrentUser(){
    let userDetails = (localStorage.getItem("currentUser") as string);
    return JSON.parse(userDetails)
  }

  // Reset Data in logout
  resetTokenAndUserIdAndUserDetails(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("RefreshToken");
  }

  tokenExpired() {
    const expiry = (JSON.parse(atob((this.getToken() as string).split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
