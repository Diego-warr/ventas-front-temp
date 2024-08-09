import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {ActionsServices} from "../ActionsServices";
import {UsuarioBodyDTO} from "../../../../dto/UsuarioBodyDTO";
import {ClienteDTO} from "../../../../dto/ClientesDTO";
import {ClienteResponseDTO} from "../../../../dto/ClienteResponseDTO";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {ClienteService} from "../../../../services/cliente.service";
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from "primeng/api";
import {UsuarioServiceService} from "../../../../services/usuario.service";
import {Table} from 'primeng/table'

@Component({
  selector: 'app-clientes-vendedor',
  templateUrl: './clientes-vendedor.component.html',
  styleUrls: ['./clientes-vendedor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ConfirmationService, MessageService],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }
  `]
})
export class ClientesVendedorComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen: boolean = false;

  @ViewChild('dt') dt: Table | undefined;

  @ViewChild('dt1') dt1: Table | undefined;

  usuarioId: number = 0;

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

  clientes: ClienteDTO[] = [];
  clientesSinAsignar: ClienteDTO[] = [];
  clientesSinAsignarByRazonSocial!: ClienteResponseDTO[];
  seleccionClientesId: string[] = [];
  seleccionClientes: ClienteDTO[] = [];

  displayPosition: boolean = false;

  position: string = "";
  displayBasic = false;
  listaVendedoresDialog = false;
  loading = true;
  loadingClientesAsignados = false;
  checked2: boolean = true;
  deshabilitarBtnGuardar = false;

  page = 0;
  size = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  number: number = 0;
  numberOfElements: number = 0;

  filterName!: string;

  vendedoresSelect!: any[];
  indexVendedorSelected!: number;
  codigoCliente!: number;

  btnGuardarListVendDisableb = true;

  navigationItemsRoutes: MenuItem[] = [
    {label: "Lista de vendedores", icon: 'pi pi-fw pi-external-link', routerLink: '/vendedores'},
    {label: "Portafolio de Clientes"},
  ];

  constructor(
    private ref: ChangeDetectorRef,
    private actionsServices: ActionsServices,
    private clienteService: ClienteService,
    private usuarioService: UsuarioServiceService,
    private confirmationService: ConfirmationService,
    private confirmationPopup: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    protected activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get("usuarioId"));
      this.getUsuarioById(Number.parseInt(params.get("usuarioId")!));
    });
    this.getAllVendedoresHabilitados();
  }

  showDialogAsignarClientes() {
    this.filterName = "";
    this.clientesSinAsignarByRazonSocial = [];
    this.displayBasic = true;
    this.getClientesSinAsignar(this.page, this.size);
  }

  hideMaximizableDialog() {
    this.isOpen = false;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  public clickItemMenu(e: Event, path: String) {
    this.router.navigate([path]);
  }

  getAllVendedoresHabilitados(){
    this.usuarioService.getAllUsuariosRolVentasHabilitados().subscribe(
      data => {
        if(data.status == "OK") {
          this.vendedoresSelect = data.data!;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  reasignarClientesAsociadosAOtroVendedor2(clienteId: number, usuarioId: number) {
    //this.listaVendedoresDialog = false;
      this.clienteService.reasignarClientesAsociadosDeUnVendedorAOtro(clienteId, usuarioId).subscribe(
         data => {
           if (data.status == "OK") {
             this.getUsuarioById(this.usuarioId);
             //this.listaVendedoresDialog = false;
           }
         },
         error => {
           console.log(error);
         }
      )
  }

  reasignarClientesAsociadosAOtroVendedor(event:Event, clienteId: number, usuarioId: number) {
    this.listaVendedoresDialog = false;
    this.confirmationService.confirm({
      //target: event.target!,
      message: '¿Está seguro(a) de reasignar el cliente al vendedor?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      this.clienteService.reasignarClientesAsociadosDeUnVendedorAOtro(clienteId, usuarioId).subscribe(
         data => {
           if (data.status == "OK") {
             this.getUsuarioById(this.usuarioId);
           }
         },
         error => {
           console.log(error);
         }
      );
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Precios del producto actualizados', life: 3000 });
    },
    reject: () => {
      this.getUsuarioById(this.usuarioId);
      this.listaVendedoresDialog = false;
    }
    });
  }

  public irVistaInformacionCliente(cliente: ClienteDTO) {
    this.router.navigate(['ver-cliente/' + `${cliente.clienteId}`]);
  }

  clientesByUsuario(usuarioId: number) {
    //this.clientes = [];
    this.clienteService.clientesByUsuario(usuarioId).subscribe(
      next => {
        if (next.status == "OK") {
          this.clientes = next.data!;
          this.loadingClientesAsignados = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public desasignarCliente(usuarioId: number, clienteId: number) {
    this.clienteService.desasignarCliente(usuarioId, clienteId).subscribe(
      next => {
        if (next.data != 0) {
          let index = this.findIndexByClienteId(clienteId);
          if (index > -1) {
            this.clientes.splice(index, 1);
            this.messageService.add({
              severity: 'info',
              summary: 'Éxito',
              detail: 'Cliente Retirado del portafolio',
              key: 'toast_desasignar'
            });
          }
        } else {
          console.log(next);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  desaignarClienteClick(event: any,clienteId: number) {
    this.confirmationPopup.confirm({
      target: event.target!,
      header:'Desasignar cliente',
      message: '¿Desea quitar al cliente del portafolio del vendedor?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.desasignarCliente(this.usuarioId, clienteId);
        this.clientesByUsuario(this.usuarioId);
      },
      reject: () => {
        this.clientesByUsuario(this.usuarioId);
      }
    });
  }

  private findIndexByClienteId(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].clienteId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getUsuarioById(usuarioId: number) {
    this.usuarioService.usuarioById(usuarioId).subscribe(
      next => {
        if (next.status == "OK") {
          this.vendedor = next.data!;

          this.loadBreadCrumbsUsuario();

          this.clientesByUsuario(usuarioId);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  loadBreadCrumbsUsuario() {
    if (this.navigationItemsRoutes.length < 3) {
      this.navigationItemsRoutes.push({label: String(this.vendedor.username)});
      this.navigationItemsRoutes = [...this.navigationItemsRoutes];
    }
  }


  getClientesSinAsignar(page: number, size: number) {
    this.clienteService.clientesSinAsignar(page, size).subscribe(
      next => {
        if (next.status == "OK") {
          this.clientesSinAsignar.push(...next.data?.content!);
          this.loading = false;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  applyFilterGlobal(event: Event, stringVal: String) {
    this.dt!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  filtrarClientesAsignados(event: Event, stringVal: String) {
    this.dt1!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  guardarSeleccionClientes() {
    this.quitarClienteSinAsignar();
    this.activateRoute.paramMap.subscribe(params => {
      this.getUsuarioById(Number.parseInt(params.get("usuarioId")!));
    });
    this.displayBasic = false;
  }

  findIndexArrayClientesSinAsignar(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.clientesSinAsignar.length; i++) {
      if (this.clientesSinAsignar[i].clienteId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  quitarClienteSinAsignar() {
    if (this.seleccionClientes.length != 0) {
      this.checked2 = false;
      this.activateRoute.paramMap.subscribe(params => {

        let usuarioId = Number.parseInt(params.get("usuarioId")!);
        this.seleccionClientes.forEach(select => {
          this.asignarClienteSevice(usuarioId, select.clienteId);
        });


        this.seleccionClientes = [];
        this.clientesByUsuario(this.usuarioId);

        this.messageService.add({
          severity: 'info',
          summary: 'Éxito',
          detail: 'Clientes asignados correctamente',
          key: 'toast_asignar'
        });
      })
    } else {
      this.checked2 = true;
      this.deshabilitarBtnGuardar = false;
      this.messageService.add({
        severity: 'warn',
        summary: 'Opps',
        detail: 'Debes seleccionar al menos un cliente',
        key: 'toast_asignar'
      });
    }
  }

  asignarClienteSevice(usuarioId: number, clienteId: number) {
    this.clienteService.asignarClienteToUsuario(usuarioId, clienteId).subscribe(
      next => {
        if (next.status == "OK") {
          let index = this.findIndexArrayClientesSinAsignar(clienteId);
          this.clientesSinAsignar.splice(index, 1);
          this.deshabilitarBtnGuardar = false;
          this.checked2 = true;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  cargarMasClientesSinAsignar() {
    this.page++;
    this.getClientesSinAsignar(this.page, this.size);
  }

  btnBuscarDisabled(): any {
    if (this.filterName == null || this.filterName == "") {
      return true;
    }
  }

  buscarClientes(filterName: string) {
    this.clienteService.clientesSinAsignarByRazonSocial(filterName).subscribe(
      data => {
        if(data.status == "OK") {
          this.clientesSinAsignarByRazonSocial = data.data!;
        }
      }
    )
  }

  openCloseModalReasignacionPortafolioClientes(cliente: ClienteDTO) {
    this.codigoCliente = cliente.clienteId;
    this.btnGuardarListVendDisableb = true;
    this.listaVendedoresDialog = true;
  }

  saveReasignarVendedorAOtro(event: Event) {
    if(this.btnGuardarListVendDisableb == false) {
          this.reasignarClientesAsociadosAOtroVendedor(event, this.codigoCliente, this.indexVendedorSelected);
          this.listaVendedoresDialog = false;
        }
    }

  onChangeVendedorSelect(e: any) {
    this.indexVendedorSelected = e.value;
    if(this.indexVendedorSelected != null) {
      this.btnGuardarListVendDisableb = false;
    }
  }

}
