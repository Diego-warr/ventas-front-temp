import { ArticuloJVDTO } from "./ArticuloJVDTO";
import { OrdenPedidoJVBodyDTO } from "./OrdenPedidoJVBodyDTO";

export interface DetalleOrdenPedidoJVCustomDTO {

    detalleOrdenPedidoId: number;

    ordenPedido: OrdenPedidoJVBodyDTO;

    secuencia: number;

    articulo: ArticuloJVDTO;

    cantidad: number;

    unidades: number;

    observacion: string;

    precio: number;

    operacionGratuita: string;
}