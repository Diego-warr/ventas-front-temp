import {RolDTO} from "./RolDTO";
import {LineaNegocioDTO} from "./LineaNegocioDTO";
import {ClienteDTO} from "./ClientesDTO";

export interface UsuarioBodyDTO {

  usuarioId?: number;
  username?: String;
  password?: String;
  correo?: String;
  nombres?: String;
  apellidos?: String;
  status?: String;
  roles?: RolDTO[];
  lineaNegocios?: LineaNegocioDTO[];
  clientes?: ClienteDTO[];
  dni?: string;
  vendedorAuxiliar?: String | null;
  vendedorDocumentoSerie?: string | null;
  permitirEditar?: string;
}
