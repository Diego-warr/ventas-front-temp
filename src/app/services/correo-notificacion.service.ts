import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { CorreoNotificacionDTO } from '../dto/CorreoNotificacionDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CorreoNotificacionService {

  private endPointCreateCorreoNotificacion = `${environment.HOST}/correo_notificacion/create`;
  private endPointFindAllByCanalVentaId = `${environment.HOST}/correo_notificacion/by-canal-venta`;
  private endPointHabilitarCorreoNotificacion = `${environment.HOST}/correo_notificacion/habilitar-canalVenta-correo`;
  private endPointInhabilitarCorreoNotificacion = `${environment.HOST}/correo_notificacion/inhabilitar-canalVenta-correo`;

  constructor(private httpclient: HttpClient) { }

  public create(correoNotificacion: CorreoNotificacionDTO) {
    return this.httpclient.post<ResponseDTO<CorreoNotificacionDTO>>(`${this.endPointCreateCorreoNotificacion}`, correoNotificacion);
  }

  public findAllByCanalVentaId(canalVentaId: number) {
    return this.httpclient.get<CorreoNotificacionDTO[]>(`${this.endPointFindAllByCanalVentaId}/${canalVentaId}`)
  }

  public habilitar(canalVentaId: number, correo: String) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointHabilitarCorreoNotificacion}?correo=${correo}&id_canalVenta=${canalVentaId}`, {})
  }

  public inhabilitar(canalVentaId: number, correo: String) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointInhabilitarCorreoNotificacion}?correo=${correo}&id_canalVenta=${canalVentaId}`, {})
  }

}
