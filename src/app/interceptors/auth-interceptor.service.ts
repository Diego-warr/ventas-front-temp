import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {DataUserToken} from "../auth/data-user-token.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private dataUsersToken: DataUserToken,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.dataUsersToken.getToken();

    if (!request.url.match('.+\/login\/(token)$') && token) {
      request = this.addSessionToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (this.dataUsersToken.isTokenExpired()) {
          localStorage.clear();
          this.router.navigate(['/login']);
          return throwError(err);
        } else if (request.url.match('.+\/login\/(token)$')) {
          localStorage.clear();
          this.router.navigate(['/login']);
          return throwError(err);
        } else if (err.status === 401) {
          //return this.handler401Error(request, next);
          this.router.navigate(['/login']);
          return throwError(err);
        } else {
          return throwError(err);
        }
      })
    );
  }

  handler401Error(request: HttpRequest<any>, handler: HttpHandler) {
  }

  addSessionToken(request: HttpRequest<any>, sessionToken: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${sessionToken}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  }
}
