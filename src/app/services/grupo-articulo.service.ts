import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GrupoArticuloJVBodyDTO } from '../dto/GrupoArticuloJVBodyDTO';
import { GrupoArticuloJVDTO } from '../dto/GrupoArticuloJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class GrupoArticuloService {

  private endpointGetAllGrupoArticulo = `${environment.HOST}/grupo-articulo/all`;
  private endpointCreateGrupoArticulo = `${environment.HOST}/grupo-articulo/create`;
  private endpointUpdateGrupoArticulo = `${environment.HOST}/grupo-articulo/update`;
  private endPointHabilitarGrupoArticulo = `${environment.HOST}/grupo-articulo/habilitar`;
  private endPointDeshabilitarGrupoArticulo = `${environment.HOST}/grupo-articulo/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<GrupoArticuloJVDTO[]>>(`${this.endpointGetAllGrupoArticulo}`, {});
  }

  public create(grupoArticulo: GrupoArticuloJVBodyDTO) {
    return this.http.post<ResponseDTO<GrupoArticuloJVDTO>>(`${this.endpointCreateGrupoArticulo}`, grupoArticulo);
  }

  public update(grupoArticulo: GrupoArticuloJVBodyDTO) {
    return this.http.patch<ResponseDTO<GrupoArticuloJVDTO>>(`${this.endpointUpdateGrupoArticulo}`, grupoArticulo);
  }

  public habilitar(grupoArticuloId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointHabilitarGrupoArticulo}/${grupoArticuloId}`, {})
  }

  public inhabilitar(grupoArticuloId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarGrupoArticulo}/${grupoArticuloId}`, {})
  }
}
