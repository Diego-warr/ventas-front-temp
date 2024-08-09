import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MedioPagoJVDTO } from '../dto/MedioPagoJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  private endpointAllMediosPago = `${environment.HOST}/medio-pago/all`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<MedioPagoJVDTO[]>>(`${this.endpointAllMediosPago}`, {})
  }

}
