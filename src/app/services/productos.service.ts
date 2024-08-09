import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../dto/ResponseDTO';
import { ArticuloResponseDTO } from '../dto/ArticuloResponseDTO';
import { ArticuloPrecioJVDTO } from '../dto/ArticuloPrecioJVDTO';
import { ArticuloJVDTO } from '../dto/ArticuloJVDTO';
import { ArticuloCustomJVDTO } from '../dto/ArticuloCustomJVDTO';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private endpointProductosHabilitados = `${environment.HOST}/articulo/articulos-activos`;
  private endpointUpdateArticuloPrecio = `${environment.HOST}/articuloPrecio/articuloPrecio/`;
  private endpointAllProductos = `${environment.HOST}/articulo/all-articulosJV`;
  private endpointAllArticulosHabilitados = `${environment.HOST}/articulo/all-articulos`;
  private endpointAllArticulosHabilitadosCustom = `${environment.HOST}/articulo/all-articulos-habilitados-custom`;
  private endpointGetProductoById = `${environment.HOST}/articulo/getById`;
  private endpointInhabilitarProducto = `${environment.HOST}/articulo/inhabilitar-articuloJV`;
  private endpointHabilitarProducto = `${environment.HOST}/articulo/habilitar-articuloJV`;
  private endpointUpdateArticuloLineaNegocioId = `${environment.HOST}/articulo/update-lineanegocio`;
  private endpointGetArticulo = `${environment.HOST}/articulo`;

  constructor(private http: HttpClient) {}

  public getArticulosActivos() {
    return this.http.get<ResponseDTO<ArticuloResponseDTO[]>>(
      this.endpointProductosHabilitados
    );
  }

  public updateProducto(
    productoPrecio: ArticuloPrecioJVDTO,
    articuloId: Number,
    lineaNegocioId: Number
  ) {
    return this.http.post<ResponseDTO<any>>(
      `${this.endpointUpdateArticuloPrecio}${articuloId}/articulo/${lineaNegocioId}`,
      productoPrecio,
      {}
    );
  }

  public allArticulos() {
    return this.http.get<ResponseDTO<ArticuloResponseDTO[]>>(
      this.endpointAllProductos
    );
  }

  public allArticulosHabilitados() {
    return this.http.get<ResponseDTO<ArticuloResponseDTO[]>>(
      this.endpointAllArticulosHabilitados
    );
  }

  public allArticulosHabilitadosCustom() {
    return this.http.get<ResponseDTO<ArticuloCustomJVDTO[]>>(
      this.endpointAllArticulosHabilitadosCustom
    );
  }

  public inhabilitarProducto(articuloId: Number) {
    return this.http.patch<ResponseDTO<any>>(
      `${this.endpointInhabilitarProducto}?articulo_id=${articuloId}`,
      {}
    );
  }

  public habilitarProducto(articuloId: Number) {
    return this.http.patch<ResponseDTO<any>>(
      `${this.endpointHabilitarProducto}?articulo_id=${articuloId}`,
      {}
    );
  }

  public getById(articuloId: number | string) {
    return this.http.get<ResponseDTO<ArticuloJVDTO>>(
      `${this.endpointGetProductoById}/${articuloId}`,
      {}
    );
  }

  public getArticulo(articuloId: number | string) {
    return this.http.get<ResponseDTO<ArticuloJVDTO>>(
      `${this.endpointGetArticulo}/${articuloId}`,
      {}
    );
  }

  public updateArticuloLineaNegocioId(
    lineanegocioId: number,
    articuloId: number
  ) {
    return this.http.patch<ResponseDTO<any>>(
      `${this.endpointUpdateArticuloLineaNegocioId}?articulo_id=${articuloId}&lineanegocio_id=${lineanegocioId}`,
      {}
    );
  }
}
