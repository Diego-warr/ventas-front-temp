import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ResponseDTO} from "../dto/ResponseDTO";
import {UsuarioDTO} from "../dto/UsuarioDTO";
import {UsuarioBodyDTO} from "../dto/UsuarioBodyDTO";
import {RolDTO} from "../dto/RolDTO";
import { VendedorJVDTO } from '../dto/VendedorJVDTO';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private urlEndPoint = `${environment.HOST}/user/all-vendedores`;
  private endPointAllUsuariosRolVenta = `${environment.HOST}/user/all-usuarios-rol-ventas`;
  private endPointCrearUsuario = `${environment.HOST}/user/create`;
  private endPointUpdateUsuario = `${environment.HOST}/user/update`;
  private endPointHabilitarUsuario = `${environment.HOST}/user/habilitar/vendedor`;
  private endPointChangePassword = `${environment.HOST}/user/cambiar-password`;
  private endPointDeshabilitarUsuario = `${environment.HOST}/user/inhabilitar/vendedor`;
  private endPointRoles = `${environment.HOST}/user/all-roles`;
  private endPointUsuarioById = `${environment.HOST}/user/by/`;
  private endPointGetVendedorByUsuarioUsername = `${environment.HOST}/user/by-username/`;
  private endPointAllUsuariosRolVentaHabilitados = `${environment.HOST}/user/all-usuarios-rol-ventas-habilitados`;
  private endPointHabilitarVendedorAuxiliar = `${environment.HOST}/user/habilitar/vendedor-auxiliar`;
  private endPointDeshabilitarVendedorAuxiliar = `${environment.HOST}/user/inhabilitar/vendedor-auxiliar`;

  constructor(private httpclient: HttpClient) {
  }

  public getAllVendedores() {
    return this.httpclient.get<ResponseDTO<UsuarioDTO[]>>(this.urlEndPoint);
  }

  public getAllUsuariosRolVentas() {
    return this.httpclient.get<ResponseDTO<UsuarioDTO[]>>(this.endPointAllUsuariosRolVenta);
  }

  public getAllroles() {
    return this.httpclient.get<ResponseDTO<RolDTO[]>>(this.endPointRoles);
  }

  public crearUsuario(usuario: UsuarioBodyDTO) {
    return this.httpclient.post<ResponseDTO<any>>(this.endPointCrearUsuario, usuario);
  }

  public updateUsuario(usuario: UsuarioBodyDTO) {
    return this.httpclient.put<ResponseDTO<any>>(this.endPointUpdateUsuario, usuario);
  }

  public habilitarUsuario(usuarioId: Number) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointHabilitarUsuario}/?id_vendedor=${usuarioId}`, {})
  }

  public inhabilitarUsuario(usuarioId: Number) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarUsuario}/?id_vendedor=${usuarioId}`, {})
  }

  public usuarioById(usuarioId: number) {
    return this.httpclient.get<ResponseDTO<UsuarioBodyDTO>>(`${this.endPointUsuarioById}${usuarioId}`);
  }

  public vendedorByUsuarioUsername(username: string) {
    return this.httpclient.get<ResponseDTO<VendedorJVDTO>>(`${this.endPointGetVendedorByUsuarioUsername}${username}`);
  }

  public getAllUsuariosRolVentasHabilitados() {
    return this.httpclient.get<ResponseDTO<UsuarioDTO[]>>(this.endPointAllUsuariosRolVentaHabilitados);
  }

  public habilitarVendedorAuxiliar(correo: String) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointHabilitarVendedorAuxiliar}/?correo=${correo}`, {})
  }

  public inhabilitarVendedorAuxiliar(correo: String) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointDeshabilitarVendedorAuxiliar}/?correo=${correo}`, {})
  }

  public changePassword(username: string, oldPassword: string, newPassword: string) {
    return this.httpclient.patch<ResponseDTO<any>>(`${this.endPointChangePassword}/${username}?new_password=${newPassword}&old_password=${oldPassword}`, {})
  }

}
