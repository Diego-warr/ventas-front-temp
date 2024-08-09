import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'  
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../dto/ResponseDTO';
import { GrupoClienteJVDTO } from '../dto/GrupoClienteJVDTO';

@Injectable({
  providedIn: 'root'
})
export class GrupoClienteService {

  private endPointGetAll = `${environment.HOST}/grupo-cliente/all`;

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get<ResponseDTO<GrupoClienteJVDTO[]>>(`${this.endPointGetAll}`, {});
  }

}
