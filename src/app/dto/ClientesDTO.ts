import {LineaNegocioDTO} from "./LineaNegocioDTO";
import {TipoDocumentoDTO} from "./TipoDocumentoDTO";
import {CanalVentaDTO} from "./CanalVentaDTO";
import {PersonaContactoDTO} from "./PersonaContactoDTO";
import {GrupoDeClientesDTO} from "./GrupoDeClientesDTO";
import {TipoPersonaDTO} from "./TipoPersonaDTO";
import {CondicionPagoDTO} from "./CondicionPagoDTO";
import {UsuarioDTO} from "./UsuarioDTO";
import { GrupoClienteJVDTO } from "./GrupoClienteJVDTO";
import { CondicionPagoJVDTO } from "./CondicionPagoJVDTO";
import { MedioPagoJVDTO } from "./MedioPagoJVDTO";

export interface ClienteDTO {

  clienteId: number;

  codigo: string;

  cardCode: string;

  tipoDocumentoId: TipoDocumentoDTO;

  numDocumento: string;

  razonSocial: string;

  nombreComercial: string;

  tipo: String;

  nacionalidad: string;

  grupoclientes: string;

  canalVentaId: CanalVentaDTO;

  giroNegocio?: string;

  telefono1?: string;

  telefono2?: string;

  celular?: string;

  fax: string;

  condicionDePago: string;

  tipoMoneda: string;

  correoElectronico: string;

  codigoDeRetencion: string;

  proveedor: string;

  transportista: string;

  agenteDeRetencion: string;

  buenContribuyente: string;

  personaNaturalSinRiesgo: string;

  personaNaturalConriesgo: string;

  nombreRepresentanteLegal?: string;

  entidadExcluidaDePercepcionIGV: string;

  tipoPersona: string;

  apellidoPaterno: string;

  apellidoMaterno: string;

  primerNombre?: string;

  segundoNombre?: string;

  estadoCivil: string;

  dniRepresentanteLegal?: string;

  usuarioId: UsuarioDTO;

  departamento: string;

  provincia: string;

  distrito: string;

  direccion: string;

  referencia: string;

  status?: string;

  //condicionPagoId: CondicionPagoDTO;

  condicionPagoId: CondicionPagoJVDTO;

  personaContactoId: PersonaContactoDTO;

  grupoClienteId: GrupoClienteJVDTO;

  grupoDeClientesId: GrupoDeClientesDTO;

  tipoPersonaId: TipoPersonaDTO;

  clienteNumeroDocumentoIdentidadReal: string;

  carpetaId: number;

  clienteCredito: number;

  clienteDiasCredito: number;

  clienteGarantiaCredito: string;

  clienteLineaCredito: number;

  mediopagoId: MedioPagoJVDTO;

  fechaNacimiento: Date | null;
}
