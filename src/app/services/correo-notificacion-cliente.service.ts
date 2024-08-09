import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CorreoNotificacionNuevoCliente } from '../dto/CorreoNotificacionNuevoCliente';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CorreoNotificacionClienteService {

  private endPointFindAllActivos = `${environment.HOST}/correo-notificacion-cliente/all-activos`;
  private endPointFindAllInactivos = `${environment.HOST}/correo-notificacion-cliente/all-inactivos`;
  private endpointHabilitar = `${environment.HOST}/correo-notificacion-cliente/habilitar`;
  private endpointInhabilitar = `${environment.HOST}/correo-notificacion-cliente/inhabilitar`;
  private endpontCreate = `${environment.HOST}/correo-notificacion-cliente/create`;

  constructor(private httpclient: HttpClient) { }

  public create(correoNotificacion: CorreoNotificacionNuevoCliente) {
    return this.httpclient.post<ResponseDTO<CorreoNotificacionNuevoCliente>>(`${this.endpontCreate}`, correoNotificacion);
  }

  findAllActivos() {
    return this.httpclient.get<CorreoNotificacionNuevoCliente[]>(`${this.endPointFindAllActivos}`)
  }

  findAllInactivos() {
    return this.httpclient.get<CorreoNotificacionNuevoCliente[]>(`${this.endPointFindAllInactivos}`)
  }

  habilitar(correoNotifClienteId: number) {
    return this.httpclient.patch<any>(`${this.endpointHabilitar}/${correoNotifClienteId}`, {});
  }

  inhabilitar(correoNotifClienteId: number) {
    return this.httpclient.patch<any>(`${this.endpointInhabilitar}/${correoNotifClienteId}`, {});
  }
}
