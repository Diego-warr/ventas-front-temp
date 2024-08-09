import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {DataUserToken} from "../auth/data-user-token.service";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
              private loginService: LoginService,
              private dataUserToken: DataUserToken) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const urlNavigate = state.url;

    if (this.dataUserToken.isTokenExpired()) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    } else if (!this.dataUserToken.isAuthenticated()) {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.loginService.urlRequested = urlNavigate;
      return false;
    } else {
      this.loginService.urlRequested = "";
      return true;
    }
  }
}
