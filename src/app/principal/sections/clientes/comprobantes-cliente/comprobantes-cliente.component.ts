import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ClienteDTO } from 'src/app/dto/ClientesDTO';
import { DetalleDocumentoJVBodyDTO } from 'src/app/dto/DetalleDocumentoJVBodyDTO';
import { DocumentoJVDTO } from 'src/app/dto/DocumentoJVDTO';
import { ClienteService } from 'src/app/services/cliente.service';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-comprobantes-cliente',
  templateUrl: './comprobantes-cliente.component.html',
  styleUrls: ['./comprobantes-cliente.component.scss']
})
export class ComprobantesClienteComponent implements OnInit {

  clienteId: number = 0;

  cliente!: ClienteDTO;

  documentsList: DocumentoJVDTO[] = [];

  spinnerOn = false;

  navigationItmesRoutes: MenuItem[] = [
    { label: "Lista de Clientes", icon: 'pi pi-fw pi-external-link', routerLink: '/clientes' },
    { label: "Información del Cliente" },
  ];

  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;

  dateInicial!: Date;
  dateFinal!: Date;

  loadingDocuments = true;

  filtroSelectComprobantes!: any[];
  indexComprobantesSelected!: number;

  dataPreLoaded!: boolean;
  dataByRangoFechas!: boolean;
  dataFilterLoaded = false;

  index = 0;

  firstRowOfPage = 0;
  lastRowOfPage = 10;

  filterNameComprobantes!: string;

  detalleComprobantesList: DetalleDocumentoJVBodyDTO[] = [];

  detalleComprobantesDialog = false;

  @ViewChild('dtcomprob') dtcomprob: Table | undefined;
  @ViewChild('paginadorConprobante', { static: false }) paginadorConprobante: Paginator | undefined;

  constructor(private documentoService: DocumentoService,
              private clienteService: ClienteService,
              protected activateRoute: ActivatedRoute,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.clienteId = Number(params.get("clienteId"));
    });

    this.clienteById(this.clienteId);
    this.getAllComprobantesByClienteIdPageable(this.clienteId, this.page, this.size);
  }

  addNavigationItemsRoutes(navigationItmesRoutes: MenuItem[]) {
    if (navigationItmesRoutes.length == 2) {
      this.navigationItmesRoutes.push({ label: this.cliente?.razonSocial ? this.cliente?.razonSocial
        : this.cliente?.primerNombre+' '+this.cliente?.segundoNombre+' '+this.cliente?.apellidoPaterno+' '+this.cliente?.apellidoMaterno });
      this.navigationItmesRoutes = [...this.navigationItmesRoutes];
    }
  }

  clienteById(clienteId: number) {
    this.clienteService.clienteById(clienteId).subscribe(
      response => {
        if (response.status == "OK") {
          this.cliente = response.data!;
          this.addNavigationItemsRoutes(this.navigationItmesRoutes)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onChangeFiltroSelectComprobantes(e) {
    this.index = e.value;
    this.filterNameComprobantes = "";
  }

  inputFiltroComprobantesDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
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

  btnBuscarComprobantesDisabled(): any {
    if (this.filterNameComprobantes == null || this.filterNameComprobantes == "") {
      return true;
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

  clearFiltersComprobantes(dtcomprob: Table) {
    dtcomprob.clear();
  }

  reloadListaComprobantes(dtOrdenes) {
    //this.loadingDocuments = true;
    this.spinnerOn = true;
    this.indexComprobantesSelected = 0;
    this.dtcomprob!.filterGlobal("", "");
    this.filterNameComprobantes = "";
    this.clearFiltersOrdenes(dtOrdenes);
    this.page = 0;
    this.size = 10;
    this.getAllComprobantesByClienteIdPageable(this.clienteId, this.page, this.size);
    this.paginadorConprobante!.first = 0;
    this.index = 0;
  }

  clearFiltersOrdenes(dtOrdenes: Table) {
    dtOrdenes.clear();
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

  setDetallesComprobantes(document: any) {
    this.openDialogDetallesComprobantes();
    this.detalleComprobantesList = document.detalleDocumentoList
  }

  openDialogDetallesComprobantes() {
    this.detalleComprobantesDialog = true;
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


}
