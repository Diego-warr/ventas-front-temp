import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ZonaJVDTO } from '../dto/ZonaJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private endpointGetAllZonas = `${environment.HOST}/zona/all`;
  private endpointCreateZona = `${environment.HOST}/zona/create`;
  private endpointUpdateZona = `${environment.HOST}/zona/update`;
  private endPointHabilitarZona = `${environment.HOST}/zona/habilitar`;
  private endPointDeshabilitarZona = `${environment.HOST}/zona/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<ZonaJVDTO[]>>(`${this.endpointGetAllZonas}`, {});
  }

  public create(zonaJV: ZonaJVDTO) {
    return this.http.post<ResponseDTO<ZonaJVDTO>>(`${this.endpointCreateZona}`, zonaJV);
  }

  public update(zonaJV: ZonaJVDTO) {
    return this.http.patch<ResponseDTO<ZonaJVDTO>>(`${this.endpointUpdateZona}`, zonaJV);
  }

  public habilitarZona(zonaId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointHabilitarZona}/${zonaId}`, {})
  }

  public inhabilitarZona(zonaId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarZona}/${zonaId}`, {})
  }

}
