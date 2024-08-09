import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarpetaJVDTO } from '../dto/CarpetaJVDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {

  private endpointGetAllCarpetas = `${environment.HOST}/carpeta/all`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<CarpetaJVDTO[]>>(`${this.endpointGetAllCarpetas}`, {});
  }
}
