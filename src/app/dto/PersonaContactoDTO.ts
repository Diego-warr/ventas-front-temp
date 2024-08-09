import {TipoDocumentoDTO} from "./TipoDocumentoDTO";

export interface PersonaContactoDTO {

  personaContactoId: number;
  tipoDocumentoId: TipoDocumentoDTO;
  numDocumento: string;
  nombreCompleto: string;
  cargo: string;
  direccionCompleta: string;
  referencia: string;
  telefono1: string;
  telefono2: string;
  celular: string;
  fax: string;
  email: string;
}
