import { ArticuloJVDTO } from "./ArticuloJVDTO";
import { CanalVentaJVDTO } from "./CanalVentaJVDTO";
import { GrupoArticuloJVDTO } from "./GrupoArticuloJVDTO";
import { LineaNegocioJVDTO } from "./LineaNegocioJVDTO";
import { PrecioBaseJVBodyDTO } from "./PrecioBaseJVBodyDTO";
import { ZonaJVDTO } from "./ZonaJVDTO";

export interface ListaPrecioJVResponseDTO {

    listaPrecioId: number;

    precioBaseId: PrecioBaseJVBodyDTO;

    precioBase?: number;

    articuloId: ArticuloJVDTO;

    zonaId: ZonaJVDTO;

    lineaNegocioId: LineaNegocioJVDTO;

    canalVentaId: CanalVentaJVDTO;

    grupoArticuloId: GrupoArticuloJVDTO;

    fechaInicio?: Date;

    fechaFin?: Date;

    precio?: number;

    valorMinimo: number;

    valorMaximo: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}