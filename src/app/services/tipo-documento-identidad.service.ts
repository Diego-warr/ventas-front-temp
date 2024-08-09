import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../dto/ResponseDTO';
import { TipoDocumentoIdentidadJVDTO } from '../dto/TipoDocumentoIdentidadJVDTO';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoIdentidadService {

  private endpointAllTiposDocumentoIdentidad = `${environment.HOST}/tipo-documento-identidad/all`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<TipoDocumentoIdentidadJVDTO[]>>(this.endpointAllTiposDocumentoIdentidad);
  }

}
