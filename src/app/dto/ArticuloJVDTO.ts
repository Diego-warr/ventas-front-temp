import { ArticuloPrecioJVDTO } from './ArticuloPrecioJVDTO';
import { FamiliaJVDTO } from './FamiliaJVDTO';
import { LineaNegocioJVDTO } from './LineaNegocioJVDTO';
import { UnidadMedidaJVDTO } from './UnidadMedidaJVDTO';

export interface ArticuloJVDTO {
  articuloId: number;

  articuloCodigo?: string;

  articuloDescripcion: string;

  articuloCuentaIngreso: string;

  articuloCuentaSalida: string;

  unidadMedidaId1?: UnidadMedidaJVDTO;

  unidadmedidaId2?: UnidadMedidaJVDTO;

  familiaId: FamiliaJVDTO;

  articuloHabilitado: number;

  articuloMuestraUnidadmedida2: number;

  articuloCodigoAlterno: string;

  articuloMuestraCodigoAlterno: number;

  articuloCodigoBarras: string;

  articloFactor: number;

  tipoAfectacionIgv: string;

  lineaNegocioId: LineaNegocioJVDTO;

  articuloPrecioId: ArticuloPrecioJVDTO;

  pesoPromedio: number;

  codCasillero?: string;

  cantCasillero?: number;
}
