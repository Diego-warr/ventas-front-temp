import {ClienteDTO} from "./ClientesDTO";

export interface ClientePageResponse {

  content: ClienteDTO[],
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  numberOfElements: number
}
