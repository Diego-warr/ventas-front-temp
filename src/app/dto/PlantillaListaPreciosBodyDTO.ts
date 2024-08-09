import { DetallePlantillaListaPreciosDTO } from "./DetallePlantillaListaPreciosDTO";

export interface PlantillaListaPreciosBodyDTO {

    plantillaListaPreciosId: number;
    fechaInicio: Date;
    fechaFin: Date;
    lineaNegocioJVId: number;
    canalVentaJVId: number;
    precioBase : number;
    rangoSuperior : number;
    rangoInferior : number;
    descripcion: string;
    estado: number;
    detallesListaPrecios: DetallePlantillaListaPreciosDTO[];
}
