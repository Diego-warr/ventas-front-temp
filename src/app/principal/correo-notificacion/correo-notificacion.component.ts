import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { CorreoNotificacionCustomDTO } from 'src/app/dto/CorreoNotificacionCustomDTO';
import { CorreoNotificacionDTO } from 'src/app/dto/CorreoNotificacionDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { CorreoNotificacionService } from 'src/app/services/correo-notificacion.service';

@Component({
  selector: 'app-correo-notificacion',
  templateUrl: './correo-notificacion.component.html',
  styleUrls: ['./correo-notificacion.component.scss']
})
export class CorreoNotificacionComponent implements OnInit {

  correoNotificacion: CorreoNotificacionDTO = { correoNotificacionId: 0, canalVentaId: 0, correo: '', lineaNegocioId: null, usuarioId: null, status: 'A' };
  correoNotificacionList: CorreoNotificacionDTO[] = [];
  correoNotificacionCustomList: CorreoNotificacionCustomDTO[] = [];
  canalVentaList: CanalVentaJVDTO[] = [];

  canalVenta: CanalVentaJVDTO | undefined = { canalVentaId: 0, canalVentaCodigo: '', canalVentaDescripcion: '', canalVentaEnabled: 0, canalVentaResponsable: '' };

  canalVentaIdSelected!: number;
  canalVentaId!: number;

  correoNotificacionDialog = false;
  titleDialog!: string

  actualizarCorreoNotif = false;

  @ViewChild('dtCorreoNotif') dtCorreoNotif: Table | undefined;

  constructor(private canalVentaService: CanalVentaService,
    private correoNotificacionService: CorreoNotificacionService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllCanalVenta();
  }

  resetCorreoNotificacion() {
    this.correoNotificacion = { correoNotificacionId: 0, canalVentaId: 0, correo: '', lineaNegocioId: null, usuarioId: null, status: 'A' }
  }

  resetCorreoNotificacionCustomList() {
    this.correoNotificacionList = [];
    this.correoNotificacionCustomList = [];
  }

  getAllCanalVenta() {
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

  getAllByCanalVentaId(idCanalVenta: number) {
    this.correoNotificacionService.findAllByCanalVentaId(idCanalVenta).subscribe(
      data => {
        this.correoNotificacionList = data;
        this.setCorreoNotificacionToCustom();
      }
    )
  }

  onChangeCanalVenta(e) {
    this.resetCorreoNotificacionCustomList()
    let idCanalVenta = e.value;
    this.getAllByCanalVentaId(idCanalVenta)
  }

  setCorreoNotificacionToCustom() {
    let list = this.correoNotificacionList.map(cn =>
      <CorreoNotificacionCustomDTO>{
        correoNotificacionId: cn.correoNotificacionId,
        canalVentaId: cn.canalVentaId,
        lineaNegocioId: cn.lineaNegocioId,
        usuarioId: cn.usuarioId,
        correo: cn.correo,
        canalVentaDescripcion: '',
        status: cn.status
      });
    this.correoNotificacionCustomList = list;
    this.setCanalVentaDescripcion();
  }

  setCanalVentaDescripcion() {
    this.canalVentaId = this.correoNotificacionCustomList.length > 0 ? this.correoNotificacionCustomList[0].canalVentaId : 0;
    this.canalVenta = this.canalVentaList.find(cv => cv.canalVentaId == this.canalVentaId);
    this.correoNotificacionCustomList.map(cn => cn.canalVentaDescripcion = this.canalVenta!.canalVentaDescripcion)
  }

  filtrarCorreoNotificacion(event: Event, stringVal: string) {
    this.dtCorreoNotif!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNewCorreoNotificacion() {
    this.resetCorreoNotificacion();
    this.titleDialog = 'ASIGNAR NOTIFICACIÓN DE CORREO';
    this.actualizarCorreoNotif = false;
    this.correoNotificacionDialog = true;
  }

  validOrInvalidBtn(): boolean {
    if (this.correoNotificacion.canalVentaId == null || this.correoNotificacion.correo == '' || this.correoNotificacion.correo == null) {
      return true;
    } else {
      return false;
    }
  }

  hideDialog() {
    this.correoNotificacionDialog = false;
  }

  onCreate(correoNotificacion: CorreoNotificacionDTO) {
    this.correoNotificacionDialog = false;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de asignar este correo a las notificaciones?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.correoNotificacionService.create(correoNotificacion).subscribe(
          data => {
            if (data != null) {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificacion de correo asignada correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Notificacion de correo no ha sido asignada correctamente', life: 3000 });
            }
          },
          error => {
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ha ocurrido un error al asignar la notificacion de correo', life: 3000 });
            console.log(error);
          }
        );
      },
      reject: () => {
      }
    });
  }

  habilitar(correoNotifi: CorreoNotificacionDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de habilitar este correo para este canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.correoNotificacionService.habilitar(correoNotifi.canalVentaId, correoNotifi.correo).subscribe(
          data => {
            this.correoNotificacionCustomList[this.findIndexById(correoNotifi.correoNotificacionId)].status = 'A'
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificación de correo habilitado para este canal de venta', life: 3000 });
      }
    });
  }

  deshabilitar(correoNotifi: CorreoNotificacionDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar este correo para este canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.correoNotificacionService.inhabilitar(correoNotifi.canalVentaId, correoNotifi.correo).subscribe(
          data => {
            this.correoNotificacionCustomList[this.findIndexById(correoNotifi.correoNotificacionId)].status = 'I'
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Notificación de correo inhabilitado para este canal de venta', life: 3000 });
      }
    });
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.correoNotificacionList.length; i++) {
      if (this.correoNotificacionCustomList[i].correoNotificacionId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
