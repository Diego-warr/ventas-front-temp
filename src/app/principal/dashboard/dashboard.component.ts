import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { AlmacenSedeJVDTO } from 'src/app/dto/AlmacenSedeJVDTO';
import { ArticuloCustomJVDTO } from 'src/app/dto/ArticuloCustomJVDTO';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { ClienteCustomJVDTO } from 'src/app/dto/ClienteCustomJVDTO';
import { DetalleOrdenPedidoJVCustomDTO } from 'src/app/dto/DetalleOrdenPedidoJVCustomDTO';
import { DireccionResponseDTO } from 'src/app/dto/DireccionResponseDTO';
import { OrdenPedidoJVResponseCustomDTO } from 'src/app/dto/OrdenPedidoJVResponseCustomDTO';
import { OrdenPedidoJVBodyDTO } from 'src/app/dto/OrdenPedidoJVBodyDTO';
import { SerieOrdenPedidoJVDTO } from 'src/app/dto/SerieOrdenPedidoJVDTO';
import { TipoDocumentoJVDTO } from 'src/app/dto/TipoDocumentoJVDTO';
import { UsuarioDTO } from 'src/app/dto/UsuarioDTO';
import { AlmacenSedeService } from 'src/app/services/almacen-sede.service';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdenPedidoService } from 'src/app/services/ordenpedido.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';
import { UsuarioServiceService } from 'src/app/services/usuario.service';
import { DataUserToken } from '../../auth/data-user-token.service';
import { PlantelJVDTO } from 'src/app/dto/PlantelJVDTO';
import { DetalleOrdenPedidoJVDTO } from 'src/app/dto/DetalleOrdenPedidoJVDTO';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetalleOrdenPedidoItemsOPJVDTO } from 'src/app/dto/DetalleOrdenPedidoItemsOPJVDTO';
import { TipoOrdenPedidoDTO } from 'src/app/dto/TipoOrdenPedidoDTO';
import { Paginator } from 'primeng/paginator';
import { VendedorJVDTO } from 'src/app/dto/VendedorJVDTO';
import { OperacionGratuitaService } from 'src/app/services/operacion-gratuita.service';
import { OperacionGratuitaJVDTO } from 'src/app/dto/OperacionGratuitaJVDTO';
import { environment } from 'src/environments/environment';
import { PlantillaListaPreciosService } from 'src/app/services/plantilla-lista-precios.service';
import { DetallePlantillaListaPreciosDTO } from 'src/app/dto/DetallePlantillaListaPreciosDTO';
import { NgxCaptureService } from 'ngx-capture';
import { ImagesService } from 'src/app/services/images.service';
import html2canvas from 'html2canvas';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService],
})
export class DashboardComponent implements OnInit {
  usuario: string = '';
  detalleOrdenCustomList: DetalleOrdenPedidoJVCustomDTO[] = [];
  ordenesPedidoPageableList: OrdenPedidoJVResponseCustomDTO[] = [];

  selectedOrden1!: OrdenPedidoJVResponseCustomDTO;

  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;

  dataPreLoaded = false;
  dataFilterLoaded = false;
  dataByRangoFechas = false;
  dataCanalVentaIdFiltered = false;
  dataUsuarioIdFiltered = false;
  dataByBtnReload = false;
  flagSelectedDates = true;

  firstRowOfPage = 0;
  lastRowOfPage = 10;

  dateInicial!: Date;
  dateFinal!: Date;

  impTotal = 0;
  importeTotal = 0;

  detalleDialog = false;
  titleDetalleDialog!: string;

  loadingOrdenes = true;
  spinnerOn = false;

  filterName!: string;

  selectedFilter: any;
  filtroSelect: any[] = [];
  estadosOPList: any[] = [];
  indexSelected!: number;
  index = 0;

  filters: any[] = [];
  listCV: any = [];

  actualizarOP = false;

  newOrdenPedidoDialog = false;
  titleNewOrdenPedido!: string;

  ordenPedidoId!: number;
  tipoOrdenPedidoList: TipoOrdenPedidoDTO[] = [];
  tipoOrdenPedido!: string;
  seriesNumeroDescription: SerieOrdenPedidoJVDTO[] = [];
  serieOp!: string;
  numeroCorrelativo!: string;
  fechaToday = new Date();
  semana!: number;
  tipoDocumentList: TipoDocumentoJVDTO[] = [];
  tipoDocumento!: number | null;
  tienda!: string;
  fechaVencimiento!: Date;
  lote!: string;
  oc!: string;
  clienteAFacturar!: string;
  clienteDestinoReal!: string;
  almacenesSedeList: AlmacenSedeJVDTO[] = [];
  almacenSedeOrigen!: number;
  almacenSedeDestino!: number;
  canalVentaList!: CanalVentaJVDTO[];
  canalVenta!: number;
  origenList: any[] = [];
  origen!: string;
  plantelList: PlantelJVDTO[] = [];
  plantel!: number;
  estado!: string;
  fechaEntrega!: Date;
  fechaCreacion!: Date;
  horaEntrega!: string;
  vendedoresList: UsuarioDTO[] = [];
  usuariosFilterList: UsuarioDTO[] = [];
  vendedor!: number;
  tipoMoneda: string = 'MN';
  simboloMoneda!: string;
  lugarEntrega!: string;
  observacion!: string;
  usuarioCreacion!: string;
  articuloIdSelected!: number;
  articuloId!: number;
  codigoDetalle!: string;
  articuloDescripcionDetalle!: string;
  chkOperacionGratuita = false;
  operacionGratuita!: string | null;
  um2Detalle!: number | null;
  um1Detalle!: number | null;
  precioDetalle!: number | null;
  observacionDetalle!: string;
  nombreCortoUM2!: string;
  nombreCortoUM1!: string;

  allSeriesOrdenPedidoList: SerieOrdenPedidoJVDTO[] = [];
  clientesCustomList: ClienteCustomJVDTO[] = [];
  clientesCustomAUXList: ClienteCustomJVDTO[] = [];
  articuloEnabledCustomList: ArticuloCustomJVDTO[] = [];
  almacenesClienteList: DireccionResponseDTO[] = [];
  operacionGratuitaList: OperacionGratuitaJVDTO[] = [];
  tipoMonedaList: any[] = [];
  searchClienteCustomDialog = false;
  searchArticuloDialog = false;
  searchLugarEntregaDialog = false;
  progressBarDialog = false;
  loadingClientesCustom = false;
  loadingArticulo = false;
  loadingLugarEntrega = false;
  filterNameCliente!: string;
  filterNameArticulo!: string;
  filterNameLugar!: string;
  clienteFacturarIdSelected!: number | null;
  clienteDestinoRealIdSelected!: number | null;
  clienteFacturarId!: number;
  clienteDestinoId!: number;

  ordenPedidoBody!: OrdenPedidoJVBodyDTO;
  detalleOrdenPedidoBodyList: DetalleOrdenPedidoJVDTO[] = [];
  detalleOPItemsList: DetalleOrdenPedidoItemsOPJVDTO[] = [];

  contadorSecuenciaDetalle = 0;
  servidor!: string;

  usuarioVendedorSelected!: string;

  isTrustedBtnSaveOP!: boolean;

  vendedorLogeado!: VendedorJVDTO;

  canalVentaIdSelect!: number;
  usuarioIdSelect!: number | null;

  roles: any[] = [];

  hideSelectAlmacenOrigenDestino = true;
  hideInputFiltro = false;
  hideTipoOrdenFilter = true;
  hideEstadosFilter = true;
  hideOperacionGratuita = true;

  tituloAlmacenFiltro!: string;

  dataByTipoOrdenFilter = false;
  dataByAlmacenesId = false;
  dataByEstados = false;

  almacenSedeOrigenDestinoId!: number;
  tipoOrdenFilterSelect!: string;
  estadosOrdenFilterSelect!: string;

  frozenInColumnAcciones = true;

  plantillaPrecioByProductToCompare!: DetallePlantillaListaPreciosDTO;

  sedeRTRecepcion!: string;

  chkIncluyeCasillero: boolean = false;

  codCasillero!: string;
  cantCasillero!: number;
  pesoPromedio!: number;
  prefijoPeso = 'KG.';

  precioCasilleroCanal: any = 0;
  cantidadHuevo = 0;
  cantidadCasilleroGlobal = 0;
  cantidadHuevoGLobal = 0;
  @ViewChild('dtOrdenes') dtOrdenes: Table | undefined;
  @ViewChild('dateIni') calendarIni: Calendar | undefined;
  @ViewChild('dateFin') calendarFin: Calendar | undefined;
  @ViewChild('dtCliCustom') dtCliCustom: Table | undefined;
  @ViewChild('dtArticuloCustom') dtArticuloCustom: Table | undefined;
  @ViewChild('dtLugar') dtLugar: Table | undefined;
  @ViewChild('paginador', { static: false }) paginador: Paginator | undefined;
  downloadLink: HTMLAnchorElement | undefined;
  ref: DynamicDialogRef | undefined;

  constructor(
    private dataUserToken: DataUserToken,
    private ordenPedidoService: OrdenPedidoService,
    private operacionGratuitaService: OperacionGratuitaService,
    private datePipe: DatePipe,
    private articuloService: ProductosService,
    private tipoDocumentoService: TipoDocumentoService,
    private clienteService: ClienteService,
    private almacenesSedeService: AlmacenSedeService,
    private canalVentaService: CanalVentaService,
    private usuarioService: UsuarioServiceService,
    private plantillaListaPrecioService: PlantillaListaPreciosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private captureService: NgxCaptureService,
    private imageService: ImagesService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.usuario = this.dataUserToken.getUsuario();
    this.roles = this.dataUserToken.getRoles();
    this.getAllPageable(this.page, this.size);
    this.getAllCanalesVenta();
    this.setFiltroSelect();
    this.getEstadosOrdenPedido();
    this.getAllAlmacenesSede();
    this.inizializateOrdenPedidoBody();
    this.getSedeLogged();
    this.getTipoOrdenPedido();
    this.getAllSeries();
    this.getAllUsuariosRolVentas();
    this.getAllClientesCustom();
    this.getVendedorByUsuarioUsername();
    this.getAllOperacionesGratuitas();

    this.tipoMonedaList = [
      { id: 'MN', descripcion: 'MN - Moneda Nacional' },
      { id: 'US', descripcion: 'US - Dólar Americano' },
    ];
    this.downloadLink = document.createElement('a');
  }

  inizializateOrdenPedidoBody() {
    this.ordenPedidoBody = {
      ordenPedidoId: 0,
      tipoOrden: '',
      serie: '',
      numero: '',
      fecha: new Date(),
      semana: 0,
      tipoDocumentoId: 0,
      fechaVencimiento: new Date(),
      clienteId: null,
      clienteDestinoId: null,
      ordenCompra: '',
      tienda: '',
      canalVentaId: 0,
      origen: '',
      fechaEntrega: new Date(),
      horaEntrega: '',
      lugarEntrega: '',
      almacenSedeOrigenId: 0,
      almacenSedeDestinoId: 0,
      observaciones: '',
      lote: '',
      vendedorId: 0,
      usuarioCreacion: '',
      fechaCreacion: new Date(),
      usuarioModificacion: '',
      fechaModificacion: new Date(),
      estado: '',
      plantel: '',
      plantelId: 0,
      tipoMoneda: '',
      detalleOrdenPedidoList: [],
    };
  }

  getVendedorByUsuarioUsername() {
    this.usuarioService
      .vendedorByUsuarioUsername(this.usuario.trim())
      .subscribe((data) => {
        if (data.status == 'OK') {
          this.vendedorLogeado = data.data!;
        }
      });
  }

  getAllPageable(page: number, size: number) {
    this.ordenPedidoService.getAllPageable(page, size).subscribe(
      (data) => {
        if (data.status == 'OK') {
          this.ordenesPedidoPageableList = data.data!.content!;
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!;
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataByAlmacenesId = false;
          this.dataByRangoFechas = false;
          this.dataCanalVentaIdFiltered = false;
          this.dataUsuarioIdFiltered = false;
          this.dataFilterLoaded = false;
          this.dataByTipoOrdenFilter = false;
          this.dataByEstados = false;
          this.dataPreLoaded = true;
        }
        this.loadingOrdenes = false;
        this.spinnerOn = false;
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  showPageFiltroOP(e: any) {
    let result = JSON.stringify(e.valueOf());
    let page = JSON.parse(result);
    let actualPage = page.page;
    if (this.dataPreLoaded == true) {
      this.getAllPageable(actualPage, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByRangoFechas == true) {
      let ini = this.datePipe.transform(this.dateInicial, 'yyyy-MM-dd');
      let fin = this.datePipe.transform(this.dateFinal, 'yyyy-MM-dd');
      this.getAllOPByRangoFechasPageable(ini, fin, actualPage, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataFilterLoaded == true) {
      this.buscarOrdenes(this.filterName, this.index, actualPage, e.rows, e);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataCanalVentaIdFiltered == true) {
      this.getAllByCanalVentaIdPageable(
        this.canalVentaIdSelect,
        actualPage,
        e.rows,
        e
      );
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataUsuarioIdFiltered == true) {
      this.getAllByUsuarioIdPageable(
        this.usuarioIdSelect,
        actualPage,
        e.rows,
        e
      );
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByAlmacenesId == true) {
      this.getAllByAlmacenIdPageable(
        String(this.almacenSedeOrigenDestinoId),
        this.index,
        actualPage,
        e.rows,
        e
      );
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByTipoOrdenFilter == true) {
      this.getAllTipoOrdenesFilterPageable(
        this.tipoOrdenFilterSelect,
        this.index,
        actualPage,
        e.rows,
        e
      );
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByEstados == true) {
      this.getAllByEstadosFilterPageable(
        this.estadosOrdenFilterSelect,
        this.index,
        actualPage,
        e.rows,
        e
      );
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    }
    // else if (this.dataByBtnReload == true) {
    //   console.log("E", e)
    //   this.reloadListaOrdenes(this.dtOrdenes, e);
    //   this.firstRowOfPage = e.first;
    //   this.lastRowOfPage = e.first + e.rows;
    // }
  }

  getAllSeries() {
    this.ordenPedidoService.getAllSeries().subscribe(
      (data) => {
        if (data.status == 'OK') {
          this.allSeriesOrdenPedidoList = data.data!;
        }
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  getAllOperacionesGratuitas() {
    this.operacionGratuitaService.getAllOperacionGratuita().subscribe(
      (data) => {
        if (data.status == 'OK') {
          this.operacionGratuitaList = data.data!;
        }
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  setFiltroSelect() {
    this.filtroSelect = [
      { id: 1, label: 'Número' },
      { id: 2, label: 'Cli. Comprobante' },
      { id: 3, label: 'Cli. Real' },
      { id: 4, label: 'Almacén Origen' },
      { id: 5, label: 'Almacén Destino' },
      { id: 6, label: 'Tipo Orden' },
      { id: 7, label: 'Estados OP' },
    ];
  }

  getEstadosOrdenPedido() {
    this.estadosOPList = [
      { id: 'PENDIENTE', description: 'PENDIENTE' },
      { id: 'EN_PEDIDO', description: 'EN PEDIDO' },
      { id: 'EN_GUIA', description: 'EN GUIA' },
      { id: 'EN_COMPROBANTE', description: 'EN COMPROBANTE' },
      { id: 'PEDIDO_PENDIENTE', description: 'PEDIDO PENDIENTE' },
      { id: 'PEDIDO_PREPARADO', description: 'PEDIDO PREPARADO' },
      { id: 'DOCUMENTACION_LISTA', description: 'DOCUMENTACION LISTA' },
      { id: 'ENTREGA_EXITOSA', description: 'ENTREGA EXITOSA' },
      { id: 'EN_TRANSITO', description: 'EN TRANSITO' },
      { id: 'ANULADO', description: 'ANULADO' },
      { id: 'CANCELADO', description: 'CANCELADO' },
    ];
  }

  getTipoOrdenPedido() {
    this.tipoOrdenPedidoList = [
      { id: 'OP', description: 'OP- ORDEN PEDIDO (F11)' },
      { id: 'RT', description: 'RT - REQUERIMIENTO DE TRASLADO' },
    ];
  }

  getAllPlanteles() {
    this.ordenPedidoService.getAllPlanteles().subscribe((data) => {
      if (data.status == 'OK') {
        this.plantelList = data.data!;
      }
    });
  }

  onChangeTipoOrden(e: any) {
    this.getAllSeries();
    this.resetInputsClientes();
    this.resetAlmacenes();
    this.resetLugarEntrega();
    this.numeroCorrelativo = '';
    this.tipoDocumento = null;
    this.tipoOrdenPedido = e.value;
    this.seriesNumeroDescription = this.setNumeroDescripcion(e.value);
    this.serieOp = '';

    if (this.tipoOrdenPedido == 'OP') {
      let filt: SerieOrdenPedidoJVDTO[];
      filt = this.seriesNumeroDescription.filter((e) =>
        e.descripcion.match('LURIN')
      );
      this.serieOp = filt[0].numero;

      let tipoDocument = this.tipoDocumentList.filter((e) =>
        e.descripcion.match('FACTURA')
      );
      this.tipoDocumento = tipoDocument[0].tipodocumentoId;

      this.getLastNumeroRecordBySerieOPTipoOrden('OP', filt[0].numero);
    } else {
      let filt: SerieOrdenPedidoJVDTO[];
      filt = this.seriesNumeroDescription.filter((e) =>
        e.descripcion.match('ALMACEN')
      );
      this.serieOp = filt[0].numero;

      let tipoDocument = this.tipoDocumentList.filter((e) =>
        e.descripcion.match('GUIA DE REMISIÓN')
      );
      this.tipoDocumento = tipoDocument[0].tipodocumentoId;
      this.getLastNumeroRecordBySerieOPTipoOrden('RT', filt[0].numero);
    }
  }

  onChangeSerieOP(e: any) {
    this.getLastNumeroRecordBySerieOPTipoOrden(this.tipoOrdenPedido, e.value);
  }

  getLastNumeroRecordBySerieOPTipoOrden(
    tipoOrdenSelected: string,
    serie: string
  ) {
    this.ordenPedidoService
      .findLastNumeroRecordBySerieAndTipoOrdenPedido(tipoOrdenSelected, serie)
      .subscribe(
        (data) => {
          if (data.status == 'OK') {
            this.numeroCorrelativo = String(data.data!);
            this.numeroCorrelativo = String(Number(this.numeroCorrelativo) + 1);
            this.numeroCorrelativo = this.formatNumberSeries(
              this.numeroCorrelativo,
              7
            );
          }
        },
        (error) => {
          console.log(error);
          return 'Error';
        }
      );
  }

  formatNumberSeries(num: String, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  getAllTipoDocumentos() {
    this.tipoDocumentoService.getAll().subscribe((data) => {
      if ((data.status = 'SUCCESS')) {
        this.tipoDocumentList = data.data!;
      }
    });
  }

  getPrecioArticuloByFechaAndCanalVenta(
    fecha: string,
    articuloId: number,
    canalVentaId: number
  ) {
    this.plantillaListaPrecioService
      .getPrecioArticuloByFechaAndCanalVenta(fecha, articuloId, canalVentaId)
      .subscribe((data) => {
        if (data.status == 'OK') {
          this.plantillaPrecioByProductToCompare = data.data!;
          let top = this.tipoOrdenPedidoList.find(
            (top) => top.id == this.tipoOrdenPedido
          );
          if (
            (this.precioDetalle! <
              this.plantillaPrecioByProductToCompare.precioMinimo &&
              top?.id == 'OP') ||
            (this.precioDetalle! >
              this.plantillaPrecioByProductToCompare.precioMinimo &&
              top?.id == 'OP')
          ) {
            this.confirmationService.confirm({
              message:
                'El rango de precios para este artículo es: Precio base: S/. ' +
                this.plantillaPrecioByProductToCompare.precioBase +
                ', Precio mínimo: S/. ' +
                this.plantillaPrecioByProductToCompare.precioMinimo +
                ', Precio máximo: S/. ' +
                this.plantillaPrecioByProductToCompare.precioMaximo,

              header: 'Precio no permitido!',
              acceptLabel: 'Ok',
              rejectLabel: 'No',
              rejectVisible: false,
              icon: 'pi pi-exclamation-triangle',
              key: 'cd_validationPrecio_OP',
              accept: () => {},
            });
          } else {
            this.setDetalles();
          }
        } else {
          this.setDetalles();
        }
      });
  }

  getAllUsuariosRolVentas() {
    this.usuarioService.getAllUsuariosRolVentas().subscribe((data) => {
      if (data.status == 'OK') {
        this.vendedoresList = this.setDniNombresVendedor(data.data!);
        this.usuariosFilterList = JSON.parse(
          JSON.stringify(this.vendedoresList)
        );
      }
    });
  }

  setDniNombresVendedor(vendedoresList: UsuarioDTO[]) {
    vendedoresList.forEach((v) => {
      let concat: string = v.dni! + ' - ' + v.nombres! + ' ' + v.apellidos!;
      v.nombres = '';
      v.nombres = concat;
    });
    return vendedoresList;
  }

  setAlmacenSedeToDireccionEntrega(event) {
    let changedValue = event.value;
    let almacen = this.almacenesSedeList.find(
      (a) => a.almacenSedeId == changedValue
    );
    this.lugarEntrega = 'CD ' + almacen?.almacenSedeDescripcion!!;
  }

  resetInputsClientes() {
    this.clienteAFacturar = '';
    this.clienteDestinoReal = '';
    this.clienteFacturarIdSelected = null;
    this.clienteDestinoRealIdSelected = null;
  }

  resetAlmacenes() {
    this.almacenSedeOrigen = 0;
    this.almacenSedeDestino = 0;
  }

  resetLugarEntrega() {
    this.lugarEntrega = '';
    this.almacenesClienteList = [];
  }

  disabledBtnSearchCliente(): boolean {
    if (this.tipoOrdenPedido == 'OP') {
      return false;
    } else if (this.tipoOrdenPedido == 'RT') {
      return true;
    } else {
      return true;
    }
  }

  disabledAlmacenSedeOrigen() {
    if (this.tipoOrdenPedido == 'OP') {
      return true;
    } else if (this.tipoOrdenPedido == 'RT') {
      return false;
    } else {
      return true;
    }
  }

  disabledAlmacenSedeDestino() {
    if (this.tipoOrdenPedido == 'OP') {
      return true;
    } else if (this.tipoOrdenPedido == 'RT') {
      return false;
    } else {
      return true;
    }
  }

  getAllCanalesVenta() {
    this.canalVentaService.getAll().subscribe(
      (data) => {
        this.canalVentaList = data;
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  getAllAlmacenesSede() {
    this.almacenesSedeService.getAllAlmacenesSede().subscribe(
      (data) => {
        this.almacenesSedeList = data.data!;
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  getAllOrigen() {
    this.origenList = [
      { origenId: 'AVIVEL', origenDescription: 'AVIVEL' },
      { origenId: 'ROMA', origenDescription: 'ROMA' },
      { origenId: 'OTROS', origenDescription: 'OTROS' },
    ];
  }

  getAllClientesCustom() {
    this.clienteService.allClientesCustom().subscribe(
      (data) => {
        this.clientesCustomList = data.data!;
        this.loadingClientesCustom = false;
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  searchClient() {
    this.searchClienteCustomDialog = true;
  }

  removeDataFiltered() {
    this.filterNameCliente = '';
    this.clientesCustomAUXList = [];
    this.searchClienteCustomDialog = false;
    this.dtCliCustom?.clear();
  }

  getAllArticulosHabilitadosCustom() {
    this.articuloService.allArticulosHabilitadosCustom().subscribe(
      (data) => {
        if (data.status == 'OK') {
          this.articuloEnabledCustomList = data.data!;
          this.loadingArticulo = false;
        }
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  getAllAlmacenesByClienteId() {
    this.clienteService
      .getAllAlmacenesByClienteId(this.clienteFacturarIdSelected!)
      .subscribe((data) => {
        this.almacenesClienteList = data;
      });
  }

  searchLugarEntrega() {
    this.searchLugarEntregaDialog = true;
  }

  disabledBtnSearchLugarEntrega(): boolean {
    if (
      this.clienteAFacturar == null ||
      this.clienteAFacturar == undefined ||
      this.tipoOrdenPedido == 'RT' ||
      this.clienteFacturarIdSelected == null
    ) {
      return true;
    } else if (
      this.clienteAFacturar != null ||
      this.clienteAFacturar != undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  applyFilterArticuloGlobal(event: Event, stringVal: String) {
    this.dtArticuloCustom!.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  applyFilterLugarGlobal(event: Event, stringVal: String) {
    this.dtLugar!.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  searchArticulo() {
    this.filterNameArticulo = '';
    this.searchArticuloDialog = true;
  }

  sumar(ordenList: OrdenPedidoJVResponseCustomDTO[]) {
    ordenList.forEach((or) => {
      or.detalleOrdenPedidoList.forEach((det) => {
        this.importeTotal += det.precio;
      });
      this.impTotal = this.importeTotal;
      this.importeTotal = 0;
      or.importeTotal = this.impTotal;
    });
  }

  onSelectedDates() {
    if (this.dateInicial != null && this.dateFinal != null) {
      let ini = this.datePipe.transform(this.dateInicial, 'yyyy-MM-dd');
      let fin = this.datePipe.transform(this.dateFinal, 'yyyy-MM-dd');
      this.loadingOrdenes = true;
      this.flagSelectedDates = true;
      this.getAllOPByRangoFechasPageable(ini, fin, this.page, this.size);
    }
  }

  reloadListaOrdenes(dtOrdenes) {
    this.spinnerOn = true;
    this.loadingOrdenes = true;
    this.indexSelected = 0;
    this.index = 0;
    this.clearDatesFields();
    this.clearFilters(dtOrdenes);
    this.filterName = '';
    this.page = 0;
    this.size = 10;
    this.canalVentaIdSelect = 0;
    this.usuarioIdSelect = null;
    this.almacenSedeOrigenDestinoId = 0;
    this.dataByAlmacenesId = false;
    this.dataByRangoFechas = false;
    this.dataCanalVentaIdFiltered = false;
    this.dataUsuarioIdFiltered = false;
    this.dataFilterLoaded = false;
    this.dataByTipoOrdenFilter = false;
    this.dataByEstados = false;
    this.dataPreLoaded = false;
    this.dataByBtnReload = true;
    this.getAllPageable(this.page, this.size);
    this.paginador!.first = 0;
  }

  clearDatesFields() {
    this.calendarIni!.value = '';
    this.calendarIni!.updateInputfield();
    this.calendarFin!.value = '';
    this.calendarFin!.updateInputfield();
  }

  clearFilters(dtOrdenes: Table) {
    dtOrdenes.clear();
  }

  createOrUpdateOP(event) {
    this.isTrustedBtnSaveOP = event.isTrusted;
    if (this.actualizarOP) {
      this.updateOrdenPedido();
    } else {
      this.createOrdenPedido();
    }
  }

  createOrdenPedido() {
    this.newOrdenPedidoDialog = false;
    this.setOrdenPedidoToCreate();
    this.ordenPedidoBody.detalleOrdenPedidoList =
      this.detalleOrdenPedidoBodyList;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear una nueva Orden de Pedido?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progressBarDialog = true;
        this.ordenPedidoService
          .createOP(
            this.ordenPedidoBody,
            this.usuarioVendedorSelected,
            this.servidor!
          )
          .subscribe(
            (data) => {
              if (data.status == 'OK') {
                this.progressBarDialog = false;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Orden de Pedido creada correctamente',
                  life: 3000,
                });
              } else {
                this.progressBarDialog = false;
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Error',
                  detail: 'Orden de Pedido no ha sido creada correctamente',
                  life: 3000,
                });
              }
              this.getAllPageable(0, 10);
            },
            (error) => {
              this.progressBarDialog = false;
              this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Ha ocurrido un error al crear la Orden de Pedido',
                life: 3000,
              });
              console.log(error);
            }
          );
      },
      reject: () => {
        this.getAllPageable(0, 10);
      },
    });
  }

  updateOrdenPedido() {
    this.newOrdenPedidoDialog = false;
    this.saveToEdit();
    this.ordenPedidoBody.detalleOrdenPedidoList =
      this.detalleOrdenPedidoBodyList;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar la Orden de Pedido?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.progressBarDialog = true;
        this.ordenPedidoService
          .createOP(
            this.ordenPedidoBody,
            this.usuarioVendedorSelected,
            this.servidor!
          )
          .subscribe(
            (data) => {
              if (data.status == 'OK') {
                this.progressBarDialog = false;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Orden de Pedido actualizada correctamente',
                  life: 3000,
                });
              } else if (data.status == 'KO_ESTADO_OP') {
                this.progressBarDialog = false;
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Error',
                  detail:
                    'Orden de Pedido no ha sido actualizada porque ya pasó a un estado distinto de "Pedido pendiente"',
                  life: 3000,
                });
              } else {
                this.progressBarDialog = false;
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Error',
                  detail:
                    'Orden de Pedido no ha sido actualizada correctamente',
                  life: 3000,
                });
              }
              this.getAllPageable(0, 10);
            },
            (error) => {
              this.progressBarDialog = false;
              this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Ha ocurrido un error al crear la Orden de Pedido',
                life: 3000,
              });
              console.log(error);
            }
          );
      },
      reject: () => {
        this.getAllPageable(0, 10);
      },
    });
  }

  setOrdenPedidoToCreate() {
    let semanaActual = this.calculateWeekNumber(this.fechaToday);
    this.ordenPedidoBody.ordenPedidoId = null;
    this.ordenPedidoBody.tipoOrden = this.tipoOrdenPedido;
    this.ordenPedidoBody.serie = this.serieOp;
    this.ordenPedidoBody.numero = this.numeroCorrelativo;
    this.ordenPedidoBody.fecha = this.fechaToday;
    this.ordenPedidoBody.semana = semanaActual;
    this.ordenPedidoBody.tipoDocumentoId = this.tipoDocumento!;
    this.ordenPedidoBody.clienteId = this.clienteFacturarIdSelected
      ? this.clienteFacturarIdSelected
      : null;
    this.ordenPedidoBody.clienteDestinoId = this.clienteDestinoRealIdSelected
      ? this.clienteDestinoRealIdSelected
      : null;
    this.ordenPedidoBody.fechaVencimiento = this.fechaVencimiento;
    this.ordenPedidoBody.ordenCompra = this.oc;
    this.ordenPedidoBody.tienda = this.tienda;
    this.ordenPedidoBody.canalVentaId = this.canalVenta;
    this.ordenPedidoBody.origen = this.origen;
    this.ordenPedidoBody.fechaEntrega = this.fechaEntrega;
    this.ordenPedidoBody.horaEntrega = this.horaEntrega;
    this.ordenPedidoBody.lugarEntrega = this.lugarEntrega.trim();
    this.ordenPedidoBody.observaciones = this.observacion;
    this.ordenPedidoBody.lote = this.lote;
    this.usuarioVendedorSelected = this.usuarioVendedorSelected
      ? this.usuarioVendedorSelected
      : this.usuario;
    this.ordenPedidoBody.vendedorId = this.vendedor;
    this.ordenPedidoBody.usuarioCreacion = this.usuario;
    this.ordenPedidoBody.fechaCreacion = new Date();
    this.ordenPedidoBody.usuarioModificacion = null;
    this.ordenPedidoBody.fechaModificacion = null;
    this.ordenPedidoBody.estado = 'PEDIDO_PENDIENTE';
    this.ordenPedidoBody.almacenSedeOrigenId = this.almacenSedeOrigen
      ? this.almacenSedeOrigen
      : null;
    this.ordenPedidoBody.almacenSedeDestinoId = this.almacenSedeDestino
      ? this.almacenSedeDestino
      : null;
    this.ordenPedidoBody.plantelId = this.plantel ? this.plantel : null;
    let nombrePlantel = this.matchPlantelIdAndNombre(this.plantel);
    this.ordenPedidoBody.plantel = nombrePlantel ? nombrePlantel : null;
    this.ordenPedidoBody.tipoMoneda = this.tipoMoneda;
  }

  setSerieOpToEdit(tipoOP: string, serie: string): SerieOrdenPedidoJVDTO {
    this.seriesNumeroDescription = this.setNumeroDescripcion(tipoOP);
    let serieToEdit = this.seriesNumeroDescription.find(
      (sf) => sf.numero == serie
    );
    return serieToEdit!;
  }

  setNumeroDescripcion(tipoOP: string) {
    let seriesFiltradas = this.allSeriesOrdenPedidoList.filter(
      (s) => s.tipoOrden === tipoOP
    );
    seriesFiltradas.forEach((sf) => {
      let s = sf.numero.concat(' - ').concat(sf.descripcion);
      sf.descripcion = '';
      sf.descripcion = s;
    });
    return seriesFiltradas;
  }

  setEditOrdenPedido(orden: any) {
    this.openDialogToEdit();
    this.loadData();
    this.isTrustedBtnSaveOP = false;
    this.ordenPedidoId = orden.ordenPedidoId;
    this.tipoOrdenPedido = orden.tipoOrden;
    let serieToEdit = this.setSerieOpToEdit(orden.tipoOrden, orden.serie);
    this.serieOp = serieToEdit.numero;
    this.numeroCorrelativo = orden.numero;
    let fecha = this.formatDates(orden.fecha);
    this.fechaToday = fecha;
    this.semana = orden.semana;
    this.tipoDocumento = orden.tipoDocumento.tipodocumentoId;
    this.tienda = orden.tienda;
    let fechaVencimiento = this.formatDates(orden.fechaVencimiento);
    this.fechaVencimiento = fechaVencimiento;
    this.lote = orden.lote;
    this.oc = orden.ordenCompra;
    let cliente = this.setClienteFacturarToEdit(orden.cliente);
    this.clienteAFacturar = cliente;
    let clienteDestino = this.setClienteDestinoToEdit(orden.clienteDestino);
    this.clienteDestinoReal = clienteDestino;
    this.almacenSedeOrigen = orden.almacenSedeOrigenId?.almacenSedeId!
      ? orden.almacenSedeOrigenId?.almacenSedeId!
      : '';
    this.almacenSedeDestino = orden.almacenSedeDestinoId?.almacenSedeId!
      ? orden.almacenSedeDestinoId?.almacenSedeId!
      : '';

    this.canalVenta = orden.canalventa?.canalVentaId
      ? orden.canalventa?.canalVentaId
      : 0;
    this.precioCasilleroCanal = this.canalVentaList.find(
      (item) => item.canalVentaId == this.canalVenta
    )?.precioCasillero;
    this.origen = orden.origen;
    this.plantel = orden.plantelId;
    let nombrePlantel = orden.plantel;
    let fechaEntrega = this.formatDates(orden.fechaEntrega);
    this.fechaEntrega = fechaEntrega;
    this.horaEntrega = orden.horaEntrega;
    let vendedor = this.setVendedorToEdit(orden.vendedor.emailVendedor);
    this.vendedor = vendedor! ? vendedor! : 0;
    this.lugarEntrega = orden.lugarEntrega;
    this.observacion = orden.observaciones;
    this.usuarioCreacion = orden.usuarioCreacion;
    this.fechaCreacion = orden.fechaCreacion;
    let usuarioModificacion = orden.usuarioModificacion;
    let fechaModificacion = orden.fechaModificacion;
    this.estado = orden.estado;
    this.tipoMoneda = orden.tipoMoneda;
    this.onChangeTipoMoneda();
    this.setDetalleOPListToDetalleOPItemsList(orden.detalleOrdenPedidoList);
  }

  saveToEdit() {
    this.inizializateOrdenPedidoBody();
    this.ordenPedidoBody.almacenSedeDestinoId = this.almacenSedeDestino
      ? this.almacenSedeDestino
      : null;
    this.ordenPedidoBody.almacenSedeOrigenId = this.almacenSedeOrigen
      ? this.almacenSedeOrigen
      : null;
    this.ordenPedidoBody.canalVentaId = this.canalVenta;
    this.ordenPedidoBody.clienteId = this.clienteFacturarIdSelected
      ? this.clienteFacturarIdSelected
      : this.clienteFacturarId;
    this.ordenPedidoBody.clienteDestinoId = this.clienteDestinoRealIdSelected
      ? this.clienteDestinoRealIdSelected
      : this.clienteDestinoId;
    this.ordenPedidoBody.estado = this.estado;
    this.ordenPedidoBody.fecha = this.fechaToday;
    this.ordenPedidoBody.fechaCreacion = this.fechaCreacion;
    this.ordenPedidoBody.fechaEntrega = this.fechaEntrega;
    this.ordenPedidoBody.fechaModificacion = new Date();
    this.ordenPedidoBody.fechaVencimiento = this.fechaVencimiento;
    this.ordenPedidoBody.horaEntrega = this.horaEntrega;
    this.ordenPedidoBody.lote = this.lote;
    this.ordenPedidoBody.lugarEntrega = this.lugarEntrega;
    this.ordenPedidoBody.numero = this.numeroCorrelativo;
    this.ordenPedidoBody.observaciones = this.observacion;
    this.ordenPedidoBody.ordenCompra = this.oc;
    this.ordenPedidoBody.ordenPedidoId = this.ordenPedidoId;
    this.ordenPedidoBody.origen = this.origen;
    this.ordenPedidoBody.plantelId = this.plantel;
    let nombrePlantel = this.matchPlantelIdAndNombre(this.plantel);
    this.ordenPedidoBody.plantel = nombrePlantel;
    this.ordenPedidoBody.semana = this.semana;
    this.ordenPedidoBody.serie = this.serieOp;
    this.ordenPedidoBody.tienda = this.tienda;
    this.ordenPedidoBody.tipoDocumentoId = this.tipoDocumento!;
    this.ordenPedidoBody.tipoMoneda = this.tipoMoneda;
    this.ordenPedidoBody.tipoOrden = this.tipoOrdenPedido;
    this.ordenPedidoBody.usuarioCreacion = this.usuarioCreacion;
    this.ordenPedidoBody.usuarioModificacion = this.usuario;
    this.ordenPedidoBody.vendedorId = this.vendedor;
    this.addArticuloToDetalleOP(this.detalleOPItemsList);
  }

  setClienteFacturarToEdit(cliente: any): string {
    if (
      cliente?.clienteNumeroDocumentoIdentidad! == '' ||
      cliente?.clienteNumeroDocumentoIdentidad! == null ||
      cliente?.clienteNumeroDocumentoIdentidad! == undefined
    ) {
      return '';
    } else {
      this.clienteFacturarId = cliente?.clienteId!;
      return (
        cliente?.clienteNumeroDocumentoIdentidad! +
        ' - ' +
        cliente?.clienteRazonSocial!
      );
    }
  }

  setClienteDestinoToEdit(cliente: any): any {
    if (
      cliente?.clienteNumeroDocumentoIdentidad! == '' ||
      cliente?.clienteNumeroDocumentoIdentidad! == null ||
      cliente?.clienteNumeroDocumentoIdentidad! == undefined
    ) {
      return '';
    } else {
      this.clienteDestinoId = cliente?.clienteId;
      return (
        cliente?.clienteNumeroDocumentoIdentidad! +
        ' - ' +
        cliente?.clienteRazonSocial!
      );
    }
  }

  setVendedorToEdit(emailVendedor: string): number {
    let vend = this.vendedoresList.find((v) => v.correo == emailVendedor);
    this.usuarioVendedorSelected = vend?.username!;
    return vend?.usuarioId!;
  }

  setDetalleOPListToDetalleOPItemsList(
    detalleOpList: DetalleOrdenPedidoJVCustomDTO[]
  ) {
    let list = detalleOpList.map(
      (det) =>
        <DetalleOrdenPedidoItemsOPJVDTO>{
          detalleOrdenPedidoId: det.detalleOrdenPedidoId,
          articuloId: det.articulo.articuloId,
          articuloCodigo: det.articulo.articuloCodigo,
          articuloDescripcion: det.articulo.articuloDescripcion,
          cantidad: det.cantidad,
          unidades: det.unidades,
          ordenPedidoId: det.ordenPedido.ordenPedidoId,
          secuencia: det.secuencia,
          precio: det.precio,
          observacion: det.observacion,
          operacionGratuita: det.operacionGratuita,
          pesoPromedio: det.articulo.pesoPromedio,
          codCasillero: det.articulo.codCasillero,
          cantCasillero: det.articulo.cantCasillero,
        }
    );
    list.sort((dop1, dop2) => dop1.secuencia - dop2.secuencia);
    this.detalleOPItemsList = list;
    this.contadorSecuenciaDetalle = this.detalleOPItemsList.length;
  }

  formatDates(date: string): any {
    var dateParts = date.split('-');
    let fecha = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    return fecha;
  }

  anularOP(ordenSelected: OrdenPedidoJVResponseCustomDTO) {
    this.confirmationService.confirm({
      message:
        '¿Desea ANULAR la Orden de Pedido N° ' +
        ordenSelected.serie +
        '-' +
        ordenSelected.numero,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordenPedidoService
          .cancelarOP(ordenSelected.ordenPedidoId, this.usuario)
          .subscribe(
            (data) => {
              if (data.status == 'OK') {
                this.ordenesPedidoPageableList[
                  this.findIndexOPById(ordenSelected?.ordenPedidoId!)
                ].estado = 'ANULADO';
                this.messageService.add({
                  severity: 'success',
                  summary: 'Exito',
                  detail: 'La Orden de Pedido fue ANULADA correctamente',
                  life: 3000,
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'La Orden de Pedido no se pudo cancelar por que ya pasó a un estado diferente a pendiente',
                  life: 3000,
                });
              }
            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error al ANULAR la Orden de Pedido',
                life: 3000,
              });
            }
          );
      },
    });
  }

  openDialogToEdit() {
    this.titleNewOrdenPedido = 'EDITAR ORDEN DE PEDIDO';
    this.actualizarOP = true;
    this.newOrdenPedidoDialog = true;
  }

  findIndexOPById(idOP: number): number {
    let index = -1;
    for (let i = 0; i < this.ordenesPedidoPageableList.length; i++) {
      if (this.ordenesPedidoPageableList[i].ordenPedidoId === idOP) {
        index = i;
        break;
      }
    }
    return index;
  }

  calculateWeekNumber(currentDate: any) {
    let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }

  matchPlantelIdAndNombre(plantelId: number): string {
    let a;
    this.plantelList
      .filter((p) => p.plantelId === plantelId)
      .map((p) => (a = p.plantelNombre));
    return a;
  }

  validOrInvalidBtnCreate() {
    if (this.tipoOrdenPedido == '') {
      return true;
    } else if (
      this.tipoOrdenPedido == 'OP' &&
      (this.serieOp == '' ||
        this.tipoDocumento == 0 ||
        this.vendedor == 0 ||
        this.canalVenta == 0 ||
        this.clienteAFacturar == '' ||
        this.clienteDestinoReal == '')
    ) {
      return true;
    } else if (
      this.tipoOrdenPedido == 'RT' &&
      (this.serieOp == '' ||
        this.tipoDocumento == 0 ||
        this.vendedor == 0 ||
        this.canalVenta == 0 ||
        this.almacenSedeOrigen == 0 ||
        this.almacenSedeDestino == 0)
    ) {
      return true;
    } else if (this.isTrustedBtnSaveOP) {
      return true;
    } else if (this.detalleOPItemsList.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  hideDialogCreateOP() {
    this.newOrdenPedidoDialog = false;
    this.resetInputsDetalleOP();
    this.resetLugarEntrega();
  }

  setDetallesDeOrden(orden: OrdenPedidoJVResponseCustomDTO) {
    this.opendialogtoupdate(orden);
    if (orden.tipoMoneda == 'MN') {
      this.simboloMoneda = 'S/. ';
    } else {
      this.simboloMoneda = '$. ';
    }
    this.detalleOrdenCustomList = orden.detalleOrdenPedidoList;
  }

  opendialogtoupdate(orden) {
    this.titleDetalleDialog =
      'Detalle orden nro. ' + orden.serie + '-' + orden.numero;
    this.detalleDialog = true;
  }

  getAllByAlmacenIdPageable(
    almacenId: string,
    index: number,
    page: number,
    size: number,
    event?: any
  ) {
    this.loadingOrdenes = true;
    this.ordenPedidoService
      .getByFiltroLikePageable(almacenId, index, page, size)
      .subscribe(
        (data) => {
          let evento = event.originalEvent!;
          if (data.message == 'SUCCESS') {
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = false;
            this.dataFilterLoaded = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataByAlmacenesId = true;
          }
          this.loadingOrdenes = false;
          if (evento?.isTrusted! == true) {
            this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  getAllTipoOrdenesFilterPageable(
    almacenId: string,
    index: number,
    page: number,
    size: number,
    event?: any
  ) {
    this.loadingOrdenes = true;
    this.ordenPedidoService
      .getByFiltroLikePageable(almacenId, index, page, size)
      .subscribe(
        (data) => {
          let evento = event.originalEvent!;
          if (data.message == 'SUCCESS') {
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = false;
            this.dataFilterLoaded = false;
            this.dataByAlmacenesId = false;
            this.dataByEstados = false;
            this.dataByTipoOrdenFilter = true;
          }
          this.loadingOrdenes = false;
          if (evento?.isTrusted! == true) {
            this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  onChangeAlmacenSedeFiltro(e: any) {
    this.getAllByAlmacenIdPageable(
      e.value,
      this.index,
      this.page,
      this.size,
      e
    );
  }

  onChangeTipoOrdenFilterSelect(e: any) {
    this.getAllTipoOrdenesFilterPageable(
      e.value,
      this.index,
      this.page,
      this.size,
      e
    );
  }

  onChangeFiltroSelect(e) {
    this.index = e.value;
    this.filterName = '';
    this.almacenSedeOrigenDestinoId = 0;
    this.tipoOrdenFilterSelect = '';
    this.estadosOrdenFilterSelect = '';
    if (this.index == 1 || this.index == 2 || this.index == 3) {
      this.hideSelectAlmacenOrigenDestino = true;
      this.hideTipoOrdenFilter = true;
      this.hideEstadosFilter = true;
      this.hideInputFiltro = false;
    } else if (this.index == 4 || this.index == 5 || this.index == 0) {
      this.hideInputFiltro = true;
      this.hideSelectAlmacenOrigenDestino = false;
      this.hideEstadosFilter = true;
      this.hideTipoOrdenFilter = true;
    } else if (this.index == 6) {
      this.hideInputFiltro = true;
      this.hideSelectAlmacenOrigenDestino = true;
      this.hideTipoOrdenFilter = false;
      this.hideEstadosFilter = true;
    } else if (this.index == 7) {
      this.hideInputFiltro = true;
      this.hideSelectAlmacenOrigenDestino = true;
      this.hideTipoOrdenFilter = true;
      this.hideEstadosFilter = false;
    }
  }

  onChangeEstadosFilterSelect(e: any) {
    this.getAllByEstadosFilterPageable(
      e.value,
      this.index,
      this.page,
      this.size,
      e
    );
  }

  getAllByEstadosFilterPageable(
    estado: string,
    index: number,
    page: number,
    size: number,
    event?: any
  ) {
    this.loadingOrdenes = true;
    this.ordenPedidoService
      .getByFiltroLikePageable(estado, index, page, size)
      .subscribe(
        (data) => {
          let evento = event.originalEvent!;
          if (data.message == 'SUCCESS') {
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = false;
            this.dataFilterLoaded = false;
            this.dataByAlmacenesId = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = true;
          }
          this.loadingOrdenes = false;
          if (evento?.isTrusted! == true) {
            this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  onChangeCanalVentaFiltro(e: any) {
    this.getAllByCanalVentaIdPageable(e.value, this.page, this.size, e);
  }

  getAllByCanalVentaIdPageable(
    canalVentaId: number,
    page: number,
    size: number,
    e?: any
  ) {
    this.ordenPedidoService
      .getAllByCanalVentaId(canalVentaId, page, size)
      .subscribe((data) => {
        let evento = e.originalEvent!;
        if (data.message == 'SUCCESS') {
          if (data.data!.content!.length > 0) {
            this.frozenInColumnAcciones = true;
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataByAlmacenesId = false;
            this.dataFilterLoaded = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataCanalVentaIdFiltered = true;
            this.dataUsuarioIdFiltered = false;
            if (evento?.isTrusted! == true) {
              this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
            }
          } else {
            this.frozenInColumnAcciones = false;
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataByAlmacenesId = false;
            this.dataFilterLoaded = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataUsuarioIdFiltered = false;
            this.dataCanalVentaIdFiltered = true;
          }
        }
      });
  }
  //canalVentaId:number, page:number, size:number, e?: any
  onChangeUsuarioFiltro(e: any) {
    this.getAllByUsuarioIdPageable(e.value, this.page, this.size, e);
  }

  getAllByUsuarioIdPageable(
    usuarioId: number | null,
    page: number,
    size: number,
    e?: any
  ) {
    if (usuarioId == null) {
      this.getAllPageable(this.page, this.size);
      return;
    }

    this.ordenPedidoService
      .getAllByUsuarioId(usuarioId, page, size)
      .subscribe((data) => {
        let evento = e.originalEvent!;
        if (data.message == 'SUCCESS') {
          if (data.data!.content!.length > 0) {
            this.frozenInColumnAcciones = true;
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataByAlmacenesId = false;
            this.dataFilterLoaded = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = true;
            if (evento?.isTrusted! == true) {
              this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
            }
          } else {
            this.frozenInColumnAcciones = false;
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataByAlmacenesId = false;
            this.dataFilterLoaded = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = true;
          }
        }
      });
  }

  onSelectOperacionGratuita(e: any) {
    //console.log("EVENT OP", e)
  }

  onChangeOperacionGratuitaChk(e: any) {
    if (e.checked == true) {
      this.hideOperacionGratuita = false;
    } else {
      this.hideOperacionGratuita = true;
      this.operacionGratuita = null;
    }
  }

  inputFiltroDisabled() {
    if (this.index == 0) {
      return true;
    }
    return false;
  }

  buscarOrdenes(
    filterName: string,
    index: number,
    page: number,
    size: number,
    $event: Event
  ) {
    this.loadingOrdenes = true;
    this.ordenPedidoService
      .getByFiltroLikePageable(filterName, index, page, size)
      .subscribe(
        (data) => {
          let evento = $event;
          if (data.message == 'SUCCESS') {
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataPreLoaded = false;
            this.dataByRangoFechas = false;
            this.dataByAlmacenesId = false;
            this.dataCanalVentaIdFiltered = false;
            this.dataUsuarioIdFiltered = false;
            this.dataByTipoOrdenFilter = false;
            this.dataByEstados = false;
            this.dataFilterLoaded = true;
          }
          this.loadingOrdenes = false;
          if (evento.isTrusted == true) {
            this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  reiniciarValoresPaginacion(lastPage: number) {
    this.paginador!.first = 0;
    this.firstRowOfPage = 0;
    this.lastRowOfPage = lastPage;
  }

  getAllOPByRangoFechasPageable(
    dateInicial: any,
    dateFinal: any,
    page: number,
    size: number
  ) {
    this.ordenPedidoService
      .getAllByRangoFechasPageable(dateInicial, dateFinal, page, size)
      .subscribe(
        (data) => {
          if (data.message == 'SUCCESS') {
            this.ordenesPedidoPageableList = data.data!.content!;
            this.totalElements = data.data?.totalElements!;
            this.totalPages = data.data?.totalPages!;
            this.number = data.data?.number!;
            this.numberOfElements = data.data?.numberOfElements!;
            this.dataByRangoFechas = true;
          }
          this.loadingOrdenes = false;
          this.dataPreLoaded = false;
          this.dataCanalVentaIdFiltered = false;
          this.dataUsuarioIdFiltered = false;
          this.dataByTipoOrdenFilter = false;
          this.dataByAlmacenesId = false;
          this.dataFilterLoaded = false;
          this.dataByEstados = false;
          if (this.flagSelectedDates == true) {
            this.paginador!.first = 0;
            this.firstRowOfPage = 0;
            this.lastRowOfPage = data.data?.numberOfElements!;
            this.flagSelectedDates = false;
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  }

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == '') {
      return true;
    }
  }

  loadData() {
    this.getAllSeries();
    this.getAllTipoDocumentos();
    this.getAllOrigen();
    this.getAllArticulosHabilitadosCustom();
    this.getAllPlanteles();
    this.getAllCanalesVenta();
    this.vendedor = this.setVendedorLogeadoOnCreateOP(
      this.vendedorLogeado.emailVendedor
    )!!;
  }

  setVendedorLogeadoOnCreateOP(email: string) {
    let vendedor = this.vendedoresList.find(
      (v) => v.correo?.trim() == email.trim()
    );
    return vendedor?.usuarioId;
  }

  newOrdenPedido() {
    this.titleNewOrdenPedido = 'NUEVA ORDEN DE PEDIDO';
    this.resetOP();
    this.resetInputsDetalleOP();
    this.isTrustedBtnSaveOP = false;
    this.contadorSecuenciaDetalle = 0;
    this.actualizarOP = false;
    this.newOrdenPedidoDialog = true;
    this.loadData();
  }

  resetOP() {
    this.tipoOrdenPedido = '';
    this.serieOp = '';
    this.numeroCorrelativo = '';
    this.fechaToday = new Date();
    this.tipoDocumento = 0;
    this.tienda = '';
    this.fechaVencimiento = new Date();
    this.lote = '';
    this.oc = '';
    this.clienteAFacturar = '';
    this.clienteDestinoReal = '';
    this.almacenSedeOrigen = 0;
    this.almacenSedeDestino = 0;
    this.canalVenta = 0;
    this.origen = 'AVIVEL';
    this.plantel = 0;
    this.fechaEntrega = new Date();
    this.horaEntrega = '';
    this.vendedor = 0;
    this.lugarEntrega = '';
    this.tipoMoneda = 'MN';
    this.observacion = '';
    this.detalleOPItemsList = [];
    this.detalleOrdenPedidoBodyList = [];
    this.usuarioVendedorSelected = '';
  }

  resetInputsDetalleOP() {
    this.articuloId = 0;
    this.articuloIdSelected = 0;
    this.codigoDetalle = '';
    this.articuloDescripcionDetalle = '';
    this.um1Detalle = 0;
    this.um2Detalle = 0;
    this.observacionDetalle = '';
    this.precioDetalle = 0;
    this.nombreCortoUM1 = '';
    this.nombreCortoUM2 = '';
    this.chkOperacionGratuita = false;
    this.operacionGratuita = '';
    this.hideOperacionGratuita = true;
    this.chkIncluyeCasillero = false;
  }

  onRowClientSelected(event) {
    let selectedClienteCustom = event.data;
    this.clienteFacturarIdSelected = selectedClienteCustom.clienteId;
    this.lugarEntrega = selectedClienteCustom.clienteDireccion;
    this.getAllAlmacenesByClienteId();
    this.clienteAFacturar =
      selectedClienteCustom.clienteNumeroDocumentoIdentidad
        .concat(' - ')
        .concat(selectedClienteCustom.clienteRazonSocial);
    if (selectedClienteCustom.cliRealId != null) {
      this.clienteDestinoReal = selectedClienteCustom.cliRealNroDoc
        .concat(' - ')
        .concat(selectedClienteCustom.cliRealRazonSocial);
    } else {
      this.clienteDestinoReal =
        selectedClienteCustom.clienteNumeroDocumentoIdentidad
          .concat(' - ')
          .concat(selectedClienteCustom.clienteRazonSocial);
    }
    this.clienteDestinoRealIdSelected = selectedClienteCustom.cliRealId
      ? selectedClienteCustom.cliRealId
      : selectedClienteCustom.clienteId;
    this.filterNameCliente = '';
    this.clientesCustomAUXList = [];
    this.searchClienteCustomDialog = false;

    if (selectedClienteCustom.canalVentaId) {
      this.canalVenta = selectedClienteCustom.canalVentaId;

      this.precioCasilleroCanal = this.canalVentaList.find(
        (item) => item.canalVentaId == selectedClienteCustom.canalVentaId
      )?.precioCasillero;
    }
  }

  onRowArticuloSelected(event) {
    let selectedArticuloCustom = event.data;

    if (
      selectedArticuloCustom.cantCasillero &&
      selectedArticuloCustom.cantCasillero > 0
    ) {
      this.cantidadCasilleroGlobal = selectedArticuloCustom.cantCasillero;
    }

    this.articuloService
      .getById(selectedArticuloCustom.articuloId)
      .subscribe((response: any) => {
        this.articuloIdSelected = selectedArticuloCustom.articuloId;
        this.articuloId = 0;
        this.codigoDetalle = selectedArticuloCustom.articuloCodigo;
        this.articuloDescripcionDetalle =
          selectedArticuloCustom.articuloDescripcion;
        this.nombreCortoUM2 = selectedArticuloCustom.um2NombreCorto;
        this.nombreCortoUM1 = selectedArticuloCustom.um1NombreCorto;
        this.searchArticuloDialog = false;
        this.codCasillero = response.data.codCasillero;
        this.cantCasillero = response.data.cantCasillero;
        this.pesoPromedio = event.data.pesoPromedio;
        this.dtArticuloCustom!.filterGlobal('', '');
      });
  }

  onRowLugarEntregaSelected(event) {
    let selectedLugar = event.data;
    this.lugarEntrega = selectedLugar.direccion
      .concat(' - ')
      .concat(
        selectedLugar.distrito +
          ' - ' +
          selectedLugar.provincia +
          ' - ' +
          selectedLugar.departamento
      );
    this.searchLugarEntregaDialog = false;
  }

  formatDateString(date: Date): any {
    let latest_date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return latest_date;
  }

  addArticuloToDetalleItems() {
    if (this.tipoMoneda == 'MN') {
      this.simboloMoneda = 'S/. ';
    } else {
      this.simboloMoneda = '$ ';
    }
    let fechaToday = this.formatDateString(this.fechaToday);
    this.getPrecioArticuloByFechaAndCanalVenta(
      fechaToday,
      this.articuloIdSelected,
      this.canalVenta
    );
    //this.setDetalles();
  }

  onChangeTipoMoneda() {
    if (this.tipoMoneda == 'MN') {
      this.simboloMoneda = 'S/. ';
    } else {
      this.simboloMoneda = '$ ';
    }
  }

  setDetalles() {
    let top = this.tipoOrdenPedidoList.find(
      (top) => top.id == this.tipoOrdenPedido
    );
    let canal = this.canalVentaList.find(
      (cv) => cv.canalVentaId == this.canalVenta
    );
    if (
      top?.id == 'OP' &&
      canal?.canalVentaDescripcion == 'RETAIL' &&
      (this.precioDetalle == 0 ||
        this.precioDetalle == null ||
        this.precioDetalle == undefined)
    ) {
      this.confirmationService.confirm({
        message: '¿Está seguro de agregar el artículo con el precio en 0.00?',
        header: 'Alerta de precio',
        icon: 'pi pi-exclamation-triangle',
        key: 'cd_validation_OP_CV',
        accept: () => {
          let detalleOP: DetalleOrdenPedidoItemsOPJVDTO = {
            detalleOrdenPedidoId: 0,
            ordenPedidoId: 0,
            articuloId: 0,
            articuloCodigo: '',
            articuloDescripcion: '',
            secuencia: 0,
            cantidad: 0,
            observacion: '',
            precio: 0,
            unidades: 0,
            operacionGratuita: '',
            pesoPromedio: 0,
          };
          let articuloId = this.setArticuloIdFromEditOrNew();
          detalleOP.articuloId = articuloId;
          detalleOP.articuloCodigo = this.codigoDetalle;
          detalleOP.articuloDescripcion = this.articuloDescripcionDetalle;
          let secuencia = this.setSecuenciaDetalle();
          detalleOP.secuencia = secuencia;
          detalleOP.cantidad = this.um1Detalle ? this.um1Detalle : 0.0;
          detalleOP.unidades = this.um2Detalle ? this.um2Detalle : 0.0;
          detalleOP.precio = this.precioDetalle! ? this.precioDetalle : 0.0;
          detalleOP.operacionGratuita = this.operacionGratuita
            ? this.operacionGratuita
            : null;
          if (
            this.chkOperacionGratuita == true &&
            this.operacionGratuita != null
          ) {
            detalleOP.observacion = '37 - OPERACION GRATUTITA';
          } else {
            detalleOP.observacion = this.observacionDetalle;
          }
          this.detalleOPItemsList.push(detalleOP);
          this.addArticuloToDetalleOP(this.detalleOPItemsList);
          this.resetInputsDetalleOP();
        },
        reject: () => {
          this.precioDetalle = null;
        },
      });
    } else {
      let articuloId = this.setArticuloIdFromEditOrNew();
      let detalleOP: DetalleOrdenPedidoItemsOPJVDTO = {
        detalleOrdenPedidoId: 0,
        ordenPedidoId: 0,
        articuloId: 0,
        articuloCodigo: '',
        articuloDescripcion: '',
        secuencia: 0,
        cantidad: 0,
        observacion: '',
        precio: 0,
        unidades: 0,
        operacionGratuita: '',
        pesoPromedio: 0,
      };
      // let articuloId = this.setArticuloIdFromEditOrNew();
      detalleOP.articuloId = articuloId;
      detalleOP.articuloCodigo = this.codigoDetalle;
      detalleOP.articuloDescripcion = this.articuloDescripcionDetalle;
      let secuencia = this.setSecuenciaDetalle();
      detalleOP.secuencia = secuencia;
      detalleOP.cantidad = this.um1Detalle ? this.um1Detalle : 0.0;
      detalleOP.unidades = this.um2Detalle ? this.um2Detalle : 0.0;
      //detalleOP.observacion = this.observacionDetalle;
      detalleOP.precio = this.precioDetalle! ? this.precioDetalle : 0.0;
      detalleOP.operacionGratuita = this.operacionGratuita
        ? this.operacionGratuita
        : null;
      if (this.chkOperacionGratuita == true && this.operacionGratuita != null) {
        detalleOP.observacion = '37 - OPERACION GRATUTITA';
      } else {
        detalleOP.observacion = this.observacionDetalle;
      }
      detalleOP.pesoPromedio = this.pesoPromedio ? this.pesoPromedio : 0;
      this.cantidadHuevo = this.um2Detalle ? this.um2Detalle : 0.0;

      this.cantidadHuevoGLobal = this.cantCasillero
        ? this.um2Detalle
          ? this.um2Detalle
          : 0.0
        : 0;

      this.detalleOPItemsList.push(detalleOP);
      if (this.codCasillero) {
        this.articuloService
          .getArticulo(this.codCasillero)
          .subscribe((response: any) => {
            let detalleOP: DetalleOrdenPedidoItemsOPJVDTO = {
              detalleOrdenPedidoId: 0,
              ordenPedidoId: 0,
              articuloId: 0,
              articuloCodigo: '',
              articuloDescripcion: '',
              secuencia: 0,
              cantidad: 0,
              observacion: '',
              precio: 0,
              unidades: 0,
              operacionGratuita: '',
              pesoPromedio: 0,
            };

            detalleOP.articuloId = response.data.articuloId;
            detalleOP.articuloCodigo = response.data.codigoArticulo;
            detalleOP.articuloDescripcion = response.data.descripcionArticulo;
            let secuencia = this.setSecuenciaDetalle();
            detalleOP.secuencia = secuencia;
            detalleOP.cantidad =
              (this.cantidadHuevo * this.cantCasillero) / 120;
            detalleOP.unidades = 0.0;
            detalleOP.precio = canal?.precioCasillero
              ? canal.precioCasillero
              : response.data.precio;
            detalleOP.operacionGratuita = null;

            detalleOP.observacion = '';

            this.detalleOPItemsList.push(detalleOP);
            this.addArticuloToDetalleOP(this.detalleOPItemsList);
            this.resetInputsDetalleOP();
          });
      }
      this.addArticuloToDetalleOP(this.detalleOPItemsList);
      this.resetInputsDetalleOP();
    }
  }

  setArticuloIdFromEditOrNew(): number {
    if (
      this.articuloIdSelected != 0 &&
      this.articuloIdSelected != undefined &&
      this.articuloIdSelected != null
    ) {
      return this.articuloIdSelected;
    } else if (this.articuloId != 0) {
      return this.articuloIdSelected;
    }
    return 0;
  }

  addArticuloToDetalleOP(detalleOPItemsList: DetalleOrdenPedidoItemsOPJVDTO[]) {
    let detOPBodyList = detalleOPItemsList.map(
      (det) =>
        <DetalleOrdenPedidoJVDTO>{
          articuloId: det.articuloId,
          detalleOrdenPedidoId: det.detalleOrdenPedidoId,
          ordenPedidoId: det.ordenPedidoId,
          observacion: det.observacion,
          secuencia: det.secuencia!,
          cantidad: det.cantidad,
          unidades: det.unidades,
          precio: det.precio,
          operacionGratuita: det.operacionGratuita,
        }
    );
    this.detalleOrdenPedidoBodyList = detOPBodyList;
  }

  setSecuenciaDetalle() {
    this.contadorSecuenciaDetalle = this.contadorSecuenciaDetalle + 1;
    return this.contadorSecuenciaDetalle;
  }

  disableBtnAddArticulo(): boolean {
    if (
      this.codigoDetalle == null ||
      this.codigoDetalle == '' ||
      this.articuloDescripcionDetalle == null ||
      this.articuloDescripcionDetalle == ''
    ) {
      return true;
    } else if (
      (this.codigoDetalle != null ||
        this.codigoDetalle != '' ||
        this.articuloDescripcionDetalle != null ||
        this.articuloDescripcionDetalle != '' ||
        this.precioDetalle != null) &&
      this.um2Detalle == 0 &&
      this.um1Detalle == 0
    ) {
      return false;
    } else {
      return false;
    }
  }

  disableInputSerie(): boolean {
    if (this.tipoOrdenPedido == null || this.tipoOrdenPedido == '') {
      return true;
    }
    return false;
  }

  editItemDetalleOP(
    detalleItem: DetalleOrdenPedidoItemsOPJVDTO,
    index: number
  ) {
    this.removeRow(index);
    this.reOrderSecuenciaDetalleOPItems();
    this.articuloIdSelected = detalleItem.articuloId;
    this.articuloId = detalleItem.articuloId;
    let articuloFilter = this.setUnidadMedidaDescripcion(this.articuloId);
    this.codigoDetalle = detalleItem.articuloCodigo;
    this.articuloDescripcionDetalle = detalleItem.articuloDescripcion;
    this.um2Detalle = detalleItem.unidades;
    this.nombreCortoUM2 = articuloFilter[0]?.um2NombreCorto;
    this.um1Detalle = detalleItem.cantidad;
    this.nombreCortoUM1 = articuloFilter[0]?.um1NombreCorto;
    this.observacionDetalle = detalleItem.observacion;
    this.precioDetalle = detalleItem.precio;
    this.contadorSecuenciaDetalle = this.detalleOPItemsList.length;
    this.setOPeracionGratuitaToEdit(detalleItem);
  }

  setUnidadMedidaDescripcion(articuloId: number): ArticuloCustomJVDTO[] {
    let articuloFilter: ArticuloCustomJVDTO[] = [];
    articuloFilter = this.articuloEnabledCustomList.filter(
      (art) => art.articuloId === articuloId
    );
    return articuloFilter;
  }

  setOPeracionGratuitaToEdit(detalleItem: DetalleOrdenPedidoItemsOPJVDTO) {
    if (detalleItem.operacionGratuita != null) {
      this.chkOperacionGratuita = true;
      this.hideOperacionGratuita = false;
      this.operacionGratuita = detalleItem.operacionGratuita;
    }
  }

  removeRow(index: number) {
    this.detalleOPItemsList.splice(index, 1);
    this.detalleOrdenPedidoBodyList.splice(index, 1);
    this.reOrderSecuenciaDetalleOPItems();
    this.reOrderSecuenciaDetalleOPBody();
    this.contadorSecuenciaDetalle = this.detalleOPItemsList.length;
  }

  reOrderSecuenciaDetalleOPItems() {
    for (let i = 0; i < this.detalleOPItemsList.length; i++) {
      this.detalleOPItemsList[i].secuencia = i + 1;
    }
  }

  reOrderSecuenciaDetalleOPBody() {
    for (let i = 0; i < this.detalleOrdenPedidoBodyList.length; i++) {
      this.detalleOrdenPedidoBodyList[i].secuencia = i + 1;
    }
  }

  getSedeLogged() {
    this.servidor = environment.ZONA;
  }

  onVendedorSelected(event) {
    let usuario: any = this.vendedoresList.find(
      (v) => v.usuarioId == event.value
    );
    this.usuarioVendedorSelected! = usuario.username;
  }

  onArticuloDisable() {
    if (
      this.tipoOrdenPedido == '' ||
      this.tipoOrdenPedido == null ||
      this.tipoOrdenPedido == undefined ||
      !this.canalVenta
    ) {
      return true;
    } else {
      return false;
    }
  }

  onPrecioDisable() {
    if (this.codigoDetalle == null || this.codigoDetalle == '') {
      return true;
    } else {
      return false;
    }
  }

  onObsDisable() {
    return this.codigoDetalle == null || this.codigoDetalle == '';
  }

  onCantidadDisable() {
    return this.codigoDetalle == null || this.codigoDetalle == '';
  }

  onUnidadDisable() {
    return this.codigoDetalle == null || this.codigoDetalle == '';
  }

  filterDataClientes(filterNameCliente: string) {
    if (filterNameCliente === null || filterNameCliente === '') {
      this.clientesCustomAUXList = [];
    } else {
      this.clientesCustomAUXList = [];
      this.clientesCustomAUXList.push(...this.filterItems(filterNameCliente));
    }
  }

  filterItems(filterName: string) {
    return this.clientesCustomList.filter((a) => {
      if (
        a.clienteRazonSocial?.toUpperCase().startsWith(filterName.toUpperCase())
      ) {
        return a.clienteRazonSocial;
      } else if (
        a.clienteNombreComercial
          ?.toUpperCase()
          .startsWith(filterName.toUpperCase())
      ) {
        return a.clienteNombreComercial;
      } else if (
        a.clienteNumeroDocumentoIdentidad
          ?.toUpperCase()
          .startsWith(filterName.toUpperCase())
      ) {
        return a.clienteNumeroDocumentoIdentidad;
      } else {
        return null;
      }
    });
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,4})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  onClickDownloadPdf() {
    let DATA: any = document.getElementById('contenido');
    html2canvas(DATA).then((canvas) => {
      const img = canvas.toDataURL('image/png', 1);
      this.downloadLink!.setAttribute('href', img); // Set "a" element link
      this.downloadLink!.setAttribute('download', 'ordenPedido.png'); // Set download filename
      this.downloadLink!.click(); // Start downloading
    });
  }

  subtotalItem(detalleItem) {
    // let subtotal = 0;

    if (detalleItem.articuloDescripcion.includes('CASILLERO')) {
      const unidades =
        this.cantidadHuevoGLobal > 0
          ? this.cantidadHuevoGLobal
          : this.detalleOPItemsList.find((item) => item.unidades)?.unidades ??
            0;

      const casillero =
        this.cantidadCasilleroGlobal > 0
          ? this.cantidadCasilleroGlobal
          : this.detalleOPItemsList.find((item) => item.cantCasillero)
              ?.cantCasillero ?? 0;

      return (
        ((unidades * casillero) / 120) *
        this.precioCasilleroCanal
      ).toFixed(2);
    }
    if (detalleItem.cantidad) {
      return (detalleItem.cantidad * detalleItem.precio).toFixed(2);
    } else {
      let cant = detalleItem.unidades * detalleItem.pesoPromedio;
      return (detalleItem.precio * cant).toFixed(2);
    }
  }

  onChangeIncluyeCasillero(event) {}

  totalAmountOrder() {
    let total: number = 0;

    if (this.detalleOPItemsList.length > 0) {
      this.detalleOPItemsList.forEach((order: any) => {
        if (order.articuloDescripcion.includes('CASILLERO')) {
          const unidades =
            this.cantidadHuevoGLobal > 0
              ? this.cantidadHuevoGLobal
              : this.detalleOPItemsList.find((item) => item.unidades)
                  ?.unidades ?? 0;

          const casillero =
            this.cantidadCasilleroGlobal > 0
              ? this.cantidadCasilleroGlobal
              : this.detalleOPItemsList.find((item) => item.cantCasillero)
                  ?.cantCasillero ?? 0;

          total =
            total +
            parseFloat(
              (
                ((unidades * casillero) / 120) *
                this.precioCasilleroCanal
              ).toFixed(2)
            );
        } else if (order.cantidad) {
          total =
            total + parseFloat((order.cantidad * order.precio).toFixed(2));
        } else {
          let cant = order.unidades * order.pesoPromedio;
          total = total + parseFloat((order.precio * cant).toFixed(2));
        }
      });
    }

    return total.toFixed(2);
  }

  onChangeCanalVenta(event) {
    console.log('change_canal');
    this.precioCasilleroCanal = this.canalVentaList.find(
      (item) => item.canalVentaId == event.value
    )?.precioCasillero;
  }

  detalleCantidad(detalleItem) {
    if (detalleItem.articuloDescripcion.toLowerCase().includes('CASILLERO')) {
      const unidades =
        this.cantidadHuevoGLobal > 0
          ? this.cantidadHuevoGLobal
          : this.detalleOPItemsList.find((item) => item.unidades)?.unidades ??
            0;

      const casillero =
        this.cantidadCasilleroGlobal > 0
          ? this.cantidadCasilleroGlobal
          : this.detalleOPItemsList.find((item) => item.cantCasillero)
              ?.cantCasillero ?? 0;

      return ((unidades * casillero) / 120).toFixed(2);
    }

    if (detalleItem.cantidad) {
      return detalleItem.cantidad;
    } else {
      return (detalleItem.unidades ?? 0) * (detalleItem.pesoPromedio ?? 0);
    }
  }
}
