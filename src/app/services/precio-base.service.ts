import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrecioBaseJVBodyUpdateDTO } from '../dto/PrecioBaseJVBodyUpdateDTO';
import { PrecioBaseJVDTO } from '../dto/PrecioBaseJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class PrecioBaseService {

  private endpointGetAllPreciosBase = `${environment.HOST}/precio-base/all`;
  private endpointUpdatePrecioBase = `${environment.HOST}/precio-base/update`;
  private endPointHabilitarPrecioBase = `${environment.HOST}/precio-base/habilitar`;
  private endPointDeshabilitarPrecioBase = `${environment.HOST}/precio-base/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<PrecioBaseJVDTO[]>>(`${this.endpointGetAllPreciosBase}`, {});
  }

  public update(precioBase: PrecioBaseJVBodyUpdateDTO) {
    return this.http.patch<ResponseDTO<PrecioBaseJVDTO>>(`${this.endpointUpdatePrecioBase}`, precioBase);
  }

  public habilitar(precioBaseId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointHabilitarPrecioBase}/${precioBaseId}`, {})
  }

  public inhabilitar(precioBaseId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarPrecioBase}/${precioBaseId}`, {})
  }
}
