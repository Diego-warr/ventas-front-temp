import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DataUserToken {

  constructor(private jwtHelper: JwtHelperService) {
  }

  public TOKEN = "token";
  public USERNAME = "username";
  public DATE_EXPIRATION = "date_expiration";
  public SESSION_TOKEN = "session_token";
  public HOST = "host";

  public saveToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  public saveUsername(username: string) {
    localStorage.setItem(this.USERNAME, username);
  }

  public saveHost(host: string) {
    localStorage.setItem(this.HOST, host);
  }

  public saveDateExpiration(date: string) {
    localStorage.setItem(this.DATE_EXPIRATION, date);
  }

  public saveSessionToken(sessionToken: string) {
    localStorage.setItem(this.SESSION_TOKEN, sessionToken);
  }

  public deleteToken() {
    localStorage.removeItem(this.TOKEN);
  }

  public getDataStorage(name: string) {
    if (localStorage.getItem(name) != undefined) {
      return (localStorage.getItem(name));
    } else {
      return null;
    }
  }

  getToken() {
    if (this.getDataStorage(this.TOKEN) != null) {
      return localStorage.getItem(this.TOKEN);
    } else {
      return "";
    }
  }

  public isAuthenticated(): boolean {
    return this.getToken() != "";
  }

  public isTokenExpired(): boolean {
    if (this.getDataStorage(this.TOKEN) != null) {
      return this.jwtHelper.isTokenExpired(String(this.getToken()));
    }
    return true;
  }

  public getUsuario(): string {
    if (this.getDataStorage(this.TOKEN) != null) {
      return this.jwtHelper.decodeToken(String(this.getToken())).sub;
    }
    return "";
  }

  public getRoles(): any[] {
    if (this.getDataStorage(this.TOKEN) != null) {
      return this.jwtHelper.decodeToken(String(this.getToken())).authorities;
    }
    return [];
  }

}
