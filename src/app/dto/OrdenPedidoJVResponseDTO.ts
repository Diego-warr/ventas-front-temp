import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { ClienteJVDTO } from "./ClienteJVDTO";
import { DetalleOrdenPedidoJVDTO } from "./DetalleOrdenPedidoJVDTO";
import { TipoDocumentoJVDTO } from "./TipoDocumentoJVDTO";
import { VendedorJVDTO } from "./VendedorJVDTO";

export interface OrdenPedidoJVResponseDTO {

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

    canalVenta: CanalVentaJVDTO;

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

    almacenSedeOrigenId: number;

    almacenSedeDestinoId: number;

    almacenSedeOrigenNombre: string;

    almacenSedeDestinoNombre: string;

    importeTotal? : number;

    detalleOrdenPedidoList: DetalleOrdenPedidoJVDTO[];
}