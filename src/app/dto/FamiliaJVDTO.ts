import { GrupoJVDTO } from "./GrupoJVDTO";

export interface FamiliaJVDTO {

    familiaId: number;

    grupoId: GrupoJVDTO;

    familiaCodigo: string;

    familiaTipo: string ;

    familiaDescripcion: string;

}