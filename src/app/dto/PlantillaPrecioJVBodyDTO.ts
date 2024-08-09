export interface PlantillaPrecioJVBodyDTO {
    plantillaPrecioId: number;

    grupoPrecioId: number;

    valorMinimo: number;

    valorMaximo: number;

    factorXcantidad: number;

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}