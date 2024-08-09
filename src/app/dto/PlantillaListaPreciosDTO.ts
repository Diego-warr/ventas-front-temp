import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { DetallePlantillaListaPreciosDTO } from "./DetallePlantillaListaPreciosDTO";
import { LineaNegocioJVDTO } from "./LineaNegocioJVDTO";

export interface PlantillaListaPreciosDTO {

    plantillaListaPreciosId: number;
    fechaInicio: Date;
    fechaFin: Date;
    lineaNegocioJVId: LineaNegocioJVDTO | null;
    canalVentaJVId: CanalVentaJVDTO | null;
    precioBase : number;
    rangoSuperior : number;
    rangoInferior : number;
    descripcion: string;
    codigoArticulo: string;
    estado: number;
    detallesListaPrecios: DetallePlantillaListaPreciosDTO[];
}
