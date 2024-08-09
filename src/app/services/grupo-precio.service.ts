import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GrupoPrecioJVBodyDTO } from '../dto/GrupoPrecioJVBodyDTO';
import { GrupoPrecioJVDTO } from '../dto/GrupoPrecioJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class GrupoPrecioService {

  private endpointGetByIdGrupoPrecios = `${environment.HOST}/grupo-precio/by-id`;
  private endpointGetAllGrupoPrecios = `${environment.HOST}/grupo-precio/all`;
  private endpointCreateGrupoPrecios = `${environment.HOST}/grupo-precio/create`;
  private endpointUpdateGrupoPrecios = `${environment.HOST}/grupo-precio/update`;
  private endPointHabilitarGrupoPrecios = `${environment.HOST}/grupo-precio/habilitar`;
  private endPointDeshabilitarGrupoPrecios = `${environment.HOST}/grupo-precio/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getById(grupoPrecioId: number) {
    return this.http.get<ResponseDTO<GrupoPrecioJVDTO>>(`${this.endpointGetByIdGrupoPrecios}/${grupoPrecioId}`, {});
  }

  public getAll() {
    return this.http.get<ResponseDTO<GrupoPrecioJVDTO[]>>(`${this.endpointGetAllGrupoPrecios}`, {});
  }

  public create(grupoPrecio: GrupoPrecioJVBodyDTO) {
    return this.http.post<ResponseDTO<GrupoPrecioJVDTO>>(`${this.endpointCreateGrupoPrecios}`, grupoPrecio);
  }

  public update(grupoPrecio: GrupoPrecioJVBodyDTO) {
    return this.http.patch<ResponseDTO<GrupoPrecioJVDTO>>(`${this.endpointUpdateGrupoPrecios}`, grupoPrecio);
  }

  public habilitar(grupoPrecioId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointHabilitarGrupoPrecios}/${grupoPrecioId}`, {})
  }

  public inhabilitar(grupoPrecioId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarGrupoPrecios}/${grupoPrecioId}`, {})
  }

}
