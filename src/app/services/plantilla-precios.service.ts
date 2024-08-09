import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlantillaPrecioJVBodyDTO } from '../dto/PlantillaPrecioJVBodyDTO';
import { PlantillaPrecioJVResponseDTO } from '../dto/PlantillaPrecioJVResponseDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class PlantillaPreciosService {

  private endpointGetAllPlantillaPrecio = `${environment.HOST}/plantilla-precio/all`;
  private endpointCreatePlantillaPrecio  = `${environment.HOST}/plantilla-precio/create`;
  private endpointUpdatePlantillaPrecio = `${environment.HOST}/plantilla-precio/update`;
  private endPointHabilitarPlantillaPrecio = `${environment.HOST}/plantilla-precio/habilitar`;
  private endPointDeshabilitarPlantillaPrecio = `${environment.HOST}/plantilla-precio/inhabilitar`;

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<ResponseDTO<PlantillaPrecioJVResponseDTO[]>>(`${this.endpointGetAllPlantillaPrecio}`, {});
  }

  public create(plantilla: PlantillaPrecioJVBodyDTO) {
    return this.http.post<ResponseDTO<PlantillaPrecioJVResponseDTO>>(`${this.endpointCreatePlantillaPrecio}`, plantilla);
  }

  public update(plantilla: PlantillaPrecioJVBodyDTO) {
    return this.http.patch<ResponseDTO<PlantillaPrecioJVResponseDTO>>(`${this.endpointUpdatePlantillaPrecio}`, plantilla);
  }

  public habilitar(plantillaPrecioId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointHabilitarPlantillaPrecio}/${plantillaPrecioId}`, {})
  }

  public inhabilitar(plantillaPrecioId: number) {
    return this.http.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarPlantillaPrecio}/${plantillaPrecioId}`, {})
  }
}
