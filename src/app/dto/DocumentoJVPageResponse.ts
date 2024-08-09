import { DocumentoJVDTO } from "./DocumentoJVDTO";

export interface DocumentoJVPageResponse {

    content: DocumentoJVDTO[],
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    numberOfElements: number
}