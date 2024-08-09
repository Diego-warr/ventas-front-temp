import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OperacionGratuitaJVDTO } from '../dto/OperacionGratuitaJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class OperacionGratuitaService {

  private endPointGetAllOperacionGratuitas = `${environment.HOST}/operacion-gratuita/all`;

  constructor(private http: HttpClient) { }

  public getAllOperacionGratuita() {
    return this.http.get<ResponseDTO<OperacionGratuitaJVDTO[]>>(`${this.endPointGetAllOperacionGratuitas}`)
  }
}
