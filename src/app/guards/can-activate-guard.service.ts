import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{
  constructor(private loginService : LoginService, private router : Router, private jwtHelperService: JwtHelperService)
  {
    
  }

  canActivate(route: ActivatedRouteSnapshot): boolean
  {
    //console.log(this.router.url);
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as any).token : null;

    //console.log(this.jwtHelperService.decodeToken(token));

    if (this.loginService.isauthenticated() && this.jwtHelperService.decodeToken(token).role == route.data['expectedRole'])
    {
      return true; //the user can navigate to the particular route
    }
    else
    {
      this.router.navigate(["login"]);
      return false; //the user can't navigate to the particular route
    }
  }
}