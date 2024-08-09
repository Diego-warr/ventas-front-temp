import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteDTO} from "../../../../dto/ClientesDTO";
import {Table} from "primeng/table";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ClienteService} from "../../../../services/cliente.service";
import {Paginator} from "primeng/paginator";
import {Router} from "@angular/router";
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ListaClientesComponent implements OnInit {

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private clienteService: ClienteService,
              private canalVentaService: CanalVentaService,
              private router: Router,) {
  }

  loadingClientes= true;

  clientes: ClienteDTO[] = []
  canalVentaList: CanalVentaJVDTO[]=[];
  seleccionClientes: Number[] = [];
  dialogClientes = false;
  cliente!: ClienteDTO;
  submitted: boolean = false;
  filterCliente!: any[];
  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;
  navigationItmesRoutes: MenuItem[] = [
    {label: "Lista de Clientes", icon: 'pi pi-fw pi-external-link'},
  ];

  selectedCli!: ClienteDTO;

  condicion = false

  filterClienteActivo!: number;
  filterCanalVenta = 0;

  @ViewChild('dt') dt: Table | undefined;

  ngOnInit() {
    this.filterCliente = [
      {label: 'ACTIVOS', value: 1},
      {label: 'INACTIVOS', value: 0},
    ];

    this.getAllClientesActivos(1);
    this.getAllCanalesVenta();
    this.filterClienteActivo = 1;
  }

  newCliente() {
    this.router.navigate(['nuevo-cliente']);
  }

  filtrarClientes(event: Event, stringVal: String) {
    //const razonSocial = (event.target as HTMLInputElement).value;
    this.dt!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    //this.clientesByPage(razonSocial);
    //this.filterByRazonSocial(event);
  }

  editCliente(cliente: ClienteDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  deleteCliente(cliente: ClienteDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + cliente.nombreComercial + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.dialogClientes = false;
    this.submitted = false;
  }

  guardarcliente() {

  }

  getAllCanalesVenta() {
    this.canalVentaService.getAll().subscribe(
      data => {
        this.canalVentaList = data;
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  getAllClientes() {
    this.clienteService.allClientes().subscribe(
      next => {
        if (next.status == "OK") {
          this.clientes = next.data!;
          this.loadingClientes = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllByFilters(estado: string, canalVentaId: number) {
    this.clienteService.findByFilters(estado, canalVentaId).subscribe(
      next => {
        if (next.status == "OK") {
          console.log("DATA", next)
          this.clientes = next.data!;
          this.loadingClientes = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllClientesActivos(flag: number) {
    this.clienteService.allClientesActivos(flag).subscribe(
      next => {
        if (next.status == "OK") {
          this.clientes = next.data!;
          this.loadingClientes = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllClientesInactivos(flag: number) {
    this.clienteService.allClientesInactivos(flag).subscribe(
      next => {
        if (next.status == "OK") {
          this.clientes = next.data!;
          this.loadingClientes = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllClientesByCanalVentaId(canalVentaId: number) {
    this.clienteService.findByCanalVentaId(canalVentaId).subscribe(
      next => {
        if (next) {
          console.log("FINDBYCANALVNETAID", next)
          let cli: any;
          cli = next;
          this.clientes = cli;
          console.log("CLIENTES", this.clientes)
          this.loadingClientes = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  onReset() {
    console.log("JEJEJE")
  }

  clientesByPage(razonSocial: string) {
    this.clienteService.clientesByPage(razonSocial, this.page, this.size).subscribe(
      next => {

        if (next.message == "SUCCESS") {
          //this.clientes.push(...next.data?.content!);
          this.clientes = next.data?.content!;
          this.totalElements = next.data?.totalElements!;
          this.totalPages = next.data?.totalPages!
          this.number = next.data?.number!;
          this.numberOfElements = next.data?.numberOfElements! + this.size;
        }

      },
      error => {
        console.log(error);
        return error;
      }
    );
  }

  filterByCodigo(e: Event) {
    let codigo = (e.target as HTMLInputElement).value;

    if (codigo != "") {
      this.clienteService.clientesLikeCodigo(codigo).subscribe(
        next => {
          if (next.message == "SUCCESS") {
            this.clientes = next.data!;
          }
        },
        error => {

        }
      )
    } else {
      this.clientesByPage("");
    }
  }

  filterByRazonSocial(e: Event) {
    let razonSocial = (e.target as HTMLInputElement).value;

    if (razonSocial != "") {
      this.clienteService.clienteLikeRazonSocial(razonSocial).subscribe(
        next => {
          if (next.message == "SUCCESS") {
            this.clientes = next.data!;
          }
        },
        error => {

        }
      )
    } else {
      this.clientesByPage("");
    }

  }

  filterByNombreComercial(e: Event) {
    let nombreComercial = (e.target as HTMLInputElement).value;

    if (nombreComercial != "") {
      this.clienteService.clienteLikeNombreComercial(nombreComercial).subscribe(
        next => {
          if (next.message == "SUCCESS") {
            this.clientes = next.data!;
          }
        },
        error => {

        }
      )
    } else {
      this.clientesByPage("");
    }
  }

  filterByNumDoc(e: Event) {
    let numDoc = (e.target as HTMLInputElement).value;

    if (numDoc != "") {
      this.clienteService.clienteLikeNumDoc(numDoc).subscribe(
        next => {
          if (next.message == "SUCCESS") {
            this.clientes = next.data!;
          }
        },
        error => {

        }
      )
    } else {
      this.clientesByPage("");
    }
  }

  showPage(e: Paginator) {
    let result = JSON.stringify(e.valueOf())
    let page = JSON.parse(result);
    this.page = page.page;
    this.clientesByPage("");
  }

  public irVistaInformacionCliente(cliente: ClienteDTO) {
    this.router.navigate(['ver-cliente/' + `${cliente.clienteId}`]);
  }

  public irVistaOrdenesPedidoCliente(cliente: ClienteDTO) {
    this.router.navigate(['/ordenpedido-cliente/' + `${cliente.clienteId}`]);
  }

  public irVistaComprabantesCliente(cliente: ClienteDTO) {
    this.router.navigate(['comprobante-cliente/' + `${cliente.clienteId}`]);
  }

  public dialogConfimacionCambiarEstadoCliente(cliente : ClienteDTO, estado : string){
    let mensaje = ''
    let mensajeResult = ""
    if(estado=='1'){
      mensaje = 'Desea habilitar al cliente ' + cliente.razonSocial + '?'
      mensajeResult = "Cliente hablitado"
      const index = this.clientes.indexOf(cliente, 0);
      if (index > -1) {
        this.clientes.splice(index, 1);
      }
    }else if(estado=='0'){
      mensaje = 'Desea inhabilitar al cliente ' + cliente.razonSocial + '?'
      mensajeResult = "Cliente inhablitado"
    }
    this.confirmationService.confirm({
      message: mensaje,
      header: 'Confirmar acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.cambiarEstadoCliente(cliente, cliente.clienteId,estado,mensajeResult)
      }
    });
  }

  public cambiarEstadoCliente(cliente:ClienteDTO, clienteId : number, estado : string,mensajeResult : string){
    let result = this.clienteService.cambiarEstadoClienteById(clienteId,estado)

    result.subscribe(
      next=>{
        if(next.message=='OK'){
          this.cambiarEstadoClienteById(clienteId,estado)
          const index = this.clientes.indexOf(cliente, 0);
          if (index > -1) {
            this.clientes.splice(index, 1);
          }
          this.messageService.add({severity: 'success', summary: 'Éxito', detail: mensajeResult, life: 3000});
        }else {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: "No se pudo completar la operación." });
        }
      },
      error => {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: "No se pudo completar la operación." });
      }
    )
  }

  private cambiarEstadoClienteById(clienteId : number, estado : string) {
    for (let i = 0; i<this.clientes.length; i++){
      if(this.clientes[i].clienteId==clienteId){
        this.clientes[i].status=estado
      }
    }
  }

  public onChangeFiltroCliente(event: any) {
    let numero = event.value;
    console.log("EVENT", event)
    console.log("NUMERO", numero)
    console.log("CANAL", this.filterCanalVenta)
    console.log("ESTADO", this.filterClienteActivo)
    if ((this.filterClienteActivo == 0 || this.filterClienteActivo == 1 ) && this.filterCanalVenta != 0) {
      this.getAllByFilters(String(this.filterClienteActivo), this.filterCanalVenta);
      console.log("FILT")
    } else if(this.filterClienteActivo == 0 && this.filterCanalVenta == 0) {
      console.log("INACTIVOS")
      this.getAllClientesInactivos(numero);
    } else {
      console.log("ACTIVOS")
      this.getAllClientesActivos(numero);
    }
  }

  public onChangeFiltroCanalVenta(event: any) {
    let numero = event.value;
    console.log("EVENT", event)
    console.log("NUMERO", numero)
    console.log("CANAL", this.filterCanalVenta)
    console.log("ESTADO", this.filterClienteActivo)
    if(this.filterCanalVenta == null && this.filterClienteActivo == 0) {
      console.log("DEFAULT INACTIVOS")
      this.getAllClientesInactivos(this.filterClienteActivo);
    } else if(this.filterCanalVenta == null && this.filterClienteActivo == 1) {
      console.log("DEFAULT ACTIVOS")
      this.getAllClientesActivos(this.filterClienteActivo);
    } else if((this.filterClienteActivo == 0 || this.filterClienteActivo == 1) && this.filterCanalVenta != 0) {
      this.getAllByFilters(String(this.filterClienteActivo), this.filterCanalVenta);
      console.log("FILT 1")
    } else {
      console.log("BYCANALVENTAID")
      this.getAllClientesByCanalVentaId(event.value);
    }
  }

}
