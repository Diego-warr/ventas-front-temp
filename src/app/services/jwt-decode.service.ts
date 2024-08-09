import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  jwtToken: string = "";
  decodedToken: { [key: string]: string } = {};

  constructor() {

  }
}
