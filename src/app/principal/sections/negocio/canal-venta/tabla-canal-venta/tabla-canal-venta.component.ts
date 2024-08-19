import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';

@Component({
  selector: 'app-tabla-canal-venta',
  templateUrl: './tabla-canal-venta.component.html',
  styleUrls: ['./tabla-canal-venta.component.scss'],
})
export class CanalVentaComponent implements OnInit {
  canalVentaList: CanalVentaJVDTO[] = [];
  canalVentaJV!: CanalVentaJVDTO;

  loadingCanales = false;
  filterName!: string;

  actualizarCanal = false;

  titleDialog!: string;
  canalVentaDialog: boolean = false;

  disableEstado = true;

  estadoConvert!: String;
  estadoDefectoActualizar!: number;
  updatePriceBoxByChannel: boolean = false;

  canalToUpdate: any = {};
  @ViewChild('dtCanales') dtCanales: Table | undefined;

  constructor(
    private canalVentaService: CanalVentaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.canalVentaService.getAll().subscribe(
      (data) => {
        this.canalVentaList = data;
      },
      (error) => {
        console.log(error);
        return 'Error';
      }
    );
  }

  habilitarCanal(canal: CanalVentaJVDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de habilitar este canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.canalVentaService.habilitar(canal.canalVentaId).subscribe(
          (data) => {
            this.canalVentaList[
              this.findIndexById(canal.canalVentaId)
            ].canalVentaEnabled = 1;
          },
          (error) => {
            console.log(error);
          }
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Canal de venta habilitado',
          life: 3000,
        });
      },
    });
  }

  deshabilitarCanal(canal: CanalVentaJVDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar este canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.canalVentaService.inhabilitar(canal.canalVentaId).subscribe(
          (data) => {
            this.canalVentaList[
              this.findIndexById(canal.canalVentaId)
            ].canalVentaEnabled = 0;
          },
          (error) => {
            console.log(error);
          }
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Canal de venta inhabilitado',
          life: 3000,
        });
      },
    });
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.canalVentaList.length; i++) {
      if (this.canalVentaList[i].canalVentaId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  filtrarCanales(event: Event, stringVal: String) {
    this.dtCanales!.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  openNew() {
    this.titleDialog = 'NUEVO CANAL DE VENTA';
    this.resetCanalVenta();
    this.estadoConvert = 'Habilitado';
    this.actualizarCanal = false;
    this.canalVentaDialog = true;
  }

  setEditCanal(canal: CanalVentaJVDTO) {
    this.titleDialog = 'EITAR CANAL DE VENTA';
    this.canalVentaJV = canal;
    this.estadoDefectoActualizar = canal.canalVentaEnabled;
    this.convertEstadoCanal(canal.canalVentaEnabled);
    this.actualizarCanal = true;
    this.openDialogToUpdate();
  }

  convertEstadoCanal(estado: number) {
    if (estado == 1) {
      this.estadoConvert = 'Habilitado';
    } else {
      this.estadoConvert = 'Inhabilitado';
    }
  }

  openDialogToUpdate() {
    this.canalVentaDialog = true;
  }

  hideDialog() {
    this.getAll();
    this.canalVentaDialog = false;
  }

  validOrInvalidBtn(): boolean {
    if (
      this.canalVentaJV.canalVentaCodigo == '' ||
      this.canalVentaJV.canalVentaCodigo == null ||
      this.canalVentaJV.canalVentaDescripcion == '' ||
      this.canalVentaJV.canalVentaDescripcion == null
    ) {
      return true;
    } else {
      return false;
    }
  }

  onCreateOrUpdateCanal(canalVenta: CanalVentaJVDTO) {
    if (this.actualizarCanal) {
      this.updateCanalVenta(canalVenta);
    } else {
      this.createCanalVenta(canalVenta);
    }
  }

  createCanalVenta(canalVenta: CanalVentaJVDTO) {
    canalVenta.canalVentaEnabled = 1;
    this.canalVentaDialog = false;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un nuevo canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.canalVentaService.create(canalVenta).subscribe(
          (data) => {
            this.getAll();
          },
          (error) => {
            console.log(error);
          }
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Canal de venta creado correctamente',
          life: 3000,
        });
      },
      reject: () => {
        this.resetCanalVenta();
        this.getAll();
      },
    });
  }

  updateCanalVenta(canalVenta: CanalVentaJVDTO) {
    this.canalVentaDialog = false;
    canalVenta.canalVentaEnabled = this.estadoDefectoActualizar;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar el canal de venta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.canalVentaService.update(canalVenta).subscribe(
          (data) => {
            this.getAll();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Canal de venta no ha sido actualizado',
              life: 3000,
            });
            console.log(error);
            return 'Error';
          }
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Canal de venta actualizado correctamente',
          life: 3000,
        });
      },
      reject: () => {
        this.resetCanalVenta();
        this.getAll();
      },
    });
  }

  resetCanalVenta() {
    this.canalVentaJV = {
      canalVentaId: 0,
      canalVentaCodigo: '',
      canalVentaDescripcion: '',
      canalVentaResponsable: '',
      canalVentaEnabled: 0,
    };
  }

  editPriceBox(canal) {
    // debugger;
    this.canalToUpdate = canal;
    this.updatePriceBoxByChannel = true;
  }

  hideDialogPriceBox() {
    this.getAll();
    this.updatePriceBoxByChannel = false;
  }

  updatePriceBoxByChannelAction() {
    this.canalVentaService
      .updatePriceBox(
        this.canalToUpdate.canalVentaId,
        this.canalToUpdate.precioCasillero
      )
      .subscribe((res) => {
        this.updatePriceBoxByChannel = false;
        this.getAll();
      });
  }

  validOrInvalidBtnUpdateBoxPrice() {
    return false;
  }
}
