import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { DetalleDocumentoJVBodyDTO } from 'src/app/dto/DetalleDocumentoJVBodyDTO';
import { DocumentoJVDTO } from 'src/app/dto/DocumentoJVDTO';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-ventas-diarias',
  templateUrl: './ventas-diarias.component.html',
  styleUrls: ['./ventas-diarias.component.scss']
})
export class VentasDiariasComponent implements OnInit {

  documentsList: DocumentoJVDTO[] = [];

  detalleDialog: boolean = false;
  detalleComprobantesList: DetalleDocumentoJVBodyDTO[] = [];

  selectedComprobante!: DocumentoJVDTO;

  loadingDocuments = true;
  spinnerOn = false;

  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;

  firstRowOfPage = 0;
  lastRowOfPage = 10;

  dataPreLoaded!: boolean;
  dataFilterLoaded = false;
  dataByRangoFechas!: boolean;
  flagSelectedDates = true;

  titleDetalleDialog!: string;

  filterName!: string;
  indexSelected!: number;

  dateInicial!: Date;
  dateFinal!: Date;

  filtroSelect!: any[];
  index = 0;

  @ViewChild('dtrepventa') dtrepventa: Table | undefined;
  @ViewChild('dateIni') calendarIni: Calendar | undefined;
  @ViewChild('dateFin') calendarFin: Calendar | undefined;
  @ViewChild('paginador', { static: false }) paginador: Paginator | undefined;

  constructor(private datePipe: DatePipe,
    private documentoService: DocumentoService) { }



  ngOnInit(): void {
    this.getAllPageable(this.page, this.size);
    this.getFiltroSelect();
  }

  getFiltroSelect() {
    this.filtroSelect = [
      { id: 1, label: 'Número' },
      { id: 2, label: 'Guia remision' },
      { id: 3, label: 'Cliente comprobante' },
      { id: 4, label: 'Cliente real' }
    ]
  }

  getAllPageable(page: number, size: number) {
    this.documentoService.getAllPageable(page, size).subscribe(
      data => {
        if (data.message == "SUCCESS") {
          console.log("DATA.DATA", data.data)
          this.documentsList = data.data!.content!;
          console.log("DOCUMENTS", this.documentsList)
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataPreLoaded = true;
        }
        this.loadingDocuments = false;
        this.spinnerOn = false;
        this.filtroSelect;
      },
      error => {
      console.log(error);
      return "Error";
    }
    )
  }

  filtrarOrdenes(event: Event, stringVal: String) {
    this.dtrepventa!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSelectedDates() {
    if (this.dateInicial != null && this.dateFinal != null) {
      this.loadingDocuments = true;
      let ini: any = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin: any = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      // this.page = 0;
      // this.firstRowOfPage = 0;
      // this.lastRowOfPage = 10;
      this.flagSelectedDates = true;
      this.getAllComprobantesByRangoFechasPageable(ini, fin, this.page, this.size)
    }
  }

  reloadDocuments(dtrepventa) {
    this.spinnerOn = true;
    this.loadingDocuments = true;
    this.filterName = "";
    this.indexSelected = 0;
    this.index = 0;
    this.clearDatesFields();
    this.clearFiltersComprobantes(dtrepventa);
    this.page = 0;
    this.size = 10;
    this.getAllPageable(this.page, this.size);
    this.paginador!.first=0;
  }

  clearDatesFields() {
    this.calendarIni!.value = '';
    this.calendarIni!.updateInputfield();
    this.calendarFin!.value = '';
    this.calendarFin!.updateInputfield();
  }

  clear(dtrepventa: Table) {
    dtrepventa.clear();
    this.dtrepventa!.filterGlobal(this.filterName, 'contains')
  }

  onChangeFiltroSelect(e) {
    this.index = e.value;
    this.filterName = "";
  }

  filtrarComprobantes(event: Event, stringVal: String) {
    this.dtrepventa!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllComprobantesByRangoFechasPageable(dateInicial: any, dateFinal: any, page: number, size: number) {
    this.documentoService.getAllByRangoFechasPageable(dateInicial, dateFinal, page, size).subscribe(
      data => {
        if (data.message == "SUCCESS") {
          this.documentsList = data.data?.content!;
          this.totalElements = data.data?.totalElements!;
          this.totalPages = data.data?.totalPages!
          this.number = data.data?.number!;
          this.numberOfElements = data.data?.numberOfElements!;
          this.dataByRangoFechas = true;
        }
        this.loadingDocuments = false;
        this.dataPreLoaded = false;
        this.dataFilterLoaded = false;
        if(this.flagSelectedDates == true) {
          this.paginador!.first = 0;
          this.firstRowOfPage = 0;
          this.lastRowOfPage = data.data?.numberOfElements!;
          this.flagSelectedDates = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  buscarComprobantes(filterName: string, index: number, page: number, size: number, $event: Event) {
    this.loadingDocuments = true;
    this.documentoService.getByFiltroLikePageable(filterName, index, page, size).subscribe(
      data => {
        let evento = $event;
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
        if(evento.isTrusted == true) {
          this.reiniciarValoresPaginacion(data.data?.numberOfElements!);
        }
      },
      error => {
        console.log(error);
        return error;
      }
    )
  }

  reiniciarValoresPaginacion(lastPage: number) {
    this.paginador!.first = 0;
    this.firstRowOfPage= 0;
    this.lastRowOfPage = lastPage;
  }

  showPageFiltroComprobante(e: any) {
    let result = JSON.stringify(e.valueOf())
    let page = JSON.parse(result);
    this.page = page.page;
    if (this.dataPreLoaded == true) {
      this.getAllPageable(this.page, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows;
    } else if (this.dataByRangoFechas == true) {
      let ini = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      this.getAllComprobantesByRangoFechasPageable(ini, fin, this.page, e.rows);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows
    } else if (this.dataFilterLoaded == true) {
      this.buscarComprobantes(this.filterName, this.index, this.page, e.rows, e);
      this.firstRowOfPage = e.first;
      this.lastRowOfPage = e.first + e.rows
    }
  }

  clearFiltersComprobantes(dtrepventa: Table) {
    dtrepventa.clear();
  }

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == "") {
      return true;
    }
  }

  inputFiltroDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
  }

  setDetallesDocuments(document: any) {
    this.openDialogDetallesComprobantes(document);
    this.detalleComprobantesList = document.detalleDocumentoList
  }

  openDialogDetallesComprobantes(document) {
    this.titleDetalleDialog = 'Detalle comprobante nro. ' + document.glosa2;
    this.detalleDialog = true;
  }

}
