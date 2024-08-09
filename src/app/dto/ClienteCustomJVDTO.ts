
import { TipoDocumentoIdentidadJVDTO } from "./TipoDocumentoIdentidadJVDTO";

export interface ClienteCustomJVDTO {

    clienteId: number;

    clienteRazonSocial: string;

    tipoDocumentoIdentidadId: TipoDocumentoIdentidadJVDTO;

    clienteNumeroDocumentoIdentidad: string;

    clienteNombreComercial: string;

    clienteDireccion: string;

    cliRealId: number;

    cliRealNroDoc: number;

    cliRealRazonSocial: string;

    cliRealNombreComercial: string;
}