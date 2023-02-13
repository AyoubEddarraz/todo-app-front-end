import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from 'src/app/modules/account/services/jwt.service';
import { AuthService } from 'src/app/modules/account/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService , private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.jwtService.getToken() && !this.jwtService.tokenExpired()){
      request = request.clone({
        setHeaders: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${this.jwtService.getToken()}`
        }
      })
    }

    return next.handle(request);

  }
}
