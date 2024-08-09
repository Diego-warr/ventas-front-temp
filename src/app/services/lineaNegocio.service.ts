import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LineaNegocioJVDTO } from '../dto/LineaNegocioJVDTO';

@Injectable({
  providedIn: 'root'
})
export class LineaNegocioService {

  private endpointGetAllLineaNegocio = `${environment.HOST}/linea-negocio/all`;
  private endpointCreateLineaNegocio = `${environment.HOST}/linea-negocio/create`;
  private endpointUpdateLineaNegocio = `${environment.HOST}/linea-negocio/update`;
  private endpointHabilitarLineaNegocio = `${environment.HOST}/linea-negocio/habilitar`;
  private endpointInhabilitarLineaNegocio = `${environment.HOST}/linea-negocio/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<LineaNegocioJVDTO[]>(`${this.endpointGetAllLineaNegocio}`, {});
  }

  public create(lineaNegocio: LineaNegocioJVDTO) {
    return this.http.post<LineaNegocioJVDTO>(`${this.endpointCreateLineaNegocio}`, lineaNegocio);
  }

  public update(lineaNegocio: LineaNegocioJVDTO) {
    return this.http.patch<LineaNegocioJVDTO>(`${this.endpointUpdateLineaNegocio}`, lineaNegocio);
  }

  public habilitar(lineaNegocioId: number) {
    return this.http.patch<any>(`${this.endpointHabilitarLineaNegocio}/${lineaNegocioId}`, {});
  }

  public inhabilitar(lineaNegocioId: number) {
    return this.http.patch<any>(`${this.endpointInhabilitarLineaNegocio}/${lineaNegocioId}`, {});
  }
}
