import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../dto/ResponseDTO';
import { AlmacenSedeJVDTO } from '../dto/AlmacenSedeJVDTO';

@Injectable({
  providedIn: 'root'
})
export class AlmacenSedeService {

  private endPointAllAlmacenesSede = `${environment.HOST}/user/almacenes-sede`;

  constructor(private http: HttpClient) { }

  public getAllAlmacenesSede() {
    return this.http.get<ResponseDTO<AlmacenSedeJVDTO[]>>(`${this.endPointAllAlmacenesSede}`);
  }

}
