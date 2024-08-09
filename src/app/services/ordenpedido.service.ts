import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrdenPedidoJVBodyDTO } from '../dto/OrdenPedidoJVBodyDTO';
import { OrdenPedidoJVPageResponse } from '../dto/OrdenPedidoJVPageResponse';
import { OrdenPedidoJVResponseCustomDTO } from '../dto/OrdenPedidoJVResponseCustomDTO';
import { OrdenPedidoJVResponseDTO } from '../dto/OrdenPedidoJVResponseDTO';
import { PlantelJVDTO } from '../dto/PlantelJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';
import { SerieOrdenPedidoJVDTO } from "../dto/SerieOrdenPedidoJVDTO";

@Injectable({
  providedIn: 'root'
})
export class OrdenPedidoService {

  private endPointOrdenPedidoByClienteId = `${environment.HOST}/orden-pedido/cliente`;
  private endPointGetAllByCanalVentaId = `${environment.HOST}/orden-pedido/by-canalventaid-pageable`;
  private endPointGetAllByUsuarioId = `${environment.HOST}/orden-pedido/by-usuarioid-pageable`;
  private endPointGetAllOrdenesPedido = `${environment.HOST}/orden-pedido/all`;
  private endPointGetAllOPPageable = `${environment.HOST}/orden-pedido/all-pageable`;
  private endPointCreateOrdenesPedido = `${environment.HOST}/orden-pedido/create`;
  private endPointGetAllSeriesOrdenesPedido = `${environment.HOST}/orden-pedido/all-series`;
  private endPointGetLastNumeroRecordBySerirAndTipoOrden = `${environment.HOST}/orden-pedido/numero-by-serie-tipoOrden`;
  private endPointGetByRangoFechas = `${environment.HOST}/orden-pedido/rangoFechas`;
  private endPointGetByRangoFechasAndVendedorId = `${environment.HOST}/orden-pedido`;
  private endPointCancelarOrdenPedidoByOPId = `${environment.HOST}/orden-pedido/cancelar-orden-de-pedido`;
  private endPointGetByVendedorId = `${environment.HOST}/orden-pedido/vendedor`;
  private endPointGetByRangoFechasAndClienteId = `${environment.HOST}/orden-pedido/cliente`;
  private endPointGetAllByFiltroLike = `${environment.HOST}/orden-pedido/filtroLike`;
  private endPointGetAllByFiltroLikeAndVendedorId = `${environment.HOST}/orden-pedido/filtroLikeAndVendedorId`;
  private endPointGetAllByFiltroLikeAndClienteId = `${environment.HOST}/orden-pedido/filtroLikeAndClienteId`;
  private endpointGetAllPlanteles = `${environment.HOST}/orden-pedido/planteles`;
  private endPointFiltroLike = `${environment.HOST}/orden-pedido/by-filtro-pageable`;
  private endPointAllByRangoFechasPageable = `${environment.HOST}/orden-pedido/rango-fechas-pageable`;

  constructor(private httpclient: HttpClient) { }

  public getByClienteId(clienteId: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointOrdenPedidoByClienteId}/${clienteId}`, {})
  }

  public getAllOrdenPedido() {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetAllOrdenesPedido}`)
  }

  public getAllPageable(page: number, size: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVPageResponse>>(`${this.endPointGetAllOPPageable}?page=${page}&size=${size}`)
  }

  public getAllSeries() {
    return this.httpclient.get<ResponseDTO<SerieOrdenPedidoJVDTO[]>>(`${this.endPointGetAllSeriesOrdenesPedido}`)
  }

  public createOP(ordenPedidoBody: OrdenPedidoJVBodyDTO, username: string, servidor: string) {
    return this.httpclient.post<ResponseDTO<OrdenPedidoJVResponseDTO>>(`${this.endPointCreateOrdenesPedido}?username=${username}&servidor=${servidor}`, ordenPedidoBody)
  }

  public findLastNumeroRecordBySerieAndTipoOrdenPedido(tipoOrden: string, serie: string) {
    return this.httpclient.get<ResponseDTO<String>>(`${this.endPointGetLastNumeroRecordBySerirAndTipoOrden}/${tipoOrden}/${serie}`)
  }

  public getByRangoFechas(fechaInicial: Date, fechaFinal: Date) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetByRangoFechas}?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}`, {});
  }

  public getByRangoFechasAndVendedorId(fechaInicial: Date, fechaFinal: Date, username: string) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetByRangoFechasAndVendedorId}/${username}/rangoFechas?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}`, {});
  }

  public getAllByCanalVentaId(canalVentaId: number, page: number, size: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVPageResponse>>(`${this.endPointGetAllByCanalVentaId}?canalventa_id=${canalVentaId}&page=${page}&size=${size}`)
  }

  public getAllByUsuarioId(usuarioId: number, page: number, size: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVPageResponse>>(`${this.endPointGetAllByUsuarioId}?usuario_id=${usuarioId}&page=${page}&size=${size}`)
  }

  public getByVendedorId(username: String) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetByVendedorId}?username=${username}`);
  }

  public getByRangoFechasAndClienteId(fechaInicial: Date, fechaFinal: Date, clienteId: string) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetByRangoFechasAndClienteId}/${clienteId}/rangoFechas?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}`, {});
  }

  public getByFiltroLike(parametro: string, index: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetAllByFiltroLike}?index=${index}&parametro=${parametro}`);
  }

  public getByFiltroLikeAndVendedorId(parametro: string, index: number, correoUsuario: String) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetAllByFiltroLikeAndVendedorId}?index=${index}&parametro=${parametro}&correo_usuario=${correoUsuario}`);
  }

  public getByFiltroLikeAndClienteId(parametro: string, index: number, clienteId: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVResponseCustomDTO[]>>(`${this.endPointGetAllByFiltroLikeAndClienteId}?index=${index}&parametro=${parametro}&cliente_id=${clienteId}`);
  }

  public cancelarOP(ordenPedidoId: number, username: String) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointCancelarOrdenPedidoByOPId}?orden_de_pedido=${ordenPedidoId}&username=${username}`, {});
  }

  public getAllPlanteles() {
    return this.httpclient.get<ResponseDTO<PlantelJVDTO[]>>(`${this.endpointGetAllPlanteles}`, {});
  }

  public getByFiltroLikePageable(parametro: string, index: number, page: number, size: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVPageResponse>>(`${this.endPointFiltroLike}?index=${index}&parametro=${parametro}&page=${page}&size=${size}`, {});
  }

  public getAllByRangoFechasPageable(fechaInicial: Date, fechaFinal: Date, page: number, size: number) {
    return this.httpclient.get<ResponseDTO<OrdenPedidoJVPageResponse>>(`${this.endPointAllByRangoFechasPageable}?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}&page=${page}&size=${size}`, {});
  }

}
