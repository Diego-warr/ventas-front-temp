import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { ClienteDTO } from 'src/app/dto/ClientesDTO';
import { DetalleOrdenPedidoJVCustomDTO } from 'src/app/dto/DetalleOrdenPedidoJVCustomDTO';
import { OrdenPedidoJVResponseCustomDTO } from 'src/app/dto/OrdenPedidoJVResponseCustomDTO';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdenPedidoService } from 'src/app/services/ordenpedido.service';

@Component({
  selector: 'app-ordenpedido-cliente',
  templateUrl: './ordenpedido-cliente.component.html',
  styleUrls: ['./ordenpedido-cliente.component.scss']
})
export class OrdenpedidoClienteComponent implements OnInit {

  clienteId: number = 0;

  ordenesPedidosCustomList!: OrdenPedidoJVResponseCustomDTO[];

  detalleOrdenCustomList!: DetalleOrdenPedidoJVCustomDTO[];
  
  cliente!: ClienteDTO;

  loadingOrdenes = true;

  filtroSelectOrdenesPedidos!: any[];

  indexSelected!: number;

  index = 0;

  filterName!: string;

  nroCaracteresFilter!: number;

  dateInicial!: Date;
  dateFinal!: Date;

  impTotal = 0;
  importeTotal = 0;

  detalleDialog = false;

  spinnerOn = false;

  navigationItmesRoutes: MenuItem[] = [
    { label: "Lista de Clientes", icon: 'pi pi-fw pi-external-link', routerLink: '/clientes' },
    { label: "Información del Cliente" },
  ];

  @ViewChild('dtOrdenes') dtOrdenes: Table | undefined;
  @ViewChild('dateOrdenIni') calendarOrdenIni: Calendar | undefined;
  @ViewChild('dateOrdenFin') calendarOrdenFin: Calendar | undefined;

  constructor(private ordenPedidoService: OrdenPedidoService,
              private datePipe: DatePipe,
              private clienteService: ClienteService,
              protected activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.clienteId = Number(params.get("clienteId"));
    });
    this.getOpByClienteId(this.clienteId);
    this.clienteById(this.clienteId);

    this.filtroSelectOrdenesPedidos = [
      { id: 1, label: 'Número' },
      { id: 2, label: 'Cliente comprobante' },
      { id: 3, label: 'Cliente real' }
    ]
  }

  onChangeFiltroSelect(e) {
    this.index = e.value;
    this.filterName = "";
    if (this.index == 1) {
      this.nroCaracteresFilter = 11;
    } else {
      this.nroCaracteresFilter = 100;
    }
  }

  inputFiltroDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
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

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == "") {
      return true;
    }
  }

  onSelectedDates() {
    if (this.dateInicial != null && this.dateFinal != null) {
      let ini = this.datePipe.transform(this.dateInicial, "yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal, "yyyy-MM-dd");
      this.loadingOrdenes = true;
      this.getByRangoFechasAndClienteId(ini, fin, this.clienteId)
    }
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

  reloadListaOrdenes(dtOrdenes) {
    this.loadingOrdenes = true;
    this.spinnerOn = true;
    this.indexSelected = 0;
    this.sumar(this.ordenesPedidosCustomList);
    this.dtOrdenes!.filterGlobal("", "");
    this.filterName = "";
    this.clearDatesFields();
    this.clearFiltersOrdenes(dtOrdenes);
    this.getOpByClienteId(this.clienteId)
  }

  clearDatesFields() {
    this.calendarOrdenIni!.value = '';
    this.calendarOrdenIni!.updateInputfield();
    this.calendarOrdenFin!.value = '';
    this.calendarOrdenFin!.updateInputfield();
  }

  getOpByClienteId(clienteId: number) {
    this.ordenPedidoService.getByClienteId(clienteId).subscribe(
      data => {
        if (data.status == "OK") {
          this.ordenesPedidosCustomList = data.data!;
          this.sumar(this.ordenesPedidosCustomList);
          this.loadingOrdenes = false;
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

  setDetallesDeOrden(orden: OrdenPedidoJVResponseCustomDTO) {
    this.opendialogtoupdate();
    this.detalleOrdenCustomList = orden.detalleOrdenPedidoList;
  }

  opendialogtoupdate() {
    this.detalleDialog = true;
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



}
