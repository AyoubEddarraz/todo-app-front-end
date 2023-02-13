import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { JwtService } from 'src/app/modules/account/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtService : JwtService , private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {

    let token = this.jwtService.getToken();

    if(token){
      return true;
    }

    this.route.navigateByUrl("/account");
    return false

  }

}
