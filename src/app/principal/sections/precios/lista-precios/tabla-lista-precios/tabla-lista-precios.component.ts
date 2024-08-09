import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataUserToken } from 'src/app/auth/data-user-token.service';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { GrupoPrecioJVDTO } from 'src/app/dto/GrupoPrecioJVDTO';
import { LineaNegocioDTO } from 'src/app/dto/LineaNegocioDTO';
import { ListaPrecioJVResponseDTO } from 'src/app/dto/ListaPrecioJVResponseDTO';
import { PrecioBaseJVBodyDTO } from 'src/app/dto/PrecioBaseJVBodyDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { GrupoPrecioService } from 'src/app/services/grupo-precio.service';
import { LineaNegocioService } from 'src/app/services/lineaNegocio.service';
import { ListaPrecioService } from 'src/app/services/lista-precio.service';

@Component({
  selector: 'app-tabla-lista-precios',
  templateUrl: './tabla-lista-precios.component.html',
  styleUrls: ['./tabla-lista-precios.component.scss']
})
export class TablaListaPreciosComponent implements OnInit {

  lineasNegocio: LineaNegocioDTO[] = [];
  canalesVenta: CanalVentaJVDTO[] = [];

  lineaNegocioSelected: number = 0;
  canalVentaSelected: number = 0;
  agrupacionClienteSelected: number = 0;

  usuario: string = "";

  searchByLineaIdCanalId: ListaPrecioJVResponseDTO[] = [];

  tituloLineaNegocio: string = "";
  tituloCanalVenta: string = "";
  separator: string = "";
  tituloGrupoRango: string = ""

  tituloArticulo = "";
  tituloPrecioBase = "";
  tituloFechas = "";

  precioBase!: PrecioBaseJVBodyDTO;
  fechaInicial = new Date();
  fechaFinal = new Date();
  today = new Date().setHours(0, 0, 0, 0);

  tituloLima: string = "";
  rangosHeaderTableLima: string[] = [];
  articulosLimaUniqueSort: ListaPrecioJVResponseDTO[] = [];
  preciosLima: number[] = [];

  tituloCanete: string = "";
  rangosHeaderTableCanete: string[] = [];
  preciosCanete: number[] = [];

  tituloProvincia: string = "";
  rangosHeaderTableProvincia: string[] = [];
  preciosProvincia: number[] = [];

  listaPrecioDialog = false;
  titleDialog: string = "";

  montoInPrecioBase!: number | null;
  grupoPreciosList: GrupoPrecioJVDTO[] = [];
  selectedGrupoPrecio: GrupoPrecioJVDTO[] = [];
  grupoPrecioSelect: GrupoPrecioJVDTO[] = [];

  agrupacionCliente: any[]=[];

  constructor(private dataUserToken: DataUserToken,
    private listaPrecioService: ListaPrecioService,
    private grupoPreciosService: GrupoPrecioService,
    private confirmationService: ConfirmationService,
    private lineaNegocioService: LineaNegocioService,
    private canalVentaService: CanalVentaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.usuario = this.dataUserToken.getUsuario();
    this.getAllLineaNegocio();
    this.getAllCanalesVenta();
    this.getAllAgrupacionClientes();
    this.articulosLimaUniqueSort = [];

    this.precioBase = {
      precioBaseId: 0,
      monto: 0,
      fechaInicial: new Date(),
      fechaFinal: new Date(),
      grupoPrecioId: [],
      estado: 1,
      usuarioCreacion: "",
      fechaCreacion: new Date(),
      usuarioModificacion: "",
      fechaModificacion: new Date,
    }
  }

  resetListPrecio() {
    this.grupoPrecioSelect = [];
    this.montoInPrecioBase = null;
    this.fechaInicial = new Date();
    this.fechaFinal = new Date();
  }

  getAllLineaNegocio() {
    this.lineaNegocioService.getAll().subscribe(
      data => {
        this.lineasNegocio = data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllCanalesVenta() {
    this.canalVentaService.getAll().subscribe(
      data => {
        this.canalesVenta = data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllAgrupacionClientes() {
    this.agrupacionCliente = [
      { agrupacionId: 0, descripcion: 'Mayorista' },
      { agrupacionId: 1, descripcion: 'Minorista' },
    ]
  }

  getAllGrupoPrecios() {
    this.grupoPreciosService.getAll().subscribe(
      data => {
        this.grupoPreciosList = data.data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  newPrecioBase() {
    this.getAllGrupoPrecios();
    this.titleDialog = "Agregar Precio Base";
    this.listaPrecioDialog = true;
  }

  create() {
    this.listaPrecioDialog = false;
    this.precioBase.fechaInicial = this.fechaInicial;
    this.precioBase.fechaFinal = this.fechaFinal;
    this.precioBase.monto = this.montoInPrecioBase!;
    let ids: number[] = this.gruposPreciosIdToSaveInPrecioBase(this.grupoPrecioSelect)
    this.precioBase.grupoPrecioId = ids;
    this.precioBase.estado = 1;
    this.precioBase.usuarioCreacion = this.usuario;
    this.precioBase.fechaCreacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un nuevo precio base?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listaPrecioService.create(this.precioBase).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Lista de precios creada correctamente', life: 3000 });
            } else if (data.status == "KO_GRUPOPRECIOS") {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Los grupos precios ingresados no tienen relacion', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ya existe una lista de precios asignada a este Canal de venta y Linea de negocio para esta fecha', life: 3000 });
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      reject: () => {
        this.resetListPrecio()
      }
    });
  }

  gruposPreciosIdToSaveInPrecioBase(array: GrupoPrecioJVDTO[]) {
    let grupoPreciosIds: number[] = [];
    array.forEach(gp => {
      grupoPreciosIds.push(gp.grupoPrecioId);
    });
    return grupoPreciosIds;
  }

  hideDialog() {
    this.listaPrecioDialog = false;
    this.resetListPrecio();
  }

  buscarPorLineaIdCanalId(lineaNegocioId: number, canalVentaId: number) {
    this.findByLineaNegocioIdAndCanalVentaId(lineaNegocioId, canalVentaId);
  }

  findByLineaNegocioIdAndCanalVentaId(lineaNegocioId: number, canalVentaId: number) {
    this.listaPrecioService.findByLineaNegocioIdCanalVentaId(lineaNegocioId, canalVentaId).subscribe(
      data => {
        if (data.status = "OK") {
          this.searchByLineaIdCanalId = data.data!;
          if (this.searchByLineaIdCanalId.length != 0) {
            this.tituloLineaNegocio = this.searchByLineaIdCanalId[0].lineaNegocioId.lineaNegocioNombre;
            this.separator = "-"
            this.tituloCanalVenta = this.searchByLineaIdCanalId[0].canalVentaId.canalVentaDescripcion;
            this.getArticulosLima();
            this.getArticulosCanete();
            this.getArticulosProvincia();
          }
        }
      }
    )
  }

  getArticulosLima() {
    this.tituloGrupoRango = "Unidades";
    // trae los articulos de LIMA y ordena por la secuencia y ordena de menor a mayor en base a valorMinimo
    let articulosLima = this.searchByLineaIdCanalId.filter((al) => al.zonaId.nombre == "Lima").sort((a) => a.grupoArticuloId.secuencia).sort((a) => a.valorMinimo)
    this.setTableListaPrecioArticulosLima(articulosLima)
  }

  getArticulosCanete() {
    // trae los articulos de CANETE y ordena por la secuencia y ordena de menor a mayor en base a valorMinimo
    let articulosCanete = this.searchByLineaIdCanalId.filter((al) => al.zonaId.nombre == "Cañete").sort((a) => a.grupoArticuloId.secuencia).sort((a) => a.valorMinimo)
    this.setTableListaPrecioArticulosCanete(articulosCanete);
  }

  getArticulosProvincia() {
    // trae los articulos de PROVINCIA y ordena por la secuencia y ordena de menor a mayor en base a valorMinimo
    let articulosProvincia = this.searchByLineaIdCanalId.filter((al) => al.zonaId.nombre == "Provincia").sort((a) => a.grupoArticuloId.secuencia).sort((a) => a.valorMinimo)
    this.setTableListaPrecioArticulosProvincia(articulosProvincia);
  }

  setTableArticuloPrecioBaseFechas(articulosLima: ListaPrecioJVResponseDTO[]) {
    this.tituloArticulo = "Artículo";
    this.tituloPrecioBase = "Precio Base";
    this.tituloFechas = "Fechas";
    this.articulosLimaUniqueSort = this.filtrarUniqueArticuloById(articulosLima).sort((a, b) => a.grupoArticuloId.secuencia - b.grupoArticuloId.secuencia);
  }

  setTableListaPrecioArticulosLima(articulosLima: ListaPrecioJVResponseDTO[]) {
    this.tituloLima = articulosLima[0]?.zonaId?.nombre;
    let articulosForRangoHeader = this.filtrarArticulosForRangosHeader(this.searchByLineaIdCanalId[0]?.articuloId?.articuloDescripcion!, articulosLima);
    this.rangosHeaderTableLima = this.setHeaderColumn(articulosForRangoHeader)
    this.setTableArticuloPrecioBaseFechas(articulosLima);

    let preciosXarticulo: number[] = [];
    preciosXarticulo = this.setPreciosPorArticulo(articulosLima);
    this.preciosLima = this.chunckArrayInGroups(preciosXarticulo, this.rangosHeaderTableLima.length);
  }

  setTableListaPrecioArticulosCanete(articulosCanete: ListaPrecioJVResponseDTO[]) {
    this.tituloCanete = articulosCanete[0]?.zonaId?.nombre;
    let articulosForRangoHeader = this.filtrarArticulosForRangosHeader(this.searchByLineaIdCanalId[0]?.articuloId?.articuloDescripcion!, articulosCanete);
    this.rangosHeaderTableCanete = this.setHeaderColumn(articulosForRangoHeader)

    let preciosXarticulo: number[] = [];
    preciosXarticulo = this.setPreciosPorArticulo(articulosCanete)
    this.preciosCanete = this.chunckArrayInGroups(preciosXarticulo, this.rangosHeaderTableCanete.length);
    this.setTableArticuloPrecioBaseFechas(articulosCanete);
  }

  setTableListaPrecioArticulosProvincia(articulosProvincia: ListaPrecioJVResponseDTO[]) {
    this.tituloProvincia = articulosProvincia[0]?.zonaId?.nombre;
    let articulosForRangoHeader = this.filtrarArticulosForRangosHeader(this.searchByLineaIdCanalId[0]?.articuloId?.articuloDescripcion!, articulosProvincia);
    this.rangosHeaderTableProvincia = this.setHeaderColumn(articulosForRangoHeader)

    let preciosXarticulo: number[] = [];
    preciosXarticulo = this.setPreciosPorArticulo(articulosProvincia)
    this.preciosProvincia = this.chunckArrayInGroups(preciosXarticulo, this.rangosHeaderTableProvincia.length);
    this.setTableArticuloPrecioBaseFechas(articulosProvincia);
  }

  filtrarArticulosForRangosHeader(descripcionArticulo: string, array: ListaPrecioJVResponseDTO[]): ListaPrecioJVResponseDTO[] {
    return array.filter((lpl) => lpl.articuloId.articuloDescripcion == descripcionArticulo)
      .sort((a, b) => a.valorMinimo! - b.valorMinimo!);
  }

  setHeaderColumn(arrayGallina: ListaPrecioJVResponseDTO[]) {
    let h: string[] = [];
    arrayGallina.forEach(gc => {
      h.push(gc.valorMinimo!.toString() + '-' + gc.valorMaximo!.toString());
    });
    return h;
  }

  filtrarUniqueArticuloById(array: ListaPrecioJVResponseDTO[]) {
    return array.filter(
      (thing, i, arr) => arr.findIndex(t => t.articuloId.articuloId === thing.articuloId.articuloId) === i
    );
  }

  setPreciosPorArticulo(arrayArticulos: ListaPrecioJVResponseDTO[]) {
    let preciosXarray: number[] = [];
    arrayArticulos.forEach(gl => {
      preciosXarray.push(gl.precio!)
    });
    return preciosXarray;
  }

  chunckArrayInGroups(arregloOriginal: any, size: number) {
    let precios: number[] = [];
    for (let i = 0; i < arregloOriginal.length; i += size) {
      let pedazo = arregloOriginal.slice(i, i + size);
      precios.push(pedazo);
    }
    return precios;
  }

  validOrInvalidBtn() {
    if (this.validarFechaPrecioBase(this.fechaInicial) == true || this.validarFechaPrecioBase(this.fechaFinal) == true || this.validarPrecio(this.montoInPrecioBase!) == true ||
      this.validListBoxValues(this.grupoPrecioSelect) == true) {
      return true;
    } else {
      return false;
    }
  }

  validarPrecio(precio: number,) {
    if (precio == null || precio == 0) {
      return true;
    } else {
      return false;
    }
  }

  validarFechaPrecioBase(fechaPrecioBase: Date) {
    if (fechaPrecioBase?.getTime() < this.today || fechaPrecioBase == null) {
      return true;
    } else {
      return false
    }
  }

  onChangeGrupoPrecio(e) {
    this.getGrupoPrecioById(e);
  }

  getGrupoPrecioById(grupoPrecioId: number) {
    let result = this.grupoPreciosList.filter(gp => gp.grupoPrecioId == grupoPrecioId)
    this.selectedGrupoPrecio = result;
    this.grupoPrecioSelect.push(...result)
  }

  onDblClickListBox(e) {
    let x: GrupoPrecioJVDTO[] = this.removeElementOfListBox(this.grupoPrecioSelect, e.option.grupoPrecioId);
  }

  removeElementOfListBox(array: GrupoPrecioJVDTO[], idGrupoPrecio: number): GrupoPrecioJVDTO[] {
    const myOtherListboxValues = array;
    for (let _i = 0; _i < myOtherListboxValues.length; _i++) {
      if (myOtherListboxValues[_i].grupoPrecioId === idGrupoPrecio) {
        myOtherListboxValues.splice(_i, 1);
      }
    }
    array = myOtherListboxValues;
    return array
  }

  validListBoxValues(array: GrupoPrecioJVDTO[]) {
    if (array.length == 0) {
      return true;
    } else {
      return false;
    }
  }

}