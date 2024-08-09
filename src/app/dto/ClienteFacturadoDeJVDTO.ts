import { TipoDocumentoIdentidadJVDTO } from "./TipoDocumentoIdentidadJVDTO";

export interface ClienteFacturadoDeJVDTO {

    clienteId: number;

    clienteNombreComercial: string;

    clienteRazonSocial: string;

    tipoDocumentoIdentidadId: TipoDocumentoIdentidadJVDTO;

    clienteNumeroDocumentoIdentidad: string;

    clienteApellidoPaterno: string;

    clienteApellidoMaterno: string

    clienteNombres: string;
}