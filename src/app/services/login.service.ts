import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseLoginDTO} from '../dto/ResponseLoginDTO';
import {Observable} from 'rxjs';
import {ResponseDTO} from "../dto/ResponseDTO";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlLogin = `${environment.HOST}/public/user/login`;
  urlLogout = `${environment.HOST}/public/user/logout`;
  urlRequested: string = '';

  constructor(private httpclient: HttpClient) {
  }

  public login(username: string, password: string): Observable<ResponseLoginDTO<String>> {
    const url = this.urlLogin + "?" + "username=" + username + "&password=" + password;

    return this.httpclient.post<ResponseLoginDTO<String>>(url, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    });
  }

  public logout(tokenSession: string | null): Observable<ResponseDTO<string>> {
    const url = this.urlLogout + "?" + "token_session=" + tokenSession;

    return this.httpclient.post<ResponseDTO<string>>(url, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    });
  }
}
