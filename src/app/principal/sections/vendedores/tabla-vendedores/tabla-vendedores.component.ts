import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioDTO } from "../../../../dto/UsuarioDTO";
import { UsuarioServiceService } from "../../../../services/usuario.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UsuarioBodyDTO } from "../../../../dto/UsuarioBodyDTO";
import { RolDTO } from "../../../../dto/RolDTO";
import { PrimeNGConfig } from 'primeng/api';
import { CommonsServices } from "../../../../services/commons-services";
import { LineaNegocioDTO } from "../../../../dto/LineaNegocioDTO";
import { ActionsServices } from "../ActionsServices";
import { Router } from "@angular/router";
import { Table } from "primeng/table";

@Component({
  selector: 'app-tabla-vendedores',
  templateUrl: './tabla-vendedores.component.html',
  styleUrls: ['./tabla-vendedores.component.scss'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }
  `],
  providers: [MessageService, ConfirmationService]
})
export class TablaVendedoresComponent implements OnInit {

  productDialog = false;
  vendedores: UsuarioDTO[] = [];
  roles: RolDTO[] = [];
  rol: RolDTO = { rolId: 0, rolNombre: "", status: "" };

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
    dni: "",
    vendedorAuxiliar: "",
    vendedorDocumentoSerie: "",
    permitirEditar: ""
  };

  submitted = false;
  statuses: any[] = [];
  first = 0;
  rows = 3;
  selectedValues: string[] = [];
  selectedValuesLineaNegoio: string[] = [];
  lineasNegocios: LineaNegocioDTO[] = [];
  actualizarUsuario = false;
  display: any;
  loadingUsuarios = false;

  titleDialog!: string;

  stateOptions: any[] = [
    { label: 'Permitir', value: '1' },
    { label: 'No permitir', value: '0' }
];

  @ViewChild('dt1') dt1: Table | undefined;

  constructor(private usuarioServiceService: UsuarioServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private commonsServices: CommonsServices,
    private actionsServices: ActionsServices,
    private router: Router) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllUsuariosRolVentas();
    this.getAllRoles();
    this.getAllLineasNegocios();

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  resetUsuario() {
    this.vendedor = {
      correo: "",
      apellidos: "",
      username: "",
      password: "",
      nombres: "",
      status: "A",
      usuarioId: 0,
      roles: [],
      lineaNegocios: [],
      dni: "",
      vendedorAuxiliar: null,
      vendedorDocumentoSerie: "",
      permitirEditar: "1"
    };
  }

  resetSelectionRoles() {
    this.selectedValues = [];
  }

  resetSelectionLineaNegocio() {
    this.selectedValuesLineaNegoio = [];
  }

  openNew() {
    this.resetUsuario();
    this.resetSelectionRoles();
    this.resetSelectionLineaNegocio()
    this.submitted = false;
    this.titleDialog = "REGISTRAR NUEVO USUARIO"
    this.actualizarUsuario = false;
    this.productDialog = true;
  }

  opendialogtoupdate() {
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.selectedValues = [];
    this.resetUsuario();
    this.resetSelectionRoles();
    this.resetSelectionLineaNegocio();
    this.getAllUsuariosRolVentas();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  createOrUpdateUsuario() {
    if (this.actualizarUsuario) {
      this.updateUsuario();
    } else {
      this.crearUsuario();
    }
  }

  crearUsuario() {
    this.submitted = true;
    this.productDialog = false;
    let rolesAsignados: RolDTO[] = [];
    let lineasNegociosAsignados: LineaNegocioDTO[] = [];
    this.selectedValues.forEach(s => {
      rolesAsignados.push(this.roles[this.findIndexArrayRol(Number.parseInt(s))]);
    });

    this.selectedValuesLineaNegoio.forEach(l => {
      lineasNegociosAsignados.push(this.lineasNegocios[this.findIndexArrayLineaNegocio(Number.parseInt(l))])
    });

    this.vendedor.roles = rolesAsignados;
    this.vendedor.lineaNegocios = lineasNegociosAsignados;

    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un nuevo usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.crearUsuario(this.vendedor).subscribe(
          data => {
            if (data.status == "OK") {
              this.resetUsuario();
              this.resetSelectionRoles();
              this.resetSelectionLineaNegocio();
              this.hideDialog();
              this.getAllUsuariosRolVentas();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Usuario no creado', life: 3000 });
            }
          },
          error => {
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Usuario no creado', life: 3000 });
            console.log(error);
          }
        );
      },
      reject: () => {
        this.resetUsuario();
        this.resetSelectionRoles();
        this.resetSelectionLineaNegocio();
        this.getAllUsuariosRolVentas();
      }
    });
  }

  onchangeasignarroles(e: Event) {
  }

  updateUsuario() {
    this.submitted = true;
    let rolesAsignados: RolDTO[] = [];
    let lineasNegociosAsignados: LineaNegocioDTO[] = [];
    this.productDialog = false;

    this.selectedValues.forEach(s => {
      if (this.roles[this.findIndexArrayRol(Number.parseInt(s))] != undefined) {
        rolesAsignados.push(this.roles[this.findIndexArrayRol(Number.parseInt(s))]);
      }
    });

    this.selectedValuesLineaNegoio.forEach(l => {
      lineasNegociosAsignados.push(this.lineasNegocios[this.findIndexArrayLineaNegocio(Number.parseInt(l))])
    });

    this.vendedor.roles = rolesAsignados;
    this.vendedor.lineaNegocios = lineasNegociosAsignados;

    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar los datos del usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.updateUsuario(this.vendedor).subscribe(
          data => {
            console.log(data);
            if (data.status == "OK") {
              this.resetUsuario();
              this.resetSelectionRoles();
              this.resetSelectionLineaNegocio();
              this.actualizarUsuario = false;
              this.getAllUsuariosRolVentas();
              this.hideDialog();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos de usuario actualizados correctamente', life: 3000 });
            }
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos de usuario no han sido actualizados correctamente', life: 3000 });
            console.log(error);
            return "Error";
          }
        );
      },
      reject: () => {
        this.resetUsuario();
        this.resetSelectionRoles();
        this.resetSelectionLineaNegocio();
        this.getAllUsuariosRolVentas();
      }
    });
  }

  getAllUsuariosRolVentas() {
    this.usuarioServiceService.getAllUsuariosRolVentas().subscribe(
      data => {
        if (data.status == 'OK') {
          this.vendedores = data.data!;
          this.loadingUsuarios = false;
        }
      }
    )
  }

  deshabilitarVendedor(usuario: UsuarioDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar a este(a) vendedor(a)?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.inhabilitarUsuario(usuario.usuarioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.vendedores[this.findIndexById(usuario.usuarioId)].status = "0";
            }
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Vendedor inhabilitado', life: 3000 });
      }
    });
  }

  habilitarUsuario(usuario: UsuarioDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar a este vendedor(a)?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.habilitarUsuario(usuario.usuarioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.vendedores[this.findIndexById(usuario.usuarioId)].status = "1";
            }
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Vendedor habilitado', life: 3000 });
      }
    });
  }

  getAllRoles() {
    this.usuarioServiceService.getAllroles().subscribe(
      data => {
        if (data.status == "OK") {
          this.roles = data.data!;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getAllLineasNegocios() {
    this.commonsServices.getAllLineasNegocios().subscribe(
      data => {
        if (data != undefined) {
          this.lineasNegocios = data!;
        }
      },
      error => {
      }
    );
  }

  setEditUsuario(usuario: UsuarioBodyDTO) {
    this.titleDialog = "EDITAR USUARIO";
    this.vendedor = usuario;
    this.vendedor.password = "";
    this.actualizarUsuario = true;
    this.selectedValues = [];
    this.selectedValuesLineaNegoio = [];

    this.vendedor.roles?.forEach(r => {
      this.selectedValues.push(r.rolId.toString());
    });

    this.vendedor.lineaNegocios?.forEach(l => {
      this.selectedValuesLineaNegoio.push(l.lineaNegocioId.toString());
    });

    this.opendialogtoupdate()
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.vendedores.length; i++) {
      if (this.vendedores[i].usuarioId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findIndexArrayRol(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].rolId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  findIndexArrayLineaNegocio(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.lineasNegocios.length; i++) {
      if (this.lineasNegocios[i].lineaNegocioId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  openCloseModalAsignarClientes(vendedor: UsuarioBodyDTO) {
    this.router.navigate(['/clientes-vendedor/' + `${vendedor.usuarioId}`]);
  }

  openCloseModalOrdenPedido(vendedor: UsuarioBodyDTO) {
    this.router.navigate(['/ordenpedido-vendedor/' + `${vendedor.usuarioId}`]);
  }

  public clickItemMenu(e: Event, path: String) {
    this.router.navigate([path]);
  }

  habilitarVendedorAuxiliar(usuario: UsuarioDTO) {
    this.confirmationService.confirm({
      message: '¿Desea asignar como auxiliar a este vendedor?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.habilitarVendedorAuxiliar(usuario.correo!).subscribe(
          data => {
            if (data.status == "OK") {
              this.vendedores[this.findIndexById(usuario.usuarioId)].vendedorAuxiliar = "AUX";
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Vendedor fue asignado como auxiliar', life: 3000 });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  inhabilitarVendedorAuxiliar(usuario: UsuarioDTO) {
    this.confirmationService.confirm({
      message: '¿Desea desasignar como auxiliar a este vendedor?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioServiceService.inhabilitarVendedorAuxiliar(usuario.correo!).subscribe(
          data => {
            if (data.status == "OK") {
              this.vendedores[this.findIndexById(usuario.usuarioId)].vendedorAuxiliar = "";
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Vendedor fue desasignado como auxiliar', life: 3000 });
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  filtrarClientesAsignados(event: Event, stringVal: String) {
    this.dt1!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  validarInputs(vendedor: any) {
    if (this.vendedor.nombres == null || this.vendedor.nombres == "" || this.vendedor.apellidos == null || this.vendedor.apellidos == "" ||
      this.vendedor.correo == null || this.vendedor.correo == "" || this.vendedor.username == null || this.vendedor.username == "" || this.vendedor.dni == null || this.vendedor.dni == "") {
      return true
    } else {
      return false;
    }
  }

  validOrInvalidBtn(vendedor: any): boolean {
    if ((this.validarInputs(vendedor))) {
      return true;
    }
    return false;
  }
}
