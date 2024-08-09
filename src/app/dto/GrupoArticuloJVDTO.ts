import { ArticuloJVDTO } from "./ArticuloJVDTO";
import { GrupoPrecioJVDTO } from "./GrupoPrecioJVDTO";

export interface GrupoArticuloJVDTO {

    grupoArticuloId: number;

    grupoPrecioId: GrupoPrecioJVDTO;

    articuloId: ArticuloJVDTO;

    secuencia: number;

    factorxcalidad: number;

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}