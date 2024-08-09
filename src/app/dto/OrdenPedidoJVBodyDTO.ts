import { DetalleOrdenPedidoJVDTO } from "./DetalleOrdenPedidoJVDTO";

export interface OrdenPedidoJVBodyDTO {

    ordenPedidoId: number | null;

    tipoOrden: string;

    serie: string;

    numero: string;

    fecha: Date;

    semana: number;

    tipoDocumentoId: number;

    clienteId: number | null;

    clienteDestinoId: number | null;

    fechaVencimiento: Date;

    ordenCompra: string;

    tienda: string;

    canalVentaId: number;

    origen: string;

    fechaEntrega: Date;

    horaEntrega: string;

    lugarEntrega: string;

    observaciones: string;

    lote: string;

    vendedorId: number;

    usuarioCreacion: string;

    fechaCreacion: Date | null;

    usuarioModificacion: string | null;

    fechaModificacion: Date | null;

    estado: string;

    almacenSedeOrigenId: number | null;

    almacenSedeDestinoId: number | null;

    plantel: string | null;

    plantelId: number | null;

    tipoMoneda: string;

    detalleOrdenPedidoList: DetalleOrdenPedidoJVDTO[];
}