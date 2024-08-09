import { OrdenPedidoJVResponseCustomDTO } from "./OrdenPedidoJVResponseCustomDTO";

export interface OrdenPedidoJVPageResponse {

    content: OrdenPedidoJVResponseCustomDTO[],
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    numberOfElements: number
}