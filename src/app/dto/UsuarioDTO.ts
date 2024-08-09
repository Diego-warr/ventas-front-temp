import {RolDTO} from "./RolDTO";
import {LineaNegocioDTO} from "./LineaNegocioDTO";
import {ClienteDTO} from "./ClientesDTO";

export interface UsuarioDTO {
  usuarioId: number;
  username?: string
  correo?: string
  nombres?: string
  apellidos?: string
  status?: string
  roles?: RolDTO[]
  lineasNegocios?: LineaNegocioDTO[]
  clientes?: ClienteDTO[]
  vendedorAuxiliar?: string | null
  dni?: string
}
