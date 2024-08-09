import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResponseDTO} from "../dto/ResponseDTO";
import {ClienteDTO} from "../dto/ClientesDTO";
import {ClientePageResponse} from "../dto/ClientePageResponse";
import {EncargadoPagosDTO} from "../dto/EncargadoPagosDTO";
import { ClienteResponseDTO } from '../dto/ClienteResponseDTO';
import { ClienteJVBodyDTO } from '../dto/ClienteJVBodyDTO';
import { DireccionBodyDTO } from '../dto/DireccionBodyDTO';
import { ClienteCustomJVDTO } from '../dto/ClienteCustomJVDTO';
import { DireccionResponseDTO } from '../dto/DireccionResponseDTO';
import { UbigeoDTO } from '../dto/UbigeoDTO';
import { ClienteFacturadoDeJVDTO } from '../dto/ClienteFacturadoDeJVDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endpointClientesByUsuario = `${environment.HOST}/cliente/clientes-from-vendedor`;
  private endpointDesasignarCliente = `${environment.HOST}/cliente/desasignar-vendedor`;
  private endPointClientesSinAsignar = `${environment.HOST}/cliente/sin-asignar`;
  private endPointClientesSinAsignarByRazonSocial = `${environment.HOST}/cliente/sin-asignar-by-razonsocial`;
  private endPointAsiganrClienteToUsuario = `${environment.HOST}/user/reasignar-cliente-vendedor`;
  private endpointAllclientes = `${environment.HOST}/cliente/all`;
  private endpointAllclientesActivos = `${environment.HOST}/cliente/all-activos`;
  private endpointAllclientesInactivos = `${environment.HOST}/cliente/all-inactivos`;
  private endpointFindByFilters = `${environment.HOST}/cliente/by-filters`;
  private endpointAllUbigeo = `${environment.HOST}/cliente/ubigeo`;
  private endpointAllclientesCustom = `${environment.HOST}/cliente/all-custom`;
  private endpointAllclientesFacturadosDe = `${environment.HOST}/cliente/all-facturados-de`;
  private endPointClientesByPage = `${environment.HOST}/cliente/clientes-page`;
  private endPointClientesLikeRazonSocial = `${environment.HOST}/cliente/clientes-like-razon-social`;
  private endPointClientesLikeNombreComercial = `${environment.HOST}/cliente/clientes-like-nombre-comercial`;
  private endPointClientesLikeNumDoc = `${environment.HOST}/cliente/clientes-like-num-doc`;
  private endPointClientesLikeCodigo = `${environment.HOST}/cliente/clientes-like-codigo`;
  private endPointClienteById = `${environment.HOST}/cliente/by-id`;
  private endPointCreateCliente = `${environment.HOST}/cliente/create`;
  private endPointUpdateCliente = `${environment.HOST}/cliente/update`;
  private endPointAllByCanalVentaId = `${environment.HOST}/cliente/by-canal-venta`;

  private endPointClienteEncargadoPagos = `${environment.HOST}/cliente/encargados-pagos-cliente`;
  private endPointEncargadoPagosById = `${environment.HOST}/cliente/encargados-pagos`;
  private endPointEncargadoPagosGuardar = `${environment.HOST}/cliente/save-encargado-pagos`;
  private endPointEncargadoPagosActualizar = `${environment.HOST}/cliente/update-encargado-pagos`;
  private endPointHabilitarEncargadoPagos = `${environment.HOST}/cliente/habilitar-encargado-pagos`;
  private endPointInhabilitarEncargadoPagos = `${environment.HOST}/cliente/inhabilitar-encargado-pagos`;
  private endPointAllAlmacenesByClienteId = `${environment.HOST}/cliente/all-direcciones`;
  private endPointCreateDireccionEntregaCliente = `${environment.HOST}/cliente/agregar-actualizar-direccion`;
  private endPointClientesFacturadosByNumDocumento = `${environment.HOST}/cliente/clientes-facturados`;
  private endPointReasignarClientesAsociadosDeUnVendedorAOtro = `${environment.HOST}/cliente/reasignar-clientes-asociados-a-otro-vendedor`;
  private endPointCambiarEstadoCliente = `${environment.HOST}/cliente/habilitar-cliente`;

  constructor(private httpclient: HttpClient) {
  }

  public clientesByUsuario(usuarioId: number) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endpointClientesByUsuario}?usuario_id=${usuarioId}`, {})
  }

  public findByCanalVentaId(canalVentaId: number) {
    return this.httpclient.get<ClienteResponseDTO>(`${this.endPointAllByCanalVentaId}?canal_venta_id=${canalVentaId}`)
  }

  public desasignarCliente(usuarioId: number, clienteId: number) {
    return this.httpclient.patch<ResponseDTO<Number>>(`${this.endpointDesasignarCliente}?usuario_id=${usuarioId}&cliente_id=${clienteId}`, {})
  }

  public clientesSinAsignar(page: number, size: number) {
    return this.httpclient.get<ResponseDTO<ClientePageResponse>>(`${this.endPointClientesSinAsignar}?page=${page}&size=${size}`, {})
  }

  public clientesSinAsignarByRazonSocial(razonSocial: string) {
    return this.httpclient.get<ResponseDTO<ClienteResponseDTO[]>>(`${this.endPointClientesSinAsignarByRazonSocial}?razon_social=${razonSocial}`, {})
  }

  public asignarClienteToUsuario(usuarioId: number, clienteId: number) {
    return this.httpclient.patch<ResponseDTO<ClienteDTO>>(`${this.endPointAsiganrClienteToUsuario}?usuario_id=${usuarioId}&cliente_id=${clienteId}`, {})
  }

  public allClientes() {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endpointAllclientes}`, {})
  }

  public allClientesActivos(flag: number) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endpointAllclientesActivos}/${flag}`)
  }

  public allClientesInactivos(flag: number) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endpointAllclientesInactivos}/${flag}`)
  }

  public findByFilters(estado: string, canalVentaId: number) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endpointFindByFilters}?estado=${estado}&canal_venta_id=${canalVentaId}`)
  }

  public allUbigeo() {
    return this.httpclient.get<UbigeoDTO[]>(`${this.endpointAllUbigeo}`, {})
  }

  public allClientesCustom() {
    return this.httpclient.get<ResponseDTO<ClienteCustomJVDTO[]>>(`${this.endpointAllclientesCustom}`, {})
  }

  public allClientesFacturadosDe() {
    return this.httpclient.get<ResponseDTO<ClienteFacturadoDeJVDTO[]>>(`${this.endpointAllclientesFacturadosDe}`, {})
  }

  public clientesByPage(razonSocial: string, page: number, size: number) {
    return this.httpclient.get<ResponseDTO<ClientePageResponse>>(`${this.endPointClientesByPage}?page=${page}&size=${size}&razonSocial=${razonSocial}`, {})
  }

  public clienteLikeRazonSocial(razonSocial: string) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endPointClientesLikeRazonSocial}?razon_social=${razonSocial}`, {})
  }

  public clienteLikeNombreComercial(nombreComercial: string) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endPointClientesLikeNombreComercial}?nombre_comercial=${nombreComercial}`, {})
  }

  public clienteLikeNumDoc(numdoc: string) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endPointClientesLikeNumDoc}?num_doc=${numdoc}`, {})
  }

  public clientesLikeCodigo(codigo: string) {
    return this.httpclient.get<ResponseDTO<ClienteDTO[]>>(`${this.endPointClientesLikeCodigo}?codigo=${codigo}`, {})
  }

  public clienteById(clienteId: number) {
    return this.httpclient.get<ResponseDTO<ClienteDTO>>(`${this.endPointClienteById}/${clienteId}`, {});
  }

  public create(cliente: ClienteJVBodyDTO) {
    return this.httpclient.post<ResponseDTO<ClienteDTO>>(`${this.endPointCreateCliente}`, cliente);
  }

  public update(cliente: ClienteJVBodyDTO) {
    return this.httpclient.put<ResponseDTO<ClienteDTO>>(`${this.endPointUpdateCliente}`, cliente);
  }

  public encargadosPagosByClienteId(clienteId: number) {
    return this.httpclient.get<ResponseDTO<EncargadoPagosDTO[]>>(`${this.endPointClienteEncargadoPagos}/${clienteId}`, {});
  }

  public encargadoPagosById(encargadoPagosId: number) {
    return this.httpclient.get<ResponseDTO<EncargadoPagosDTO>>(`${this.endPointEncargadoPagosById}/${encargadoPagosId}`);
  }

  public encargadoPagosGuardar(encargadoPagosDTO: EncargadoPagosDTO) {
    return this.httpclient.post<ResponseDTO<any>>(`${this.endPointEncargadoPagosGuardar}`, encargadoPagosDTO);
  }

  public encargadoPagosActualizar(encargadoPagosDTO: EncargadoPagosDTO) {
    return this.httpclient.put<ResponseDTO<any>>(`${this.endPointEncargadoPagosActualizar}`, encargadoPagosDTO);
  }

  public habilitarEncargadoPagos(encargadoPagosId: number) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointHabilitarEncargadoPagos}?encargadoPagosId=${encargadoPagosId}`, {});
  }

  public inhabilitarEncargadoPagos(encargadoPagosId: number) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointInhabilitarEncargadoPagos}?encargadoPagosId=${encargadoPagosId}`, {});
  }

  public getAllAlmacenesByClienteId(clienteId: number) {
    return this.httpclient.get<DireccionResponseDTO[]>(`${this.endPointAllAlmacenesByClienteId}/${clienteId}`);
  }

  public createUpdateDireccionEntrega(direccionEntrega: DireccionBodyDTO) {
    return this.httpclient.post<any>(`${this.endPointCreateDireccionEntregaCliente}`, direccionEntrega);
  }

  public getAllClientesFacturadosByNumDocumento(numeroDocumento: String) {
    return this.httpclient.get<any>(`${this.endPointClientesFacturadosByNumDocumento}/${numeroDocumento}`);
  }

  public reasignarClientesAsociadosDeUnVendedorAOtro(clienteId: number, usuarioId: number) {
    return this.httpclient.post<ResponseDTO<ClienteDTO>>(`${this.endPointReasignarClientesAsociadosDeUnVendedorAOtro}?cliente_id=${clienteId}&usuario_id=${usuarioId}`, {})
  }

  public cambiarEstadoClienteById(clienteId : number, estado : String){
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointCambiarEstadoCliente}?cliente_id=${clienteId}&estado=${estado}`, {})
  }
}
