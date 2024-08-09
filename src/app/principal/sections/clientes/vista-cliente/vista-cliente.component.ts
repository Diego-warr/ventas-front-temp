import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioServiceService } from "../../../../services/usuario.service";
import { ClienteService } from "../../../../services/cliente.service";
import { ClienteDTO } from "../../../../dto/ClientesDTO";
import { EncargadoPagosDTO } from "../../../../dto/EncargadoPagosDTO";
import { EncargadoTomaPedidosDTO } from "../../../../dto/EncargadoTomaPedidosDTO";
import { UsuarioBodyDTO } from "../../../../dto/UsuarioBodyDTO";
import { DireccionDTO } from "../../../../dto/DireccionDTO";
import { AlmacenClienteDTO } from "../../../../dto/AlmacenClienteDTO";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Table } from 'primeng/table';
import { DocumentoService } from 'src/app/services/documento.service';
import { DocumentoJVDTO } from 'src/app/dto/DocumentoJVDTO';
import { OrdenPedidoService } from 'src/app/services/ordenpedido.service';
import { Paginator } from 'primeng/paginator';
import { DatePipe } from '@angular/common';
import { OrdenPedidoJVResponseCustomDTO } from 'src/app/dto/OrdenPedidoJVResponseCustomDTO';
import { Calendar } from 'primeng/calendar';
import { DetalleOrdenPedidoJVCustomDTO } from 'src/app/dto/DetalleOrdenPedidoJVCustomDTO';
import { DetalleDocumentoJVBodyDTO } from 'src/app/dto/DetalleDocumentoJVBodyDTO';
import { ClienteJVBodyDTO } from 'src/app/dto/ClienteJVBodyDTO';
import { TipoDocumentoIdentidadService } from 'src/app/services/tipo-documento-identidad.service';
import { TipoDocumentoIdentidadJVDTO } from 'src/app/dto/TipoDocumentoIdentidadJVDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { CarpetaService } from 'src/app/services/carpeta.service';
import { CarpetaJVDTO } from 'src/app/dto/CarpetaJVDTO';
import { DireccionBodyDTO } from 'src/app/dto/DireccionBodyDTO';
import { DireccionEmpresaDTO } from 'src/app/dto/DireccionEmpresaDTO';
import { UbigeoDTO } from 'src/app/dto/UbigeoDTO';
import { GrupoClienteService } from 'src/app/services/grupo-cliente.service';
import { GrupoClienteJVDTO } from 'src/app/dto/GrupoClienteJVDTO';
import { CondicionPagoService } from 'src/app/services/condicion-pago.service';
import { CondicionPagoJVDTO } from 'src/app/dto/CondicionPagoJVDTO';
import { MedioPagoService } from 'src/app/services/medio-pago.service';
import { MedioPagoJVDTO } from 'src/app/dto/MedioPagoJVDTO';
import { ClienteFacturadoDeJVDTO } from 'src/app/dto/ClienteFacturadoDeJVDTO';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.scss'],
  providers: [MessageService, ConfirmationService],
  styles: [`
    :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  `]
})
export class VistaClienteComponent implements OnInit {

  clienteId: number = 0;
  cliente!: ClienteDTO;
  clienteToEdit!: ClienteJVBodyDTO;
  clienteToSave!: ClienteJVBodyDTO;
  clienteTabla!: DireccionEmpresaDTO;
  cliDirecEmpresaList: DireccionEmpresaDTO[] = [];
  cloneEncargadoPagos: { [s: string]: EncargadoPagosDTO; } = {};
  cloneEncargadoTomaPedidos: { [s: string]: EncargadoTomaPedidosDTO; } = {};
  clientesFacturados!: ClienteDTO[];

  navigationItmesRoutes: MenuItem[] = [
    { label: "Lista de Clientes", icon: 'pi pi-fw pi-external-link', routerLink: '/clientes' },
    { label: "Información del Cliente" },
  ];

  encargadoPagosForm: FormGroup = new FormGroup({});
  encargadoPagosSubmitted: boolean = false;
  encargadoPagosDialog: boolean = false;
  encargadosPagosList: EncargadoPagosDTO[] = [];
  encargadoPagosIndex = 0;

  listaEncargadosTomaPedidos: EncargadoTomaPedidosDTO[] = [];
  listaEncargadosTomaPedidos2: EncargadoTomaPedidosDTO[] = [];

  listaDirecciones: DireccionDTO[] = [];
  listaAlmacenes: AlmacenClienteDTO[] = [];

  documentsList: DocumentoJVDTO[] = [];
  ordenesPedidosCustomList!: OrdenPedidoJVResponseCustomDTO[];
  detalleOrdenCustomList!: DetalleOrdenPedidoJVCustomDTO[];
  detalleComprobantesList: DetalleDocumentoJVBodyDTO[] = [];

  loadingDocuments = true;

  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;

  firstRowOfPage = 0;
  lastRowOfPage = 10;

  loadingOrdenes = true;
  spinnerOn = false;

  dateInicial!: Date;
  dateFinal!: Date;

  impTotal = 0;
  importeTotal = 0;

  filterName!: string;
  filterNameComprobantes!: string;
  indexSelected!: number;
  indexComprobantesSelected!: number;
  nroCaracteresFilterComprobantes!: number;
  nroCaracteresFilter!: number;

  detalleDialog = false;
  detalleComprobantesDialog = false;
  filtroSelectComprobantes!: any[];
  filtroSelectOrdenesPedidos!: any[];

  dataPreLoaded!: boolean;
  dataByRangoFechas!: boolean;
  dataFilterLoaded = false;

  index = 0;

  actualizarDatos = false;

  codigoCliente!: string;
  tipoDocumentoIdentidadList: TipoDocumentoIdentidadJVDTO[] = [];
  carpetaList: CarpetaJVDTO[] = [];
  tipoDocIdentidadIdFromCliente!: number;
  carpetaIdFromCliente!: number;
  estadoCivilDescripcionFromCliente!: String;
  tipoPersonaFromCliente!: String;
  estadoCivilList: any[] = [];
  tipoPersonaList: any[] = [];
  tipoClienteList: any[] = [];
  canalesVentaList: CanalVentaJVDTO[] = [];
  canalVentaIdFromCliente!: number;
  tipoClienteFromCliente!: String;
  direccionFromCliente!: String;
  departamentoFromCliente!: String;
  provinciaFromCliente!: String;
  distritoFromCliente!: String;
  referenciaFromCliente!: String;
  telefono1!: string;

  direccionEmpresaDialog = false;
  direccionEntregaDialog = false;
  titleDireccionEmpresa!: string;
  titleDireccionEntrega!: string;

  ubigeos: UbigeoDTO[] = [];
  departamentoList: string[] = [];
  provinciaList: string[] = [];
  distritoList: string[] = [];
  provinciasList: string[] = [];
  distritosList: string[] = [];

  actualizarDireccionEmpresa = false;
  actualizarDireccionEntrega = false;

  direccionEmpresaToEdit!: ClienteDTO;
  direccionEntregaToCreateUpdate: DireccionBodyDTO = {
    direccionId: 0, clienteId: 0, departamento: "", descripcion: "", direccion: "",
    distrito: "", provincia: "", latitud: 0, longitud: 0
  };
  direccionEntregaToEdit!: AlmacenClienteDTO;
  direccionEntrega!: string;
  departamentoEntrega!: string;
  provinciaEntrega!: string;
  distritoEntrega!: string;
  descripcionEntrega!: string;
  latitudEntrega!: number;
  longitudEntrega!: number;

  mapDireccionEntregaDialog = false;
  titleDireccionEntregaDialog!: string;

  latitudeMapEntrega!: number;
  longitudeMapEntrega!: number;
  direccionMapEntrega!: string;
  distritoMapEntrega!: string;
  descripcionMapEntrega!: string;
  zoomMapEntrega!: number;

  primerNombre!: string;

  /*   */
    segundoNombre!: string;
    tercerNombre!: string;
  /*   */

  maxLengthNumDoc!: number;

  apellidoPaterno!: string;
  apellidoMaterno!: string;
  documentoIdentidadReal!: string;
  searchClienteFacturadoDeDialog = false;

  clientesFacturadoDeList: ClienteFacturadoDeJVDTO[]=[];
  loadingClientesFacturadosDe = false;
  filterNameClienteFacturado!: string;
  clientesFacturarList: ClienteFacturadoDeJVDTO[]=[];
  clienteFacturadoDeId!: number;

  celularA: string = '';
  celularB: string = '';
  correoElectronico!: string;
  nombreComercial!: string;
  razonSocial!: string;
  fechaNacimiento!: Date;
  numDocumento!: string;
  giroNegocio!: string;
  codigoPagador!: string;
  fax!: string;
  grupoCliente!: number;
  tipoMoneda!: string;
  condicionPago!: number;

  tienescredito = false;
  diasCredito!: number | null;
  garantiaCreditoList: any[]=[];
  garantiaCredito!: string;
  lineaCredito!: number | null;

  grupoClienteList: GrupoClienteJVDTO[] = [];
  condicionPagoList: CondicionPagoJVDTO[] = [];
  metodoPagoList: MedioPagoJVDTO[]=[];

  metodoPago!: number;

  tipoMonedaList: any[] = [];

  disabledDiasCredito!: boolean;
  disabledGarantCredito!: boolean;
  disabledLineaCredito!: boolean;

  checkAprobar = false;
  checkDesaprobar = false;

  @ViewChild('dtcomprob') dtcomprob: Table | undefined;
  @ViewChild('dtOrdenes') dtOrdenes: Table | undefined;
  @ViewChild('dateIni') calendarIni: Calendar | undefined;
  @ViewChild('dateFin') calendarFin: Calendar | undefined;
  @ViewChild('dateOrdenIni') calendarOrdenIni: Calendar | undefined;
  @ViewChild('dateOrdenFin') calendarOrdenFin: Calendar | undefined;
  @ViewChild('paginadorConprobante', { static: false }) paginadorConprobante: Paginator | undefined;
  @ViewChild('dtCliFacturadoDe') dtCliFacturadoDe: Table | undefined;

  vendedor: UsuarioBodyDTO = {
    correo: "",
    apellidos: "",
    username: "",
    password: "",
    nombres: "",
    status: "A",
    usuarioId: 0,
    roles: [],
    lineaNegocios: [],
    clientes: []
  };

  constructor(private router: Router,
    protected activateRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usuarioService: UsuarioServiceService,
    private documentoService: DocumentoService,
    private carpetaService: CarpetaService,
    private grupoClienteService: GrupoClienteService,
    private ordenPedidoService: OrdenPedidoService,
    private tipoDocumentoIdentidadService: TipoDocumentoIdentidadService,
    private canalVentaService: CanalVentaService,
    private condicionPagoService: CondicionPagoService,
    private medioPagoService: MedioPagoService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllTiposDocumentoIdentidad();
    this.activateRoute.paramMap.subscribe(params => {
      this.clienteId = Number(params.get("clienteId"));
      if (this.clienteId != 0) {
        this.actualizarDatos = true;
        this.clienteById(this.clienteId);
        this.hideAddDireccionEmpresa();
      } else {
        this.actualizarDatos = false;
        this.addNavigationItemsRoutes(this.navigationItmesRoutes);
        this.resetClienteDatos();
      }
    });

    this.initializeCliente();
    this.initFormCliente();
    this.getEncargadosTomaPedidos();
    this.getAllAlmacenesByClienteId();
    this.getByClienteId(this.clienteId);
    this.getAllCanalesVenta();
    this.getAllComprobantesByClienteIdPageable(this.clienteId, this.page, this.size);
    this.getEstadoCivil();
    this.getTipoPersona();
    this.getTipoCliente();
    this.getAllCarpetas();
    this.getAllUbigeo();
    this.getAllGrupoCliente();
    this.getAllCondicionPago();
    this.onChangeCheckTieneCliente();
    this.getAllMediosPago();
    this.getAllClientesFacturadosDe();

    this.encargadoPagosForm = this.formBuilder.group({
      encargadoPagosId: [0],
      nombres: ['', Validators.required],
      apePaterno: ['', Validators.required],
      apeMaterno: ['', Validators.required],
      numFijo: [''],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      status: ['A'],
      clienteId: [0]
    });

    this.filtroSelectComprobantes = [
      { id: 1, label: 'Número' },
      { id: 2, label: 'Guia remision' },
      { id: 3, label: 'Cliente comprobante' },
      { id: 4, label: 'Cliente real' }
    ]

    this.tipoMonedaList = [
      { id: 'Soles', label: 'Soles' },
      { id: 'Dolares', label: 'Dolares' },
    ]

    this.filtroSelectOrdenesPedidos = [
      { id: 1, label: 'Número' },
      { id: 2, label: 'Cliente comprobante' },
      { id: 3, label: 'Cliente real' }
    ]

    this.garantiaCreditoList = [
      { id: 'LE', descripcion: 'LETRA' },
      { id: 'CF', descripcion: 'CARTA FIANZA' },
      { id: 'GI', descripcion: 'GARANTÍA INMOBILIARIA' },
      { id: 'GV', descripcion: 'GARANTÍA VEHICULAR' },
      { id: 'OT', descripcion: 'OTROS' },
    ]
  }

  initializeCliente() {
    this.clienteToEdit = {
      clienteId: 0, clienteTipoPersona: "", clienteCardCode: "", tipoDocumentoIdentidadId: 0, clienteNumeroDocumentoIdentidad: "", clienteRazonSocial: "", clienteNombreComercial: "",
      clienteCardType: "", clienteApellidoPaterno: "", clienteApellidoMaterno: "", clienteNombres: "", clienteDireccion: "", clienteDepartamento: "", clienteProvincia: "",
      clienteDistrito: "", clienteDireccionReferencia: "", canalVentaId: 0, carpetaId: 0, clienteCredito: 0, clienteDiasCredito: 0, clienteTipoCliente: "",
      clienteNumeroDocumentoIdentidadReal: "", clienteTelefono: "", clienteMovil: "", clienteEmail: "", clienteEstadoCivil: "",
      clienteGarantiaCredito: "", clienteLineaCredito: 0, clienteCodigoPagador: "", usuarioId: 0, clienteActivo: "", giroNegocio: "", clienteFax: "", clienteTipoMoneda: "",
      grupoClienteId: 0, condicionPagoId: 0, mediopagoId: 0, fechaNacimiento: null
    }

    this.clienteToSave = {
      clienteId: 0, clienteTipoPersona: "", clienteCardCode: "", tipoDocumentoIdentidadId: 0, clienteNumeroDocumentoIdentidad: "", clienteRazonSocial: "", clienteNombreComercial: "",
      clienteCardType: "", clienteApellidoPaterno: "", clienteApellidoMaterno: "", clienteNombres: "", clienteDireccion: "", clienteDepartamento: "", clienteProvincia: "",
      clienteDistrito: "", clienteDireccionReferencia: "", canalVentaId: 0, carpetaId: 0, clienteCredito: 0, clienteDiasCredito: 0, clienteTipoCliente: "",
      clienteNumeroDocumentoIdentidadReal: "", clienteTelefono: "", clienteMovil: "", clienteEmail: "", clienteEstadoCivil: "",
      clienteGarantiaCredito: "", clienteLineaCredito: 0, clienteCodigoPagador: "", usuarioId: 0, clienteActivo: "", giroNegocio: "", clienteFax: "", clienteTipoMoneda: "",
      grupoClienteId: 0, condicionPagoId: 0, mediopagoId: 0, fechaNacimiento: null
    }
  }

  onChangeFiltroSelectComprobantes(e) {
    this.index = e.value;
    this.filterNameComprobantes = "";
  }

  onChangeFiltroSelect(e) {
    this.index = e.value;
    this.filterName = "";
    if (this.index == 1) {
      this.nroCaracteresFilter = 11;
    }
  }

  getEstadoCivil() {
    this.estadoCivilList = [
      { estadoCivilId: 1, estadoCivilDescripcion: 'SO' },
      { estadoCivilId: 2, estadoCivilDescripcion: 'CA' },
      { estadoCivilId: 3, estadoCivilDescripcion: 'CO' },
      { estadoCivilId: 4, estadoCivilDescripcion: 'VI' },
      { estadoCivilId: 5, estadoCivilDescripcion: 'OT' },
    ]
  }

  getTipoPersona() {
    this.tipoPersonaList = [
      { tipoPersonaId: 'N', tipoPersonaDescripcion: 'Natural' },
      { tipoPersonaId: 'J', tipoPersonaDescripcion: 'Jurídica' },
    ]
  }

  getTipoCliente() {
    this.tipoClienteList = [
      { tipoClienteId: 'N', tipoClienteDescripcion: 'N - Nacional' },
      { tipoClienteId: 'E', tipoClienteDescripcion: 'E - Extranjero' },
    ]
  }

  getAllCanalesVenta() {
    this.canalVentaService.getAll().subscribe(
      data => {
        this.canalesVentaList = data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllCarpetas() {
    this.carpetaService.getAll().subscribe(
      data => {
        this.carpetaList = data.data!;
      },
      error => {
        console.log(error)
        return "Error"
      }
    );
  }

  getAllCondicionPago() {
    this.condicionPagoService.all().subscribe(
      data => {
        if (data.status == 'OK') {
          this.condicionPagoList = data.data!;
        }
      }
    )
  }

  getAllUbigeo() {
    this.clienteService.allUbigeo().subscribe(
      data => {
        this.ubigeos = (data);
        this.getDepartamentos();
        this.getProvincias();
        this.getDistritos();
      },
      error => {
        console.log(error)
        return "Error"
      }
    )
  }

  getAllGrupoCliente() {
    this.grupoClienteService.getAll().subscribe(
      data => {
        this.grupoClienteList = data.data!;
      }
    )
  }

  getDepartamentos() {
    let allDepart = this.ubigeos.map(u => u.ubigeoDepartamento);
    this.departamentoList = allDepart.filter((item, index) => {
      return allDepart.indexOf(item) === index
    })
  }

  getProvincias() {
    let allProv = this.ubigeos.map(u => u.ubigeoProvincia);
    this.provinciaList = allProv.filter((item, index) => {
      return allProv.indexOf(item) === index
    })
  }

  getDistritos() {
    let allDist = this.ubigeos.map(u => u.ubigeoDistrito);
    this.distritoList = allDist.filter((item, index) => {
      return allDist.indexOf(item) === index
    })
  }

  onChangeDepartamentoCliente(e: any) {
    this.provinciaFromCliente = "";
    this.distritoFromCliente = "";
    let filterByValue = this.ubigeos.filter(u => u.ubigeoDepartamento == e.value)
    let allProvincias = filterByValue.map(u => u.ubigeoProvincia);
    this.provinciasList = allProvincias.filter((item, index) => {
      return allProvincias.indexOf(item) === index
    })
  }

  onChangeProvinciaCliente(e: any) {
    this.distritoFromCliente = "";
    let filterByValue = this.ubigeos.filter(u => u.ubigeoProvincia == e.value)
    let allDistrito = filterByValue.map(u => u.ubigeoDistrito);
    this.distritosList = allDistrito.filter((item, index) => {
      return allDistrito.indexOf(item) === index
    })
  }

  getAllTiposDocumentoIdentidad() {
    this.tipoDocumentoIdentidadService.getAll().subscribe(
      data => {
        if (data.status == "OK") {
          this.tipoDocumentoIdentidadList = data.data!;
        }
      }
    )
  }

  getAllMediosPago() {
    this.medioPagoService.getAll().subscribe(
      data => {
        if (data.status = "OK") {
          this.metodoPagoList = data.data!;
        }
      }
    )
  }

  getAllComprobantesByClienteIdPageable(clienteId: number, page: number, size: number) {
    this.documentoService.allByClienteIdPageable(clienteId, page, size).subscribe(
      data => {
        if (data.message == "SUCCESS") {
          this.documentsList = data.data?.content!;
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataPreLoaded = true;
        }
        this.loadingDocuments = false;
        this.spinnerOn = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  buscarComprobantes(filterNameComprobantes: string, index: number, page: number, size: number, $event: Event) {
    this.loadingDocuments = true;
    this.documentoService.getByFiltroLikeAndClienteIdPageable(this.clienteId, filterNameComprobantes, index, page, size).subscribe(
      data => {
        if (data.message == "SUCCESS") {
          this.documentsList = data.data!.content!;
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataPreLoaded = false;
          this.dataFilterLoaded = true;
        }
        this.loadingDocuments = false;
        this.dataByRangoFechas = false;
        this.paginadorConprobante!.first = 0;
      }
    )

  }

  getByClienteId(clienteId: number) {
    this.ordenPedidoService.getByClienteId(clienteId).subscribe(
      data => {
        if (data.status == "OK") {
          this.ordenesPedidosCustomList = data.data!;
          this.sumar(this.ordenesPedidosCustomList);
          this.loadingOrdenes = false;
          this.loadingDocuments = false;
          this.index = 0;
          this.spinnerOn = false;
        }
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  clienteById(clienteId: number) {
    this.clienteService.clienteById(clienteId).subscribe(
      response => {
        if (response.status == "OK") {
          this.cliente = response.data!;
          console.log("CLIENTE IN", this.cliente)
          this.apellidoPaterno = this.cliente.apellidoPaterno;
          this.apellidoMaterno = this.cliente.apellidoMaterno;
          this.setNombresinDatosClientes(this.cliente.primerNombre!);
          this.correoElectronico = this.cliente.correoElectronico;
          this.codigoCliente = this.cliente.cardCode;
          this.tipoDocIdentidadIdFromCliente = this.cliente.tipoDocumentoId.tipoDocumentoId;
          this.estadoCivilDescripcionFromCliente = this.cliente.estadoCivil!
          let fechaNac = this.formatDates(this.cliente?.fechaNacimiento);
          this.fechaNacimiento = fechaNac;
          this.documentoIdentidadReal = this.cliente.clienteNumeroDocumentoIdentidadReal;
          this.nombreComercial = this.cliente.nombreComercial;
          this.razonSocial = this.cliente.razonSocial;
          this.numDocumento = this.cliente.numDocumento;
          this.giroNegocio = this.cliente.giroNegocio!;
          this.tipoPersonaFromCliente = this.cliente.tipoPersona;
          this.canalVentaIdFromCliente = this.cliente.canalVentaId?.canalVentaId;
          this.tipoClienteFromCliente = this.cliente.tipo;
          this.carpetaIdFromCliente = this.cliente.carpetaId;
          this.codigoPagador = this.cliente.codigo;
          this.telefono1 = this.cliente.telefono1 ? String(this.cliente.telefono1) : '';
          this.setCelularesInDatosCliente(this.cliente.celular!);
          this.setMaxTipoDocLength(this.cliente?.tipoDocumentoId!.tipoDocumentoId!);
          this.fax = this.cliente.fax;
          this.grupoCliente = this.cliente.grupoClienteId?.grupoclienteId!;
          this.condicionPago = this.cliente.condicionPagoId?.condicionpagoId!;
          this.tipoMoneda = this.cliente.tipoMoneda;
          this.metodoPago = this.cliente.mediopagoId?.mediopagoId!;
          this.getClientesFacturadosByNumDocumento(this.cliente)
          this.setDireccionEntregaInTable(this.cliente);
          this.addNavigationItemsRoutes(this.navigationItmesRoutes)
          this.setInfoComercial(this.cliente);
          if (this.cliente.usuarioId?.usuarioId != null) {
            this.vendedorById(this.cliente.usuarioId.usuarioId);
          }
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  setNombresinDatosClientes(nombreLargo: string) {
    if (nombreLargo !=null) {
      let nombre = nombreLargo.split(" ")
      this.primerNombre = nombre[0];
      this.segundoNombre = nombre[1];
      this.tercerNombre = nombre [2];
    } else {
      this.primerNombre = "";
      this.segundoNombre = "";
      this.tercerNombre= "";
    }

  }

  setInfoComercial(cliente: ClienteDTO) {
    this.tienescredito = this.setTieneCredito(cliente.clienteCredito);
    this.diasCredito = cliente.clienteDiasCredito;
    this.garantiaCredito = cliente.clienteGarantiaCredito;
    this.lineaCredito = cliente.clienteLineaCredito;
  }

  setTieneCredito(credito: number) {
    if (credito == 1) {
      this.disabledDiasCredito = false;
      this.disabledGarantCredito = false;
      this.disabledLineaCredito = false;
      return true;
    } else {
      return false;
    }
  }

  formatDates(date: any): any {
    if (date!=null && date!=undefined) {
      let dateParts = date?.split!("-");
      let fecha = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
      return fecha;
    } else {
      return "";
    }
  }

  setDireccionEntregaInTable(cliente: ClienteDTO) {
    this.clienteTabla = { clienteId: null, departamento: '', direccion: '', distrito: '', provincia: '', referencia: '' }
    if (cliente.direccion == "" && cliente.departamento == "" && cliente.provincia == "") {
      this.cliDirecEmpresaList = [];
    } else if (cliente.direccion != null && cliente.departamento != null && cliente.provincia != null) {
      this.cliDirecEmpresaList = [];
      this.clienteTabla.clienteId = cliente.clienteId;
      this.clienteTabla.direccion = cliente.direccion;
      this.clienteTabla.departamento = cliente.departamento;
      this.clienteTabla.provincia = cliente.provincia;
      this.clienteTabla.distrito = cliente.distrito;
      this.clienteTabla.referencia = cliente.referencia;
      this.cliDirecEmpresaList.push(this.clienteTabla)
    } else {
      this.cliDirecEmpresaList = [];
    }
  }

  addNavigationItemsRoutes(navigationItmesRoutes: MenuItem[]) {
    if (this.clienteId != 0) {
      if (navigationItmesRoutes.length == 2) {
        this.navigationItmesRoutes.push({ label: this.cliente?.razonSocial!="" ? this.cliente?.razonSocial
                                               : this.cliente?.primerNombre+' '+this.cliente?.segundoNombre +' '+this.cliente?.apellidoPaterno+' '+this.cliente?.apellidoMaterno });
        this.navigationItmesRoutes = [...this.navigationItmesRoutes];
      } else {
        null;
      }
    } else {
      if (navigationItmesRoutes.length == 2) {
        this.navigationItmesRoutes.push({ label: 'NUEVO CLIENTE' });
        this.navigationItmesRoutes = [...this.navigationItmesRoutes];
      } else {
        null;
      }
    }
  }

  setCelularesInDatosCliente(celulares: string): any {
    if (celulares != null) {
      if (celulares.includes("-")) {
        let telef = celulares.split("-")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(" , ")) {
        let telef = celulares.split(" , ")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(" - ")) {
        let telef = celulares.split(" - ")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(", ")) {
        let telef = celulares.split(", ")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(",")) {
        let telef = celulares.split(",")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(" -")) {
        let telef = celulares.split(" -")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes("  ")) {
        let telef = celulares.split("  ")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.includes(" ")) {
        let telef = celulares.split(" ")
        let telefono1 = telef[0];
        let telefono2 = telef[1];
        this.celularA = telefono1 != null ? telefono1 : "";
        this.celularB = telefono2 != null ? telefono2 : "";
      } else if (celulares.length <= 10) {
        this.celularA = celulares;
      } else {
        this.celularA = "";
        this.celularB = "";
      }
    }
  }

  onChangeTipoDocumentoId(e) {
    this.numDocumento = "";
    let tipo = this.tipoDocumentoIdentidadList.find( tdi => tdi.tipoDocIdentidadId == e.value)
    if (tipo?.tipoDocIdentidadNombreCorto == 'RUC') {
      this.maxLengthNumDoc = 11;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'DNI') {
      this.maxLengthNumDoc = 8;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'CEX') {
      this.maxLengthNumDoc = 12;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'PAS') {
      this.maxLengthNumDoc = 12;
    } else {
      this.maxLengthNumDoc = 16;
    }
  }

  setMaxTipoDocLength(tipoDoc: number) {
    let tipo: any  = this.tipoDocumentoIdentidadList.find( tdi => tdi!.tipoDocIdentidadId! == tipoDoc!)
    if (tipo?.tipoDocIdentidadNombreCorto == 'RUC') {
      this.maxLengthNumDoc = 11;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'DNI') {
      this.maxLengthNumDoc = 8;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'CEX') {
      this.maxLengthNumDoc = 12;
    } else if (tipo?.tipoDocIdentidadNombreCorto == 'PAS') {
      this.maxLengthNumDoc = 12;
    } else {
      this.maxLengthNumDoc = 16;
    }
  }

  editDireccionEmpresa(cli: any) {
    this.titleDireccionEmpresa = "EDITAR DIRECCIÓN DE EMPRESA";
    this.setProvinciasByDepartamento(cli.departamento);
    this.setDistritosByProvincia(cli.provincia);
    this.direccionFromCliente = cli.direccion;
    this.departamentoFromCliente = cli.departamento;
    this.provinciaFromCliente = cli.provincia;
    this.distritoFromCliente = cli.distrito;
    this.referenciaFromCliente = cli.referencia;
    this.actualizarDireccionEmpresa = true;
    this.direccionEmpresaDialog = true;
  }


  setProvinciasByDepartamento(depa: string) {
    let filterByValue = this.ubigeos.filter(u => u.ubigeoDepartamento == depa)
    let allProvincias = filterByValue.map(u => u.ubigeoProvincia);
    this.provinciasList = allProvincias.filter((item, index) => {
      return allProvincias.indexOf(item) === index
    })
  }

  setDistritosByProvincia(provincia: string) {
    let filterByValue = this.ubigeos.filter(u => u.ubigeoProvincia == provincia)
    let allDistritos = filterByValue.map(u => u.ubigeoDistrito);
    this.distritosList = allDistritos.filter((item, index) => {
      return allDistritos.indexOf(item) === index
    })
  }

  hideDialogDireccion() {
    this.direccionEmpresaDialog = false;
    this.resetDireccion();
  }

  createUpdateDireccionEmpresa() {
    if (this.actualizarDireccionEmpresa) {
      this.updateDireccionEmpresa();
    } else {
      this.updateDireccionEmpresa();
    }
  }

  validOrInvalidBtnDireccion() {

  }

  resetDireccion() {
    this.direccionFromCliente = "";
    this.departamentoFromCliente = "";
    this.provinciaFromCliente = "";
    this.distritoFromCliente = "";
    this.referenciaFromCliente = "";
  }

  vendedorById(vendedorId: number) {
    this.usuarioService.usuarioById(vendedorId).subscribe(
      next => {
        if (next.status == "OK") {
          this.vendedor = next.data!;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getClientesFacturadosByNumDocumento(cliente: ClienteDTO) {
    this.clienteService.getAllClientesFacturadosByNumDocumento(cliente.numDocumento).subscribe(
      data => {
        if (data.status == "OK") {
          this.clientesFacturados = data.data;
        }
      }
    )
  }

  getEncargadosPagos(clienteId: number) {
    this.clienteService.encargadosPagosByClienteId(clienteId).subscribe(
      next => {
        if (next.status == "OK") {
          this.encargadosPagosList = next.data!;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openNewEncargadoPagos() {
    this.fep.encargadoPagosId.setValue(0);
    this.fep.nombres.setValue('');
    this.fep.apePaterno.setValue('');
    this.fep.apeMaterno.setValue('');
    this.fep.numFijo.setValue('');
    this.fep.celular.setValue('');
    this.fep.email.setValue('');
    this.fep.status.setValue('A');
    this.fep.clienteId.setValue(this.clienteId);

    this.encargadoPagosSubmitted = false;
    this.encargadoPagosDialog = true;
  }

  openEditEncargadoPagos(encargadoPagos: EncargadoPagosDTO, rowIndex: number) {
    this.encargadoPagosIndex = rowIndex;

    this.clienteService.encargadoPagosById(encargadoPagos.encargadoPagosId).subscribe(data => {
      this.fep.encargadoPagosId.setValue(data.data?.encargadoPagosId);
      this.fep.nombres.setValue(data.data?.nombres);
      this.fep.apePaterno.setValue(data.data?.apePaterno);
      this.fep.apeMaterno.setValue(data.data?.apeMaterno);
      this.fep.numFijo.setValue(data.data?.numFijo);
      this.fep.celular.setValue(data.data?.celular);
      this.fep.email.setValue(data.data?.email);
      this.fep.status.setValue(data.data?.status);
      this.fep.clienteId.setValue(data.data?.clienteId);

      this.encargadoPagosSubmitted = false;
      this.encargadoPagosDialog = true;
    });
  }

  disabledBtnSaveEdit() {
    if (this.tipoPersonaFromCliente == "J") {
      if (!this.correoElectronico || !this.celularA || !this.razonSocial || !this.numDocumento || !this.canalVentaIdFromCliente || this.numDocumento.length < 11) {
        return true
      } else {
        return false;
      }
    } else {
      if (!this.apellidoPaterno || !this.apellidoMaterno || !this.primerNombre || !this.celularA || !this.fechaNacimiento || !this.numDocumento || !this.canalVentaIdFromCliente || this.numDocumento.length < 8) {
        return true;
      } else {
        return false;
      }
    }
  }

  createOrUpdateDatosClientes(cliente) {
    if (this.actualizarDatos == true) {
      this.updateDatosClientes(cliente);
    } else {
      this.createCliente();
    }
  }

  createCliente() {
    this.getClienteToSave();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un nuevo cliente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.create(this.clienteToSave).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El cliente fue creado correctamente', life: 2000 });
              setTimeout(() => {
                this.router.navigate(['ver-cliente/' + `${data.data?.clienteId!}`]);
              }, 2000);
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ya existe un cliente registrado con este número de documento', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Sucedió un error inesperado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.clienteById(this.clienteId)
      }
    });
  }

  getClienteToSave() {
    this.clienteToSave.clienteId = null;
    this.clienteToSave.tipoDocumentoIdentidadId = this.tipoDocIdentidadIdFromCliente!;
    this.clienteToSave.clienteNumeroDocumentoIdentidad = this.numDocumento;
    this.clienteToSave.clienteTipoCliente = this.tipoClienteFromCliente;
    this.clienteToSave.clienteRazonSocial = this.razonSocial ? this.razonSocial.trim() : null;
    this.clienteToSave.clienteNombreComercial = this.nombreComercial ? this.nombreComercial.trim() : null;
    this.clienteToSave.clienteApellidoPaterno = this.apellidoPaterno ? this.apellidoPaterno.trim() : null;
    this.clienteToSave.clienteApellidoMaterno = this.apellidoMaterno ? this.apellidoMaterno.trim() : null;
    if (this.clienteToSave.clienteTipoPersona == 'J') {
      this.clienteToSave.clienteNombres = null;
    } else {
      let primero = this.primerNombre!=null ? this.primerNombre?.trim() : '';
      let segundo = this.segundoNombre!=null ? this.segundoNombre?.trim() : '';
      let tercero = this.tercerNombre!=null ? this.tercerNombre?.trim() : '';
      this.clienteToSave.clienteNombres = (primero!+' '+segundo!+' '+tercero).trim();
    }

    this.clienteToSave.canalVentaId = this.canalVentaIdFromCliente;
    this.clienteToSave.giroNegocio = this.giroNegocio;
    this.clienteToSave.clienteNumeroDocumentoIdentidadReal = this.documentoIdentidadReal;
    this.clienteToSave.clienteEstadoCivil = this.estadoCivilDescripcionFromCliente;
    this.clienteToSave.clienteTipoPersona = this.tipoPersonaFromCliente;
    this.clienteToSave.clienteCodigoPagador = this.codigoPagador.length>0 ? this.codigoPagador.trim() : null;
    this.clienteToSave.clienteTelefono = this.telefono1 ? this.telefono1.trim() : null;
    this.clienteToSave.clienteMovil = this.celularA!.trim()+' '+this.celularB!.trim();
    this.clienteToSave.clienteEmail = this.correoElectronico!=null ? this.correoElectronico.trim() : null;
    this.clienteToSave.carpetaId = this.carpetaIdFromCliente;
    this.clienteToSave.clienteFax = this.fax;
    this.clienteToSave.fechaNacimiento = this.fechaNacimiento;
    this.clienteToSave.clienteTipoMoneda = this.tipoMoneda;
    this.clienteToSave.clienteCardCode = null;
    this.clienteToSave.clienteCardType = "cCustomer";
    this.clienteToSave.grupoClienteId = this.grupoCliente ? this.grupoCliente : null;
    this.clienteToSave.condicionPagoId = this.condicionPago ? this.condicionPago : null;
    this.clienteToSave.usuarioId = null;
    this.clienteToSave.clienteDireccion = null;
    this.clienteToSave.clienteDepartamento = null;
    this.clienteToSave.clienteProvincia = null;
    this.clienteToSave.clienteDistrito = null;
    this.clienteToSave.clienteDireccionReferencia = null;
    this.clienteToSave.clienteCredito = this.tieneCredito();
    this.clienteToSave.clienteDiasCredito = this.diasCredito ? this.diasCredito : 0;
    this.clienteToSave.clienteGarantiaCredito = this.garantiaCredito ? this.garantiaCredito.trim() : null;
    this.clienteToSave.clienteLineaCredito = this.lineaCredito ? this.lineaCredito : 0;
    this.clienteToSave.mediopagoId = this.metodoPago ? this.metodoPago : null;
    this.clienteToSave.clienteActivo = '1';
    console.log("CLIENTE TO SAVE", this.clienteToSave)
  }

  tieneCredito() {
    if (this.tienescredito == true) {
      return 1;
    } else {
      return 0;
    }
  }

  updateDatosClientes(cliente: ClienteDTO) {
    this.setClienteToEdit(cliente);
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar los datos del cliente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.update(this.clienteToEdit).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Los datos del cliente fueron actualizados correctamente', life: 3000 });
              this.clienteById(this.clienteId);
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ya existe un cliente registrado con este número de documento', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Sucedió un error inesperado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.clienteById(this.clienteId)
      }
    });
  }

  setClienteToEdit(cliente: ClienteDTO) {
    this.clienteToEdit.clienteId = this.clienteId;
    this.clienteToEdit.tipoDocumentoIdentidadId = this.tipoDocIdentidadIdFromCliente!;
    this.clienteToEdit.clienteNumeroDocumentoIdentidad = (<HTMLInputElement>document.getElementById("numDocumento")).value.trim();
    this.clienteToEdit.clienteTipoCliente = this.tipoClienteFromCliente;
    this.clienteToEdit.clienteRazonSocial = this.razonSocial ? this.razonSocial.trim() : null;
    this.clienteToEdit.clienteNombreComercial = this.nombreComercial ? this.nombreComercial.trim() : null;
    this.clienteToEdit.clienteApellidoPaterno = (<HTMLInputElement>document.getElementById("apellidoPaterno")).value.trim();
    this.clienteToEdit.clienteApellidoMaterno = (<HTMLInputElement>document.getElementById("apellidoMaterno")).value.trim();
    //this.clienteToEdit.clienteNombres = (<HTMLInputElement>document.getElementById("nombres")).value.trim();
    this.clienteToEdit.clienteNombres = this.setNombres()
    this.clienteToEdit.canalVentaId = this.canalVentaIdFromCliente ? this.canalVentaIdFromCliente : null;
    this.clienteToEdit.giroNegocio = (<HTMLInputElement>document.getElementById("giroNegocio")).value.trim();
    this.clienteToEdit.clienteNumeroDocumentoIdentidadReal = (<HTMLInputElement>document.getElementById("documentoIdentidadReal")).value;
    this.clienteToEdit.clienteEstadoCivil = this.estadoCivilDescripcionFromCliente;
    this.clienteToEdit.clienteTipoPersona = this.tipoPersonaFromCliente;
    this.clienteToEdit.clienteCodigoPagador = this.codigoPagador ? this.codigoPagador.trim() : null;
    this.clienteToEdit.clienteTelefono = this.telefono1 ? this.telefono1.trim() : null;
    this.clienteToEdit.clienteMovil = this.setCelulares();
    this.clienteToEdit.clienteEmail = (<HTMLInputElement>document.getElementById("correoElectronico")).value;
    this.clienteToEdit.carpetaId = this.carpetaIdFromCliente;
    this.clienteToEdit.fechaNacimiento = this.fechaNacimiento;
    this.clienteToEdit.clienteFax = this.fax;
    this.clienteToEdit.clienteCardCode = this.codigoCliente ? this.codigoCliente.trim() : null;
    this.clienteToEdit.clienteTipoMoneda = this.tipoMoneda ? this.tipoMoneda : null;
    this.clienteToEdit.grupoClienteId = this.grupoCliente ? this.grupoCliente : null;
    this.clienteToEdit.condicionPagoId = this.condicionPago ? this.condicionPago : null;
    this.clienteToEdit.clienteDireccion = cliente.direccion;
    this.clienteToEdit.clienteDepartamento = cliente.departamento;
    this.clienteToEdit.clienteProvincia = cliente.provincia;
    this.clienteToEdit.clienteDistrito = cliente.distrito;
    this.clienteToEdit.clienteDireccionReferencia = cliente.referencia;
    this.clienteToEdit.clienteCredito = this.tieneCredito();
    this.clienteToEdit.clienteDiasCredito = this.diasCredito;
    this.clienteToEdit.clienteGarantiaCredito = this.garantiaCredito;
    this.clienteToEdit.clienteLineaCredito = this.lineaCredito;
    this.clienteToEdit.mediopagoId = this.metodoPago ? this.metodoPago : null;
    this.clienteToEdit.clienteActivo = cliente.status!;
    console.log("SAVE CLIENTE TO EDIT", this.clienteToEdit)
  }

  setNombres(): string {
    let primero = this.primerNombre!=null ? this.primerNombre?.trim() : '';
    let segundo = this.segundoNombre!=null ? this.segundoNombre?.trim() : '';
    let tercero = this.tercerNombre!=null ? this.tercerNombre?.trim() : '';
    return this.clienteToSave.clienteNombres = (primero!+' '+segundo!+' '+tercero).trim();
  }

  setCelulares(): string {
    if (this.celularA.length > 0 && this.celularB.length > 0) {
      return this.celularA.trim() +' '+ this.celularB.trim();
    } else if(this.celularA.length > 0 && this.celularB.length == 0) {
      this.celularB = "";
      return this.celularA.trim();
    } else if(this.celularA.length == 0 && this.celularB.length > 0) {
      return this.celularB.trim();
    } else {
      return "";
    }
  }

  resetClienteDatos() {
    this.primerNombre = "";
    this.apellidoPaterno = "";
    this.apellidoMaterno = "";
    this.documentoIdentidadReal = "";
    this.estadoCivilDescripcionFromCliente = "OT";
    this.tipoPersonaFromCliente = "J";
    this.celularA = "";
    this.celularB = "";
    this.telefono1 = "";
    this.correoElectronico = "";
    this.nombreComercial = "";
    this.razonSocial = "";
    this.codigoCliente = "";
    this.tipoDocIdentidadIdFromCliente = 1;
    this.numDocumento = "";
    this.tipoClienteFromCliente = "N";
    this.giroNegocio = "";
    this.canalVentaIdFromCliente = 0;
    this.carpetaIdFromCliente = 0;
    this.codigoPagador = "";
    this.grupoCliente = 0;
    this.tipoMoneda = "Soles";
    this.condicionPago = 0;
  }

  initFormCliente() {
    if (this.tipoPersonaFromCliente == "J") {
      this.tipoDocIdentidadIdFromCliente = 1;
      this.maxLengthNumDoc = 11;
    } else {
      this.tipoDocIdentidadIdFromCliente = 2;
      this.maxLengthNumDoc = 8;
    }
  }

  updateDireccionEmpresa() {
    this.direccionEmpresaDialog = false;
    this.setDireccionEmpresaToEdit(this.cliente);
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear/actualizar la dirección de la empresa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.update(this.clienteToEdit).subscribe(
          data => {
            if (data.status == "OK") {
              this.cliDirecEmpresaList = [];
              this.clienteById(this.clienteId)
              if (this.actualizarDireccionEmpresa) {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de la empresa fue actualizada correctamente', life: 3000 });
              } else {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de la empresa fue creada correctamente', life: 3000 });
              }
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La dirección de la empresa no fue actualizada correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Hubo un error al crear/actualizar la direccion de la empresa', life: 3000 });
          }
        );
      },
      reject: () => {
        this.cliDirecEmpresaList = [];
        this.clienteById(this.clienteId)
      }
    });
  }

  setDireccionEmpresaToEdit(cliente: ClienteDTO) {
    console.log("CLIENTE IN DIRECCION EMPR", cliente)
    this.clienteToEdit.clienteId = this.clienteId;
    this.clienteToEdit.tipoDocumentoIdentidadId = cliente.tipoDocumentoId?.tipoDocumentoId!;
    this.clienteToEdit.clienteNumeroDocumentoIdentidad = cliente.numDocumento;
    this.clienteToEdit.clienteTipoCliente = cliente.tipo;
    this.clienteToEdit.clienteRazonSocial = cliente.razonSocial;
    this.clienteToEdit.clienteNombreComercial = cliente.nombreComercial;
    this.clienteToEdit.clienteApellidoPaterno = cliente.apellidoPaterno;
    this.clienteToEdit.clienteApellidoMaterno = cliente.apellidoMaterno;
    this.clienteToEdit.clienteNombres = cliente.primerNombre!;
    this.clienteToEdit.canalVentaId = cliente.canalVentaId?.canalVentaId!;
    this.clienteToEdit.giroNegocio = cliente.giroNegocio!;
    this.clienteToEdit.clienteNumeroDocumentoIdentidadReal = cliente.clienteNumeroDocumentoIdentidadReal;
    this.clienteToEdit.clienteEstadoCivil = cliente.estadoCivil;
    this.clienteToEdit.clienteTipoPersona = cliente.tipoPersona;
    this.clienteToEdit.clienteCodigoPagador = cliente.codigo;
    this.clienteToEdit.clienteTelefono = cliente.telefono1!;
    this.clienteToEdit.clienteMovil = cliente.celular!;
    this.clienteToEdit.clienteEmail = cliente.correoElectronico;
    this.clienteToEdit.fechaNacimiento = cliente.fechaNacimiento;
    this.clienteToEdit.carpetaId = cliente.carpetaId;
    this.clienteToEdit.clienteCredito = cliente.clienteCredito;
    this.clienteToEdit.clienteDiasCredito = cliente.clienteDiasCredito;
    this.clienteToEdit.clienteGarantiaCredito = cliente.clienteGarantiaCredito;
    this.clienteToEdit.clienteLineaCredito = cliente.clienteLineaCredito;
    this.clienteToEdit.grupoClienteId = cliente.grupoClienteId?.grupoclienteId!;
    this.clienteToEdit.clienteFax = cliente.fax;
    this.clienteToEdit.clienteTipoMoneda = cliente.tipoMoneda;
    this.clienteToEdit.condicionPagoId = cliente.condicionPagoId?.condicionpagoId!;
    this.clienteToEdit.clienteActivo = cliente.status!;
    this.clienteToEdit.clienteDireccion = this.direccionFromCliente;
    this.clienteToEdit.clienteDepartamento = this.departamentoFromCliente;
    this.clienteToEdit.clienteProvincia = this.provinciaFromCliente;
    this.clienteToEdit.clienteDistrito = this.distritoFromCliente;
    this.clienteToEdit.clienteDireccionReferencia = this.referenciaFromCliente;
    console.log("DIRECCION EMPRESA CREATE/EDIT", this.clienteToEdit)
    return this.clienteToEdit;
  }

  newDireccionEntrega() {
    this.resetDireccionEntrega();
    this.titleDireccionEntrega = "Agregar dirección de entrega";
    this.provinciasList = [];
    this.distritosList = [];
    this.direccionEntregaDialog = true;
    this.actualizarDireccionEntrega = false;
  }

  newDireccionEmpresa() {
    this.resetDireccionEmpresa();
    this.titleDireccionEmpresa = "AGREGAR DIRECCIÓN DE EMPRESA";
    this.getAllUbigeo();
    this.provinciasList = [];
    this.distritosList = [];
    this.direccionEmpresaDialog = true;
    this.actualizarDireccionEmpresa = false;
  }

  resetDireccionEmpresa() {
    this.direccionFromCliente = "";
    this.departamentoFromCliente = "";
    this.provinciaFromCliente = "";
    this.distritoFromCliente = "";
    this.referenciaFromCliente = "";
  }

  resetDireccionEntrega() {
    this.departamentoEntrega = "";
    this.provinciaEntrega = "";
    this.distritoEntrega = "";
    this.direccionEntrega = "";
    this.descripcionEntrega = "";
    this.latitudEntrega = 0;
    this.longitudEntrega = 0;
  }

  hideAddDireccionEmpresa() {
    if (this.cliDirecEmpresaList.length != 0) {
      return true;
    } else {
      return false;
    }
  }

  hideDialogDireccionEntrega() {
    this.direccionEntregaDialog = false;
  }

  createUpdateDireccionEntrega() {
    if (this.actualizarDireccionEntrega) {
      this.createOrUpdateDireccionEntrega();
    } else {
      this.createOrUpdateDireccionEntrega();
    }
  }

  createOrUpdateDireccionEntrega() {
    if (this.actualizarDireccionEntrega) {
      this.direccionEntregaToCreateUpdate.direccionId = this.direccionEntregaToEdit.direccionId;
    } else {
      this.direccionEntregaToCreateUpdate.direccionId = 0;
    }
    this.direccionEntregaToCreateUpdate.clienteId = this.clienteId;
    this.direccionEntregaToCreateUpdate.departamento = this.departamentoEntrega;
    this.direccionEntregaToCreateUpdate.provincia = this.provinciaEntrega;
    this.direccionEntregaToCreateUpdate.distrito = this.distritoEntrega;
    this.direccionEntregaToCreateUpdate.direccion = this.direccionEntrega;
    this.direccionEntregaToCreateUpdate.descripcion = this.descripcionEntrega;
    this.direccionEntregaToCreateUpdate.latitud = this.latitudEntrega;
    this.direccionEntregaToCreateUpdate.longitud = this.longitudEntrega;
    this.direccionEntregaDialog = false;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear/actualizar la dirección de entrega?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.createUpdateDireccionEntrega(this.direccionEntregaToCreateUpdate).subscribe(
          data => {
            if (data != null) {
              this.resetDireccionEntrega();
              this.getAllAlmacenesByClienteId();
              if (this.actualizarDireccionEntrega) {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de entrega fue actualizada correctamente', life: 3000 });
              } else {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de entrega fue creada correctamente', life: 3000 });
              }
            } else {
              this.resetDireccionEntrega();
              if (this.actualizarDireccionEntrega) {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de entrega no fue actualizada correctamente', life: 3000 });
              } else {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La dirección de entrega no fue creada correctamente', life: 3000 });
              }
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Hubo un error al crear la direccion de entrega', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAllAlmacenesByClienteId();
        this.resetDireccionEntrega();
      }
    });
  }

  editDireccionEntrega(direccionEntrega: AlmacenClienteDTO) {
    this.titleDireccionEntrega = "Editar direccion de entrega";
    this.direccionEntrega = direccionEntrega.direccion;
    this.departamentoEntrega = direccionEntrega.departamento;
    this.setProvinciasByDepartamento(direccionEntrega.departamento);
    this.setDistritosByProvincia(direccionEntrega.provincia);
    this.provinciaEntrega = direccionEntrega.provincia;
    this.distritoEntrega = direccionEntrega.distrito;
    this.descripcionEntrega = direccionEntrega.descripcion;
    this.latitudEntrega = direccionEntrega.latitud;
    this.longitudEntrega = direccionEntrega.longitud;
    this.direccionEntregaToEdit = direccionEntrega;
    this.actualizarDireccionEntrega = true;
    this.direccionEntregaDialog = true;
  }

  createOrUpdateEncargadoPagos() {
    this.encargadoPagosSubmitted = true;

    if (this.encargadoPagosForm.invalid) {
      return;
    } else {
      if (this.fep.encargadoPagosId.value > 0) {

        this.clienteService.encargadoPagosActualizar(this.encargadoPagosForm.value).subscribe(data => {

          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Encargado de Pagos Actualizado',
            life: 3000
          });
          this.encargadoPagosDialog = false;
          this.encargadosPagosList[this.encargadoPagosIndex] = this.encargadoPagosForm.value;
          this.encargadosPagosList = [...this.encargadosPagosList];

        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar Encargado',
            life: 3000
          });

          console.log(error);
        });
      } else {

        this.clienteService.encargadoPagosGuardar(this.encargadoPagosForm.value).subscribe(data => {

          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Encargado de Pagos Guardado',
            life: 3000
          });
          this.encargadoPagosDialog = false;
          this.encargadosPagosList.push(this.encargadoPagosForm.value);
          this.encargadosPagosList = [...this.encargadosPagosList];

        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al guardar Encargado',
            life: 3000
          });

          console.log(error);
        });
      }
    }
  }

  cancelCreateOrUpdateEncargadoPagos() {
    this.encargadoPagosSubmitted = true;
    this.encargadoPagosDialog = false;
  }

  isFieldValidEP(field): boolean {
    return (!this.encargadoPagosForm.get(field)!.valid && this.encargadoPagosForm.get(field)!.touched) ||
      (!this.encargadoPagosForm.get(field)!.valid && this.encargadoPagosForm.get(field)!.untouched && this.encargadoPagosSubmitted);
  }

  get fep() {
    return this.encargadoPagosForm.controls;
  }

  habilitarEncargadoPagos(encargadoPagos: EncargadoPagosDTO, index: number) {
    this.confirmationService.confirm({
      message: '¿Desea Habilitar este Encargado de Pagos?',
      header: 'Confirmaci\u00F3n',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.clienteService.habilitarEncargadoPagos(encargadoPagos.encargadoPagosId).subscribe(
          data => {

            if (data.status == 'OK') {
              this.encargadosPagosList[index].status = 'A';
              this.encargadosPagosList = [...this.encargadosPagosList];
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Encargado de Pagos Habilitado',
                life: 3000
              });
            } else {

              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error interno, consulte con soporte.',
                life: 3000
              });
            }
          },
          error => {
            console.log(error);
          }
        );

      }
    });
  }

  inhabilitarEncargadoPagos(encargadoPagos: EncargadoPagosDTO, index: number) {
    this.confirmationService.confirm({
      message: '¿Desea Inhabilitar este Encargado de Pagos?',
      header: 'Confirmacion',
      acceptLabel: 'Si',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.inhabilitarEncargadoPagos(encargadoPagos.encargadoPagosId).subscribe(
          data => {

            if (data.status == 'OK') {
              this.encargadosPagosList[index].status = 'I';
              this.encargadosPagosList = [...this.encargadosPagosList];

              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Encargado de Pagos Inhabilitado',
                life: 3000
              });
            } else {

              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error interno, consulte con soporte.',
                life: 3000
              });
            }
          },
          error => {
            console.log(error);
          }
        );

      }
    });
  }

  getEncargadosTomaPedidos() {
    this.listaEncargadosTomaPedidos.push({
      clienteId: 1,
      apeMaterno: "fsfdsfdsfs",
      encargadoTomaPedidosId: 1,
      celular: "ssdfsdfsdfsdf",
      apePaterno: "sfsdfsdf ssdfs",
      email: "sfsdfsdfsdf",
      status: "A",
      nombres: "sdfsd sdf sdf sdf s",
      numFijo: "sdfsdfdsfsdf"

    });
  }

  getAllAlmacenesByClienteId() {
    this.clienteService.getAllAlmacenesByClienteId(this.clienteId).subscribe(
      data => {
        this.listaAlmacenes = data;
      }
    )
  }

  onRowEditInitEncargadoPagos(encargadoPagosDTO: EncargadoPagosDTO) {
    this.cloneEncargadoPagos[encargadoPagosDTO.encargadoPagosId] = { ...encargadoPagosDTO };
  }

  onRowEditSaveEncargadoPagos(encargadoPagosDTO: EncargadoPagosDTO) {
    if (encargadoPagosDTO.encargadoPagosId > 0) {
      delete this.cloneEncargadoPagos[encargadoPagosDTO.encargadoPagosId];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditInitEncargadoTP(encargadoTomaPedidosDTO: EncargadoTomaPedidosDTO) {
    this.cloneEncargadoTomaPedidos[encargadoTomaPedidosDTO.encargadoTomaPedidosId] = { ...encargadoTomaPedidosDTO };
  }

  onRowEditSaveEncargadoTP(encargadoTomaPedidosDTO: EncargadoTomaPedidosDTO) {
    if (encargadoTomaPedidosDTO.encargadoTomaPedidosId > 0) {
      delete this.cloneEncargadoTomaPedidos[encargadoTomaPedidosDTO.encargadoTomaPedidosId];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancelEncargadoTP(encargadoTomaPedidosDTO: EncargadoTomaPedidosDTO, index: number) {
    this.listaEncargadosTomaPedidos2[index] = this.cloneEncargadoTomaPedidos[encargadoTomaPedidosDTO.encargadoTomaPedidosId];
    delete this.cloneEncargadoTomaPedidos[encargadoTomaPedidosDTO.encargadoTomaPedidosId];
  }

  showPageFiltroComprobante(e: any) {
    let result = JSON.stringify(e.valueOf())
    let page = JSON.parse(result);
    this.page = page.page;
    if (this.dataPreLoaded == true) {
      this.getAllComprobantesByClienteIdPageable(this.clienteId, this.page, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByRangoFechas == true) {
      let ini = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      this.getByRangoFechasAndClienteIdPageable(ini, fin, this.clienteId, this.page, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows
    } else if (this.dataFilterLoaded == true) {
      this.buscarComprobantes(this.filterNameComprobantes, this.index, this.page, e.rows, e);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows
    }
  }

  filtrarComprobantes(event: Event, stringVal: String) {
    this.dtcomprob!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  filtrarOrdenesPedido(event: Event, stringVal: String) {
    this.dtOrdenes!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSelectedDates() {
    if (this.dateInicial != null && this.dateFinal != null) {
      let ini = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      this.loadingOrdenes = true;
      this.getByRangoFechasAndClienteId(ini, fin, this.clienteId)
    }
  }

  onSelectedDatesComprobantes() {
    if (this.dateInicial != null && this.dateFinal != null) {
      this.loadingDocuments = true;
      let ini = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      this.page = 0;
      this.firstRowOfPage = 0;
      this.lastRowOfPage = 10;
      this.getByRangoFechasAndClienteIdPageable(ini, fin, this.clienteId, this.page, this.size)
    }
  }

  getByRangoFechasAndClienteIdPageable(dateInicial: any, dateFinal: any, clienteId: number, page: number, size: number) {
    this.documentoService.getByRangoFechasAndClienteIdPageable(dateInicial, dateFinal, clienteId, page, size).subscribe(
      data => {
        if (data.message == "SUCCESS") {
          this.documentsList = data.data?.content!;
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataPreLoaded = false;
          this.dataByRangoFechas = true;
        }
        this.loadingDocuments = false;
        this.paginadorConprobante!.first = 0;
      },
      error => {
        console.log(error);
      }
    )
  }

  getByRangoFechasAndClienteId(dateInicial, dateFinal, clienteId) {
    this.ordenPedidoService.getByRangoFechasAndClienteId(dateInicial, dateFinal, clienteId).subscribe(
      data => {
        if (data.status == "OK") {
          this.ordenesPedidosCustomList = data.data!;
          this.sumar(this.ordenesPedidosCustomList);
          this.loadingOrdenes = false;
        }
      }
    )
  }

  reloadListaComprobantes(dtOrdenes) {
    this.loadingDocuments = true;
    this.spinnerOn = true;
    this.indexComprobantesSelected = 0;
    this.sumar(this.ordenesPedidosCustomList);
    this.dtOrdenes!.filterGlobal("", "");
    this.filterNameComprobantes = "";
    this.clearDatesFields();
    this.clearFiltersOrdenes(dtOrdenes);
    this.page = 0;
    this.size = 10;
    this.getAllComprobantesByClienteIdPageable(this.clienteId, this.page, this.size);
    this.paginadorConprobante!.first = 0;
    this.index = 0;
  }

  reloadListaOrdenes(dtOrdenes) {
    this.loadingOrdenes = true;
    this.loadingDocuments = true;
    this.spinnerOn = true;
    this.indexSelected = 0;
    this.sumar(this.ordenesPedidosCustomList);
    this.dtOrdenes!.filterGlobal("", "");
    this.filterName = "";
    this.clearDatesFields();
    this.clearFiltersOrdenes(dtOrdenes);
    this.getByClienteId(this.clienteId)
  }

  clearDatesFields() {
    this.calendarIni!.value = '';
    this.calendarIni!.updateInputfield();
    this.calendarFin!.value = '';
    this.calendarFin!.updateInputfield();
    this.calendarOrdenIni!.value = '';
    this.calendarOrdenIni!.updateInputfield();
    this.calendarOrdenFin!.value = '';
    this.calendarOrdenFin!.updateInputfield();
  }

  sumar(ordenList: OrdenPedidoJVResponseCustomDTO[]) {
    ordenList.forEach(or => {
      or.detalleOrdenPedidoList.forEach(det => {
        this.importeTotal += det.precio
      });
      this.impTotal = this.importeTotal;
      this.importeTotal = 0;
      or.importeTotal = this.impTotal;

    });
  }

  clearFiltersOrdenes(dtOrdenes: Table) {
    dtOrdenes.clear();
  }

  clearFiltersComprobantes(dtcomprob: Table) {
    dtcomprob.clear();
  }

  setDetallesDeOrden(orden: OrdenPedidoJVResponseCustomDTO) {
    this.opendialogtoupdate();
    this.detalleOrdenCustomList = orden.detalleOrdenPedidoList;
  }

  opendialogtoupdate() {
    this.detalleDialog = true;
  }

  inputFiltroComprobantesDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
  }

  inputFiltroDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
  }

  btnBuscarComprobantesDisabled(): any {
    if (this.filterNameComprobantes == null || this.filterNameComprobantes == "") {
      return true;
    }
  }

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == "") {
      return true;
    }
  }

  buscarOrdenes(filterName: string, index: number) {
    this.loadingOrdenes = true;
    this.ordenPedidoService.getByFiltroLikeAndClienteId(filterName, index, this.clienteId).subscribe(
      data => {
        if (data.status == "OK") {
          this.dtOrdenes!._first = 0;
          this.ordenesPedidosCustomList = data.data!;
          this.loadingOrdenes = false;
        }
      },
      error => {
        console.log(error);
        this.loadingOrdenes = false;
        return "Error";
      }
    )
  }

  getAllClientesFacturadosDe() {
    this.clienteService.allClientesFacturadosDe().subscribe(
      data => {
        this.clientesFacturadoDeList = data.data!;
        this.loadingClientesFacturadosDe = false;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  searchClient() {
    this.searchClienteFacturadoDeDialog = true;
  }

  disabledBtnSearchClienteReal() {

  }

  removeDataFiltered() {
    this.filterNameClienteFacturado = "";
    this.clientesFacturarList=[];
    this.searchClienteFacturadoDeDialog = false;
    this.dtCliFacturadoDe?.clear();
  }

  onRowClientSelected(event) {
    let selectedClienteFacturadoDe = event.data;
    this.clienteFacturadoDeId =selectedClienteFacturadoDe.clienteId
    this.documentoIdentidadReal = selectedClienteFacturadoDe.clienteNumeroDocumentoIdentidad;
    this.searchClienteFacturadoDeDialog = false;
  }

  filterDataClientesFacturados(filterNameClienteFacturadoDe: string) {
    if (this.filterNameClienteFacturado === null || this.filterNameClienteFacturado === '') {
      this.clientesFacturarList=[];
    } else {
      this.clientesFacturarList=[];
      this.clientesFacturarList.push(...this.filterItems(filterNameClienteFacturadoDe))
    }
  }

  filterItems(filterName: string) {
    return this.clientesFacturadoDeList.filter((a) => {
      if (a.clienteRazonSocial?.toUpperCase().startsWith(filterName.toUpperCase())) {
        return a.clienteRazonSocial;
      } else  if (a.clienteNombreComercial?.toUpperCase().startsWith(filterName.toUpperCase())) {
        return a.clienteNombreComercial;
      } else if (a.clienteNumeroDocumentoIdentidad?.toUpperCase().startsWith(filterName.toUpperCase())) {
        return a.clienteNumeroDocumentoIdentidad;
      } else if ((a.clienteNombres?.toUpperCase()+' '+a.clienteApellidoPaterno?.toUpperCase()+' '+a.clienteApellidoMaterno?.toUpperCase()).startsWith(filterName.toUpperCase())) {
        return a.clienteApellidoMaterno+' '+a.clienteApellidoPaterno+' '+a.clienteNombres;
      } else {
        return null;
      }
    });
  }

  setDetallesComprobantes(document: any) {
    this.openDialogDetallesComprobantes();
    this.detalleComprobantesList = document.detalleDocumentoList
  }

  openDialogDetallesComprobantes() {
    this.detalleComprobantesDialog = true;
  }

  seeGoogleMapDireccionEntrega(direccionEntrega: AlmacenClienteDTO) {
    this.latitudeMapEntrega = direccionEntrega.latitud;
    this.longitudeMapEntrega = direccionEntrega.longitud;
    this.direccionMapEntrega = direccionEntrega.direccion;
    this.distritoMapEntrega = direccionEntrega.distrito;
    this.descripcionMapEntrega = direccionEntrega.descripcion;
    this.zoomMapEntrega = 13;
    this.titleDireccionEntregaDialog = 'Dirección de Entrega';
    this.mapDireccionEntregaDialog = true;
  }

  onChangeTipoPersona(e: any) {
    if (this.tipoPersonaFromCliente == "J") {
      this.tipoDocIdentidadIdFromCliente = 1;
      this.maxLengthNumDoc = 11;
      this.numDocumento = "";
    } else {
      this.tipoDocIdentidadIdFromCliente = 2;
      this.maxLengthNumDoc = 8;
      this.numDocumento = "";
    }

    this.primerNombre = "";
    this.segundoNombre = "";
    this.tercerNombre = "";
    this.apellidoPaterno = "";
    this.apellidoMaterno = "";
    this.nombreComercial = "";
    this.razonSocial = "";
    this.celularA = "";
    this.celularB = "";
  }

  setRazonSocialWhenPersNatural() {
    if (this.tipoPersonaFromCliente == 'N') {
      if(this.apellidoPaterno!=null && this.apellidoMaterno!=null && this.primerNombre!=null && this.segundoNombre!=null && this.tercerNombre!=null) {
        this.razonSocial = this.apellidoPaterno+' '+this.apellidoMaterno+' '+this.primerNombre+' '+this.segundoNombre+' '+this.tercerNombre;
      } else if(this.apellidoPaterno!=null && this.apellidoMaterno!=null && this.primerNombre!=null && this.segundoNombre!=null) {
        this.razonSocial = this.apellidoPaterno+' '+this.apellidoMaterno+' '+this.primerNombre+' '+this.segundoNombre;
      } else if(this.apellidoPaterno!=null && this.apellidoMaterno!=null && this.primerNombre!=null) {
        this.razonSocial = this.apellidoPaterno+' '+this.apellidoMaterno+' '+this.primerNombre;
      } else if (this.apellidoPaterno!=null && this.apellidoMaterno!=null) {
        this.razonSocial = this.apellidoPaterno+' '+this.apellidoMaterno
      }else {
        this.razonSocial = this.apellidoPaterno;
      }
    }
  }

  disableOnTipoPersonaN() {
    if (this.tipoPersonaFromCliente === 'N') {
      return true;
    } else {
      return false;
    }
  }

  disableOnTipoPersonaJ() {
    if (this.tipoPersonaFromCliente === 'J') {
      return true;
    } else {
      return false;
    }
  }

  onChangeCheckTieneCliente() {
    if (this.tienescredito == true) {
      this.disabledDiasCredito = false;
      this.disabledGarantCredito = false;
      this.disabledLineaCredito = false;
      this.diasCredito = null;
      this.garantiaCredito = "";
      this.lineaCredito = null;
    } else {
      this.diasCredito = null;
      this.garantiaCredito = "";
      this.lineaCredito = null;
      this.disabledDiasCredito = true;
      this.disabledGarantCredito = true;
      this.disabledLineaCredito = true;
    }
  }

  onClickCheckAprobar() {
    if (this.checkAprobar == true) {
      this.checkDesaprobar = false;
      this.checkAprobar = true;
    }
  }

  onClickCheckDesaprobar() {
    if (this.checkDesaprobar == true) {
      this.checkAprobar = false;
      this.checkDesaprobar = true;
    }
  }

}
