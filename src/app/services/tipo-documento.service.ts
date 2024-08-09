import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../dto/ResponseDTO';
import { TipoDocumentoJVDTO } from '../dto/TipoDocumentoJVDTO';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private endpointAllTipoDocumentos = `${environment.HOST}/tipo-documento/all`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<TipoDocumentoJVDTO[]>>(this.endpointAllTipoDocumentos);
  }
}
