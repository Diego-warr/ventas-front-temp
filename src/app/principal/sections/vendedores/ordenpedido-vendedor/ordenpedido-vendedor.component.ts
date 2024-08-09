import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';
import { DetalleOrdenPedidoJVCustomDTO } from 'src/app/dto/DetalleOrdenPedidoJVCustomDTO';
import { OrdenPedidoJVResponseCustomDTO } from 'src/app/dto/OrdenPedidoJVResponseCustomDTO';
import { UsuarioBodyDTO } from 'src/app/dto/UsuarioBodyDTO';
import { OrdenPedidoService } from 'src/app/services/ordenpedido.service';
import { UsuarioServiceService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ordenpedido-vendedor',
  templateUrl: './ordenpedido-vendedor.component.html',
  styleUrls: ['./ordenpedido-vendedor.component.scss']
})
export class OrdenpedidoVendedorComponent implements OnInit {

  vendedor!: UsuarioBodyDTO;
  ordenesPedidosCustomList!: OrdenPedidoJVResponseCustomDTO[];
  detalleOrdenCustomList!: DetalleOrdenPedidoJVCustomDTO[];

  detalleDialog: boolean = false;

  dateInicial!: Date;
  dateFinal!: Date;

  impTotal = 0;
  importeTotal = 0;

  filterName!: string;
  filtroSelect!: any[];
  indexSelected!: number;
  index = 0;
  nroCaracteresFilter!: number;
  correoUsuario?: String;

  spinnerOn = false;
  loadingOrdenesPedidoVendedor = true;

  @ViewChild('dtOrdenes') dtOrdenes: Table | undefined;
  @ViewChild('dateIni') calendarIni: Calendar | undefined;
  @ViewChild('dateFin') calendarFin: Calendar | undefined;

  constructor(private router: Router,
              protected activateRoute: ActivatedRoute,
              private usuarioService: UsuarioServiceService,
              private ordenPedidoService: OrdenPedidoService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.getUsuarioById(Number.parseInt(params.get("usuarioId")!));
    });
    this.filtroSelect = [
      { id: 0, label: 'Filtrar por:' },
      { id: 1, label: 'Número' },
      { id: 2, label: 'Cliente comprobante' },
      { id: 3, label: 'Cliente real' }
    ]
  }

  navigationItemsRoutes: MenuItem[] = [
    {label: "Lista de vendedores", icon: 'pi pi-fw pi-external-link', routerLink: '/vendedores'},
    {label: "Ordenes de pedido"},
  ];

  public clickItemMenu(e: Event, path: String) {
    //this.items.find();
    this.router.navigate([path]);
  }

  getUsuarioById(usuarioId: number) {
    this.usuarioService.usuarioById(usuarioId).subscribe(
      next => {
        if (next.status == "OK") {
          this.vendedor = next.data!;
          this.correoUsuario = this.vendedor.correo;
          this.loadBreadCrumbsUsuario();
          this.getByVendedorId(this.vendedor);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getByVendedorId(vendedor: UsuarioBodyDTO) {
    this.ordenPedidoService.getByVendedorId(vendedor.username!).subscribe(
      data => {
        if (data.status == "OK") {
          this.ordenesPedidosCustomList = data.data!;
          this.sumar(this.ordenesPedidosCustomList);
          this.loadingOrdenesPedidoVendedor = false;
          this.spinnerOn = false;
        } else {
          this.loadingOrdenesPedidoVendedor = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onSelectedDates() {
    if(this.dateInicial !=null && this.dateFinal != null) {
      let ini = this.datePipe.transform(this.dateInicial,"yyyy-MM-dd");
      let fin = this.datePipe.transform(this.dateFinal,"yyyy-MM-dd");
      this.loadingOrdenesPedidoVendedor = true;
      this.getByRangoFechasAndVendedorId(ini, fin, this.vendedor)
    }
  }

  getByRangoFechasAndVendedorId(dateInicial, dateFinal, vendedor) {
    this.ordenPedidoService.getByRangoFechasAndVendedorId(dateInicial, dateFinal, vendedor.username).subscribe(
      data =>{
        if(data.status =="OK") {
          this.ordenesPedidosCustomList = data.data!;
          this.sumar(this.ordenesPedidosCustomList);
          this.loadingOrdenesPedidoVendedor = false;
        }
      }
    )
  }

  sumar(ordenList: OrdenPedidoJVResponseCustomDTO[]){
    ordenList.forEach(or => {
      or.detalleOrdenPedidoList.forEach(det => {
        this.importeTotal += det.precio
      });
      this.impTotal = this.importeTotal;
      this.importeTotal = 0;
      or.importeTotal = this.impTotal;
    });
  }

  filtrarOrdenesPedido(event: Event, stringVal: String) {
    this.dtOrdenes!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearFilters(dtOrdenes: Table) {
    dtOrdenes.clear();
  }

  loadBreadCrumbsUsuario() {
    if (this.navigationItemsRoutes.length < 3) {
      this.navigationItemsRoutes.push({label: String(this.vendedor.username)});
      this.navigationItemsRoutes = [...this.navigationItemsRoutes];
    }
  }

  setDetallesDeOrden(orden: OrdenPedidoJVResponseCustomDTO) {
    this.opendialogtoupdate();
    this.detalleOrdenCustomList = orden.detalleOrdenPedidoList;
  }

  opendialogtoupdate() {
    this.detalleDialog = true;
  }

  reloadListaOrdenes(dtOrdenes) {
    this.spinnerOn = true;
    this.loadingOrdenesPedidoVendedor = true;
    this.sumar(this.ordenesPedidosCustomList);
    this.dtOrdenes!.filterGlobal("", "");
    this.filterName = "";
    this.index = 0
    this.indexSelected = 0;
    this.clearDatesFields();
    this.clearFilters(dtOrdenes);
    this.getByVendedorId(this.vendedor);

  }


  clearDatesFields() {
    this.calendarIni!.value = '';
    this.calendarIni!.updateInputfield();
    this.calendarFin!.value = '';
    this.calendarFin!.updateInputfield();
  }

  onChangeFiltroSelect(e) {
    this.index = e.value;
    this.filterName = "";
    if(this.index == 1) {
      this.nroCaracteresFilter = 11;
    }
  }

  inputFiltroDisabled() {
    if (this.index == 0) {
      return true
    }
    return false;
  }

  buscarOrdenes(filterName: string, index: number) {
    this.loadingOrdenesPedidoVendedor = true;
    this.ordenPedidoService.getByFiltroLikeAndVendedorId(filterName, index, this.correoUsuario!).subscribe(
      data => {
        if(data.status == "OK") {
          this.dtOrdenes!._first = 0;
          this.ordenesPedidosCustomList = data.data!;
          this.loadingOrdenesPedidoVendedor = false;
        }
      },
      error => {
        console.log(error);
        this.loadingOrdenesPedidoVendedor = false;
        return "Error";
      }
    )
  }

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == "") {
      return true;
    }
  }

}