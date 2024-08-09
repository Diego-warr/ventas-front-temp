import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { ClienteJVDTO } from "./ClienteJVDTO";
import { DetalleDocumentoJVDTO } from "./DetalleDocumentoJVDTO";
import { MedioPagoJVDTO } from "./MedioPagoJVDTO";
import { TipoDocumentoJVDTO } from "./TipoDocumentoJVDTO";

export interface DocumentoJVDTO {

    documentoId: number;

    baseImponible: number;

    canalventaId: CanalVentaJVDTO;

    cliente: ClienteJVDTO;

    clienteDestino: ClienteJVDTO;

    cuenta: String;

    digestvalue: String;

    fechaEmision: Date;

    fechaEnvioxml: Date;

    fechaGeneracionxml: Date;

    fechaVencimiento: Date;

    glosa: String;

    glosa2: String;

    igv: number;

    importe: number;

    impreso: number;

    itinerante: number;

    medioPago: MedioPagoJVDTO;

    moneda: String;

    numero: String;

    observaciones: String;

    opexoneradas: number;

    opgratuitas: number;

    opinafectas: number;

    porcentajeIgv: number;

    saldo: number;

    semana: number;

    semana2: number;

    serie: String;

    situacion: String;

    subdiario: String;

    sujetospot: number;

    ticket: String;

    tipoCambio: number;

    tipoConversion: String;

    tipoDocumento: TipoDocumentoJVDTO;

    tipoOperacion: String;

    detalleDocumentoList: DetalleDocumentoJVDTO[];
}