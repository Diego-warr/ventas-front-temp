import { GrupoPrecioJVDTO } from "./GrupoPrecioJVDTO";

export interface PrecioBaseJVDTO {

    precioBaseId: number;

    monto: number;

    fechaInicial: Date;

    fechaFinal: Date;

    grupoPrecioId: GrupoPrecioJVDTO;

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}