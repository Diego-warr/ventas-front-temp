export interface PrecioBaseJVBodyDTO {

    precioBaseId: number;

    monto: number;

    fechaInicial: Date;

    fechaFinal: Date;

    grupoPrecioId: number[];

    estado: number;

    usuarioCreacion: string;

    fechaCreacion: Date;

    usuarioModificacion: string;

    fechaModificacion: Date;
}