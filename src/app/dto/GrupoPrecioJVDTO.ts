import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { LineaNegocioJVDTO } from "./LineaNegocioJVDTO";
import { ZonaJVDTO } from "./ZonaJVDTO";

export interface GrupoPrecioJVDTO {
    grupoPrecioId: number;

    zona: ZonaJVDTO;

    lineaNegocio: LineaNegocioJVDTO;

    canalVenta: CanalVentaJVDTO;

    descripcion: string;

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}