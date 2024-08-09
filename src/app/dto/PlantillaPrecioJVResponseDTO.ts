import { GrupoPrecioJVDTO } from "./GrupoPrecioJVDTO";

export interface PlantillaPrecioJVResponseDTO {
    plantillaPrecioId: number;

    grupoPrecioId: GrupoPrecioJVDTO;

    valorMinimo: number;

    valorMaximo: number;

    factorXcantidad: number;

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}