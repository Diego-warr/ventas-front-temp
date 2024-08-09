import { ArticuloJVDTO } from "./ArticuloJVDTO";
import { DocumentoJVDTO } from "./DocumentoJVDTO";

export interface DetalleDocumentoJVDTO {

    detalleId: number;

    documento: DocumentoJVDTO;

    detalleSecuencia: number;

    articulo: ArticuloJVDTO;

    detalleCantidad: number;

    detalleUnidades: number;

    detallePrecio: number;

    detalleImporte: number;

    detalleTipoafectacionigv: string;

    detalleObservacion: number;

}