import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {DataUserToken} from "../auth/data-user-token.service";
import {HttpClient} from "@angular/common/http";
import {LineaNegocioDTO} from "../dto/LineaNegocioDTO";

@Injectable({
  providedIn: 'root'
})
export class CommonsServices {

  private endPoinstLineasNegocio = `${environment.HOST}/linea-negocio/all`;

  constructor(private saveDataUserToken: DataUserToken, private httpclient: HttpClient) {

  }

  getAllLineasNegocios() {
    return this.httpclient.get<LineaNegocioDTO[]>(this.endPoinstLineasNegocio);
  }
}
