import { CanalVentaDTO } from "./CanalVentaDTO";
import { CondicionPagoDTO } from "./CondicionPagoDTO";
import { GrupoDeClientesDTO } from "./GrupoDeClientesDTO";
import { PersonaContactoDTO } from "./PersonaContactoDTO";
import { TipoDocumentoDTO } from "./TipoDocumentoDTO";
import { TipoPersonaDTO } from "./TipoPersonaDTO";
import { UsuarioDTO } from "./UsuarioDTO";

export interface ClienteResponseDTO {

    clienteId: number;

    codigo: string;

    tipoDocumentoId: TipoDocumentoDTO;

    numDocumento: string;

    razonSocial: string;

    nombreComercial?: string;

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

    dniRepresentanteLegal?: string;

    usuarioId: UsuarioDTO;

    departamento: String;

    provincia: String;

    distrito: String;

    direccion: String;

    referencia: String;

    status?: string;

    condicionPagoId: CondicionPagoDTO;

    personaContactoId: PersonaContactoDTO;

    grupoDeClientesId: GrupoDeClientesDTO;

    tipoPersonaId: TipoPersonaDTO;

    clienteNumeroDocumentoIdentidadReal: string;

    carpetaId: number;

    clienteCredito: number;

    clienteDiasCredito: number;

    clienteGarantiaCredito: String;

    clienteLineaCredito: number;
}