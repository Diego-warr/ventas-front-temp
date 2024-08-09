import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CondicionPagoJVDTO } from '../dto/CondicionPagoJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CondicionPagoService {

  private endpointAllCondicionPago = `${environment.HOST}/condicion-pago/all`;

  constructor(private http: HttpClient) { }

  public all() {
    return this.http.get<ResponseDTO<CondicionPagoJVDTO[]>>(`${this.endpointAllCondicionPago}`, {})
  }

}
