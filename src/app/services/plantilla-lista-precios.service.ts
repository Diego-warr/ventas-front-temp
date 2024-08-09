import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetallePlantillaListaPreciosDTO } from '../dto/DetallePlantillaListaPreciosDTO';
import { PlantillaListaPreciosBodyDTO } from '../dto/PlantillaListaPreciosBodyDTO';
import { PlantillaListaPreciosDTO } from '../dto/PlantillaListaPreciosDTO';
import { ResponseDTO } from '../dto/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class PlantillaListaPreciosService {

  private endpointGetAllListaPlantillaPrecio = `${environment.HOST}/plantilla-lista-precios/all`;
  private endpointDeleteDetalleById = `${environment.HOST}/plantilla-lista-precios/delete`;
  private endpointUpdatePlantillaPrecio = `${environment.HOST}/plantilla-lista-precios/update`;
  private endpointCreatePlantillaPrecio  = `${environment.HOST}/plantilla-lista-precios/create`;
  private endPointGetByRangoFechas = `${environment.HOST}/plantilla-lista-precios/find-by-fechas`;
  private endPointGetByFechaAndCanalVentaId = `${environment.HOST}/plantilla-lista-precios/precio-articulo`;


  constructor(private http: HttpClient) { }


  public getAll() {
    return this.http.get<ResponseDTO<PlantillaListaPreciosDTO[]>>(`${this.endpointGetAllListaPlantillaPrecio}`, {});
  }

  public create(plantilla: PlantillaListaPreciosBodyDTO) {
    return this.http.post<ResponseDTO<PlantillaListaPreciosDTO>>(`${this.endpointCreatePlantillaPrecio}`, plantilla);
  }

  public getByRangoFechas(fechaInicial: Date, fechaFinal: Date) {
    return this.http.get<ResponseDTO<PlantillaListaPreciosDTO[]>>(`${this.endPointGetByRangoFechas}?fecha_inicial=${fechaInicial}&fecha_final=${fechaFinal}`, {});
  }

  public update(plantilla: PlantillaListaPreciosBodyDTO) {
    return this.http.put<ResponseDTO<PlantillaListaPreciosDTO[]>>(`${this.endpointUpdatePlantillaPrecio}`, plantilla);
  }
  
  public getPrecioArticuloByFechaAndCanalVenta(fecha: string, articuloId: number, canalVentaId: number) {
    return this.http.get<ResponseDTO<DetallePlantillaListaPreciosDTO>>(`${this.endPointGetByFechaAndCanalVentaId}?articulo_id=${articuloId}&canal_venta_id=${canalVentaId}&fecha=${fecha}&`);
  }

  public deleteDetalleById(detallePlantillaId: number) {
    return this.http.delete<ResponseDTO<any>>(`${this.endpointDeleteDetalleById}?detalle_id=${detallePlantillaId}`, {});
  }

}
