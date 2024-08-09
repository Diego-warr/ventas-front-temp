import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataUserToken } from 'src/app/auth/data-user-token.service';
import { GrupoPrecioJVDTO } from 'src/app/dto/GrupoPrecioJVDTO';
import { PrecioBaseJVBodyUpdateDTO } from 'src/app/dto/PrecioBaseJVBodyUpdateDTO';
import { PrecioBaseJVDTO } from 'src/app/dto/PrecioBaseJVDTO';
import { GrupoPrecioService } from 'src/app/services/grupo-precio.service';
import { PrecioBaseService } from 'src/app/services/precio-base.service';

@Component({
  selector: 'app-tabla-precio-base',
  templateUrl: './tabla-precio-base.component.html',
  styleUrls: ['./tabla-precio-base.component.scss']
})
export class TablaPrecioBaseComponent implements OnInit {

  usuario: string = "";

  precioBaseList: PrecioBaseJVDTO[] = [];

  grupoPrecioList: GrupoPrecioJVDTO[] = [];

  grupoPrecioSelected: number = 0;

  filterName: string = "";

  titleDialog!: string;

  actualizarPrecioBase = false;

  precioBaseDialog = false;

  precioBase!: PrecioBaseJVBodyUpdateDTO;

  precioBaseEdit!: PrecioBaseJVDTO;

  montoIngresado: number = 0;
  dateInicial = new Date();
  dateFinal = new Date();

  today = new Date().setHours(0, 0, 0, 0);

  @ViewChild('dtpreciobase') dtpreciobase: Table | undefined;

  constructor(private dataUserToken: DataUserToken,
    private precioBaseService: PrecioBaseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private grupoPrecioService: GrupoPrecioService) { }

  ngOnInit(): void {
    this.usuario = this.dataUserToken.getUsuario();
    this.getAll();
    this.precioBase = {
      precioBaseId: 0,
      monto: 0,
      fechaInicial: new Date(),
      fechaFinal: new Date(),
      grupoPrecioId: 0,
      estado: 1,
      usuarioCreacion: "",
      fechaCreacion: new Date(),
      usuarioModificacion: "",
      fechaModificacion: new Date()
    }
  }

  getAll() {
    this.precioBaseService.getAll().subscribe(
      data => {
        this.precioBaseList = data.data!;
      }
    )
  }

  getAllGrupoPrecios() {
    this.grupoPrecioService.getAll().subscribe(
      data => {
        this.grupoPrecioList = data.data!;
      }
    )
  }

  filtrarPrecioBase(event: Event, stringVal: String) {
    this.dtpreciobase!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  createOrUpdatePrecioBase() {
    if (this.actualizarPrecioBase) {
      this.update();
    }
  }

  habilitar(precioBase: PrecioBaseJVDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar a este precio base?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.precioBaseService.habilitar(precioBase.precioBaseId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Precio base habilitado', life: 3000 });
              this.precioBaseList[this.findIndexById(precioBase.precioBaseId)].estado = 1;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deshabilitar(precioBase: PrecioBaseJVDTO) {
    this.confirmationService.confirm({
      message: '¿Desea inhabilitar a este precio base?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.precioBaseService.inhabilitar(precioBase.precioBaseId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Precio base inhabilitado', life: 3000 });
              this.precioBaseList[this.findIndexById(precioBase.precioBaseId)].estado = 0;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  update() {
    this.precioBaseDialog = false;
    this.precioBase.precioBaseId = this.precioBaseEdit.precioBaseId;
    this.precioBase.monto = this.montoIngresado;
    this.precioBase.fechaInicial = this.dateInicial;
    this.precioBase.fechaFinal = this.dateFinal;
    this.precioBase.grupoPrecioId = this.grupoPrecioSelected;
    this.precioBase.estado = 1;
    this.precioBase.usuarioCreacion = this.precioBaseEdit.usuarioCreacion;
    this.precioBase.fechaCreacion = this.precioBaseEdit.fechaCreacion;
    this.precioBase.usuarioModificacion = this.usuario;
    this.precioBase.fechaModificacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar este precio base?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.precioBaseService.update(this.precioBase).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El precio base fue actualizado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El precio base no fue actualizado correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El precio base no fue actualizado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  setEditPrecioBase(precioBaseEdit: any) {
    this.titleDialog = "Editar precio base";
    this.getAllGrupoPrecios();
    this.actualizarPrecioBase = true;
    this.precioBaseEdit = precioBaseEdit;
    this.montoIngresado = precioBaseEdit.monto;
    let dateInicial = this.formatDates(precioBaseEdit.fechaInicial)
    this.dateInicial = dateInicial;
    let dateFinal = this.formatDates(precioBaseEdit.fechaFinal)
    this.dateFinal = dateFinal;
    this.grupoPrecioSelected = precioBaseEdit.grupoPrecioId.grupoPrecioId;
    this.precioBaseDialog = true;
  }

  formatDates(date: string): any {
    var dateParts = date.split("-");
    let fecha = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    return fecha;
  }

  resetFechas() {
    this.dateInicial = new Date();
    this.dateFinal = new Date();
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.precioBaseList.length; i++) {
      if (this.precioBaseList[i].precioBaseId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  validarFechaInicial(fechaInicial: Date) {
    if (fechaInicial.getTime() < this.today) {
      return true;
    } else {
      return false
    }
  }

  validarFechaFinal(fechaFinal: Date) {
    if (fechaFinal.getTime() < this.today) {
      return true;
    } else {
      return false
    }
  }

  validarRangoFechas(dateInicial: Date, dateFinal: Date) {
    if (dateInicial.getTime() > dateFinal.getTime() ||
      dateFinal.getTime() < dateInicial.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  validarFechas(dateInicial: Date, dateFinal: Date) {
    if (dateInicial.getTime() == null || dateFinal.getTime() == null) {
      return true;
    } else {
      return false;
    }
  }

  hideDialog() {
    this.precioBaseDialog = false;
  }

  validOrInvalidBtn() {
  }

}
