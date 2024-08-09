import { EmpaqueDTO } from "./EmpaqueDTO";
import { FamiliaDTO } from "./FamiliaDTO";
import { LineaNegocioDTO } from "./LineaNegocioDTO";
import { UnidadMedidaJVDTO } from "./UnidadMedidaJVDTO";

export interface ArticuloResponseDTO {
    articuloId: number;
    nombreArticulo: String;
    descripcionArticulo: String;
    codigoArticulo: String;
    unidadMedidaId1: UnidadMedidaJVDTO;
    unidadMedidaId2?: UnidadMedidaJVDTO;
    precio: number;
    precioMinimo: number
    familiaId: FamiliaDTO;
    codigoBarras: string;
    articuloHabilitado: number;
    codigoArticuloAlterno: string;
    mostrarCodigoArticuloAlterno: number;
    empaqueId: EmpaqueDTO;
    articuloCuentaIngreso: string;
    articulocuentaSalida: string;
    lineaNegocioId: LineaNegocioDTO;
    status: string;
    fechaInicial: Date;
    fechaFinal: Date;
}