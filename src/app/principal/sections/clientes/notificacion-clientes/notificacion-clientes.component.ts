import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CorreoNotificacionNuevoCliente } from 'src/app/dto/CorreoNotificacionNuevoCliente';
import { CorreoNotificacionClienteService } from 'src/app/services/correo-notificacion-cliente.service';

@Component({
  selector: 'app-notificacion-clientes',
  templateUrl: './notificacion-clientes.component.html',
  styleUrls: ['./notificacion-clientes.component.scss']
})
export class NotificacionClientesComponent implements OnInit {

  notifCorreocliente: CorreoNotificacionNuevoCliente[]=[];
  
  filterCliNotif!: any[];
  filterClienteActivo!: number;

  correoNotificacionDialog = false;

  correoNotificacion: string = '';

  titleDialog = 'NOTIFICACIÓN POR CORREO';

  correoNotif!: CorreoNotificacionNuevoCliente;

  @ViewChild('dtCorreoNotifCliente') dtCorreoNotifCliente: Table | undefined;

  constructor(private correoNotifClienteService: CorreoNotificacionClienteService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.filterCliNotif = [
      {label: 'ACTIVOS', value: 1},
      {label: 'INACTIVOS', value: 0},
    ];
    this.getAllActivos();
    this.filterClienteActivo = 1;
    this.correoNotif = {correoNotificacionNuevoClienteId:0, correo:'', status:'A'}
  }

  getAllActivos() {
    this.correoNotifClienteService.findAllActivos().subscribe(
      next =>   {
        this.notifCorreocliente = next;
      },
      error => {
        console.log("error",error)
      })
  }

  getAllInactivos() {
    this.correoNotifClienteService.findAllInactivos().subscribe(
      next =>   {
        this.notifCorreocliente = next;
      },
      error => {
        console.log("error",error)
      })
  }

  onChangeFiltroActivo(event: any) {
    let numero = event.value;
    if(numero == 0) {
      this.getAllInactivos();
    } else {
      this.getAllActivos();
    }
  }

  createNotificacionCliente() {
    this.correoNotif.correo = this.correoNotificacion;
    this.correoNotif.status = 'A'
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de notificar por correo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.correoNotifClienteService.create(this.correoNotif).subscribe(
          data => {
            this.filterClienteActivo = 1;
            this.getAllActivos()
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Notificación por correo creada exitosamente', life: 3000 });
          },
          error => {
            console.log(error);
          }
        );
      },
      reject: () => {
        this.correoNotificacion = '';
      }
    });
  }

  filtrarCorreoNotificacion(event: Event, stringVal: string) {
    this.dtCorreoNotifCliente!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  newCorreoNotificacionCliente() {
    this.correoNotificacion = '';
    this.correoNotificacionDialog = true;
  }

  deshabilitarNotifiCliente(correoNotifiCliente: CorreoNotificacionNuevoCliente) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar esta notificación por correo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let idCorreoNotif = correoNotifiCliente.correoNotificacionNuevoClienteId;
        this.correoNotifClienteService.inhabilitar(idCorreoNotif).subscribe(
          data => {
            this.filterClienteActivo = 0;
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Notificación por correo inhabilitada', life: 3000 });
              this.getAllInactivos();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  habilitarNotifiCliente(correoNotifiCliente: CorreoNotificacionNuevoCliente) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de habilitar esta notificación por correo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let idCorreoNotif = correoNotifiCliente.correoNotificacionNuevoClienteId;
        this.correoNotifClienteService.habilitar(idCorreoNotif).subscribe(
          data => {
            this.filterClienteActivo = 1;
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Notificación por correo habilitada', life: 3000 });
            this.getAllActivos();
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.notifCorreocliente.length; i++) {
      if (this.notifCorreocliente[i].correoNotificacionNuevoClienteId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.correoNotificacion = '';
    this.correoNotificacionDialog = false;
  }

  onCreate() {
    this.correoNotificacionDialog = false;
    this.createNotificacionCliente();
  }

}
