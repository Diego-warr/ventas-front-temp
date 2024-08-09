import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListaPrecioJVResponseDTO } from '../dto/ListaPrecioJVResponseDTO';
import { PrecioBaseJVBodyDTO } from '../dto/PrecioBaseJVBodyDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ListaPrecioService {

  private endpointGetAllListaPrecio = `${environment.HOST}/lista-precio/all`;
  private endpointGetAllListaPrecioLima = `${environment.HOST}/lista-precio/all-lima`;
  private endpointGetAllListaPrecioProvincia = `${environment.HOST}/lista-precio/all-provincia`;
  private endpointGetAllListaPrecioCañete = `${environment.HOST}/lista-precio/all-canete`;
  private endpointCreateListaPrecio = `${environment.HOST}/lista-precio/create`;
  private endpointFindByLineaNegocioIdAndCanalVentaId = `${environment.HOST}/lista-precio/by-linea`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<ListaPrecioJVResponseDTO[]>>(`${this.endpointGetAllListaPrecio}`, {});
  }

  public getAllLima() {
    return this.http.get<ResponseDTO<ListaPrecioJVResponseDTO[]>>(`${this.endpointGetAllListaPrecioLima}`, {});
  }

  public getAllProvincia() {
    return this.http.get<ResponseDTO<ListaPrecioJVResponseDTO[]>>(`${this.endpointGetAllListaPrecioProvincia}`, {});
  }

  public getAllCañete() {
    return this.http.get<ResponseDTO<ListaPrecioJVResponseDTO[]>>(`${this.endpointGetAllListaPrecioCañete}`, {});
  }

  public create(precioBase: PrecioBaseJVBodyDTO) {
    return this.http.post<any>(`${this.endpointCreateListaPrecio}`, precioBase);
  }

  public findByLineaNegocioIdCanalVentaId(lineaNegocioId: number, canalVentaId: number) {
    return this.http.get<ResponseDTO<ListaPrecioJVResponseDTO[]>>(`${this.endpointFindByLineaNegocioIdAndCanalVentaId}/${lineaNegocioId}/by-canal/${canalVentaId}`, {});
  }

}
