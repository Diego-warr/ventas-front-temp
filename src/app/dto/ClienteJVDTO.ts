import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { CarpetaJVDTO } from "./CarpetaJVDTO";
import { TipoDocumentoIdentidadJVDTO } from "./TipoDocumentoIdentidadJVDTO";

export interface ClienteJVDTO {

    clienteId: number;

    clienteTipoPersona: string;

    tipoDocumentoIdentidadId: TipoDocumentoIdentidadJVDTO;

    clienteNumeroDocumentoIdentidad: String;

    clienteRazonSocial?: String;

    clienteNombreComercial: String;

    clienteApellidoPaterno: String;

    clienteApellidoMaterno: String;

    clienteNombres: String;

    clienteDireccion: String;

    clienteDepartamento: String;

    clienteProvincia: String;

    clienteDistrito: String;

    clienteDireccionReferencia: String;

    canalVentaId: CanalVentaJVDTO;

    carpetaId: CarpetaJVDTO;

    clienteCredito: number;

    clienteDiasCredito: number;

    clienteTipoCliente: String;

    clienteNumeroDocumentoIdentidadReal: String;

    clienteTelefono: String;

    clienteMovil: String;

    clienteEmail: String;

    clienteEstadoCivil: String;

    clienteGarantiaCredito: String;

    clienteLineaCredito: number;

    clienteCodigoPagador: String;

}