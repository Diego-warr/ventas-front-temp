import { LineaNegocioDTO } from "./LineaNegocioDTO";

export interface ArticuloBodyDTO {
    articuloId: number;
    nombreArticulo?: String;
    codigoArticulo?: String,
    descripcionArticulo?: String,
    precio?: number,
    precioMinimo?: number,
    codigoBarras?: String,
    articuloCuentaIngreso?: string,
    articulocuentaSalida?: string,
    status?: string,
    lineaNegocioId?: LineaNegocioDTO,
    fechaInicial?: Date,
    fechaFinal?: Date
}