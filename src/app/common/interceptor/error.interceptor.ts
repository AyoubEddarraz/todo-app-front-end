import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { JwtService } from 'src/app/modules/account/services/jwt.service';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService , private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err:any) => {

      if([401, 403].includes(err.status) && request.url != `${environment.apiUrl}account/login`){

        return this.authService.refreshToken().pipe(
          switchMap((token: any) => {
            
            this.jwtService.setToken(token.accessToken);

            request = request.clone({
              setHeaders: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token.accessToken}`
              }
            })

            return next.handle(request);

          })
        )

      }

      const error = (err && err.error && err.error.message) || err.statusText;
      return throwError(error);

    }))
  }
}
