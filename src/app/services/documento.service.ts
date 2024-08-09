import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DocumentoJVPageResponse } from '../dto/DocumentoJVPageResponse';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private endpointAllDocumentosByClienteId = `${environment.HOST}/documento/cliente`;
  private endPointAllByRangoFechasPageable = `${environment.HOST}/documento/rangoFechas`;
  private endPointAllPageable = `${environment.HOST}/documento/all-pageable`;
  private endPointFiltroLike = `${environment.HOST}/documento`;
  private endPointFiltroAndClienteIdLike = `${environment.HOST}/documento/filtroLikeAndClienteId`;
  private endPointAllByRangoFechasAndClienteIdPageable = `${environment.HOST}/documento/rangoFechas/cliente`;

  constructor(private http: HttpClient) {
  }

  public allByClienteIdPageable(clienteId: number, page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endpointAllDocumentosByClienteId}/${clienteId}?page=${page}&size=${size}`, {});
  }

  public getAllByRangoFechasPageable(fechaInicial: Date, fechaFinal: Date, page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endPointAllByRangoFechasPageable}?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}&page=${page}&size=${size}`, {});
  }

  public getAllPageable(page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endPointAllPageable}?page=${page}&size=${size}`, {});
  }

  public getByFiltroLikePageable(parametro: string, index: number, page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endPointFiltroLike}?index=${index}&parametro=${parametro}&page=${page}&size=${size}`, {});
  }

  public getByFiltroLikeAndClienteIdPageable(clienteId: number , parametro: string, index: number, page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endPointFiltroAndClienteIdLike}?cliente_id=${clienteId}&index=${index}&parametro=${parametro}&page=${page}&size=${size}`, {});
  }

  public getByRangoFechasAndClienteIdPageable(fechaInicial: Date, fechaFinal: Date, clienteId: number, page: number, size: number) {
    return this.http.get<ResponseDTO<DocumentoJVPageResponse>>(`${this.endPointAllByRangoFechasAndClienteIdPageable}/${clienteId}?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}&page=${page}&size=${size}`, {});
  }

}
