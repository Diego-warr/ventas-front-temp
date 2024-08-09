export interface DetalleOrdenPedidoItemsOPJVDTO {
  detalleOrdenPedidoId: number;

  ordenPedidoId: number;

  secuencia: number;

  articuloId: number;

  articuloCodigo: string;

  articuloDescripcion: string;

  cantidad: number;

  unidades: number;

  observacion: string;

  precio: number;

  operacionGratuita: string | null;

  pesoPromedio: number;
}
