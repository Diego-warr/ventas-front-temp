import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { ClienteJVDTO } from "./ClienteJVDTO";
import { DetalleOrdenPedidoJVCustomDTO } from "./DetalleOrdenPedidoJVCustomDTO";
import { TipoDocumentoJVDTO } from "./TipoDocumentoJVDTO";
import { VendedorJVDTO } from "./VendedorJVDTO";

export interface OrdenPedidoJVResponseCustomDTO {

    ordenPedidoId: number;

    tipoOrden: String;

    serie: String;

    numero: String;

    fecha: Date;

    semana: number;

    tipoDocumento: TipoDocumentoJVDTO;

    cliente: ClienteJVDTO;

    clienteDestino: ClienteJVDTO;

    fechaVencimiento: Date;

    ordenCompra: String;

    tienda: String;

    canalventa: CanalVentaJVDTO;

    origen: String;

    fechaEntrega: Date;

    horaEntrega: String;

    lugarEntrega: String;

    observaciones: String;

    lote: String;

    vendedor: VendedorJVDTO;

    usuarioCreacion: String;

    fechaCreacion: Date;

    usuarioModificacion: String;

    fechaModificacion: Date;

    estado: String;

    importeTotal? : number;

    tipoMoneda: string;

    detalleOrdenPedidoList: DetalleOrdenPedidoJVCustomDTO[];
}