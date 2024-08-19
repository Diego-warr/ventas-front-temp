import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CanalVentaJVDTO } from '../dto/CanalVentaJVDTO';

@Injectable({
  providedIn: 'root',
})
export class CanalVentaService {
  private endpointGetAllCanalVenta = `${environment.HOST}/canal-venta/all`;
  private endpointCreateCanalVenta = `${environment.HOST}/canal-venta/create`;
  private endpointUpdateCanalVenta = `${environment.HOST}/canal-venta/update`;
  private endpointHabilitarCanalVenta = `${environment.HOST}/canal-venta/habilitar`;
  private endpointInhabilitarCanalVenta = `${environment.HOST}/canal-venta/inhabilitar`;
  private endpointCanalventaGeneric = `${environment.HOST}/canal-venta`;

  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<CanalVentaJVDTO[]>(
      `${this.endpointGetAllCanalVenta}`,
      {}
    );
  }

  public create(canalVenta: CanalVentaJVDTO) {
    return this.http.post<CanalVentaJVDTO>(
      `${this.endpointCreateCanalVenta}`,
      canalVenta
    );
  }

  public update(canalVenta: CanalVentaJVDTO) {
    return this.http.patch<CanalVentaJVDTO>(
      `${this.endpointUpdateCanalVenta}`,
      canalVenta
    );
  }

  public habilitar(canalVentaId: number) {
    return this.http.patch<any>(
      `${this.endpointHabilitarCanalVenta}/${canalVentaId}`,
      {}
    );
  }

  public inhabilitar(canalVentaId: number) {
    return this.http.patch<any>(
      `${this.endpointInhabilitarCanalVenta}/${canalVentaId}`,
      {}
    );
  }
  public updatePriceBox(canalVentaId: number, price: number) {
    return this.http.patch<any>(
      `${this.endpointCanalventaGeneric}/${canalVentaId}/precio-casillero?precioCasillero=${price}`,
      {}
    );
  }
}
