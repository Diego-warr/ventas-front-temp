import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LineaNegocioJVDTO } from 'src/app/dto/LineaNegocioJVDTO';
import { LineaNegocioService } from 'src/app/services/lineaNegocio.service';

@Component({
  selector: 'app-tabla-linea-negocio',
  templateUrl: './tabla-linea-negocio.component.html',
  styleUrls: ['./tabla-linea-negocio.component.scss']
})
export class LineaNegocioComponent implements OnInit {

  loadingLineas = false;
  filterName!: string;

  lineasNegocioList!: LineaNegocioJVDTO[];
  lineaNegocio!: LineaNegocioJVDTO;

  estadoConvert!: String;

  lineaNegocioDialog: boolean = false;
  titleDialog!: string;

  disableEstado = true;

  actualizarLinea = false;
  estadoDefectoActualizar!: string;

  @ViewChild('dtLineas') dtLineas: Table | undefined;

  constructor(private lineaNegocioService: LineaNegocioService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.lineaNegocioService.getAll().subscribe(
      data => {
        this.lineasNegocioList = data;
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  filtrarLineas(event: Event, stringVal: String) {
    this.dtLineas!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  setEditLinea(linea: LineaNegocioJVDTO) {
    this.titleDialog = "EDITAR LINEA DE NEGOCIO";
    this.lineaNegocio = linea;
    this.estadoDefectoActualizar = linea.lineaNegocioStatus;
    this.convertEstadoLinea(linea.lineaNegocioStatus);
    this.actualizarLinea = true;
    this.openDialogToUpdate();
  }

  convertEstadoLinea(estado: String) {
    if(estado == 'A') {
      this.estadoConvert = "Habilitado";
    } else {
      this.estadoConvert = "Inhabilitado";
    }
  }

  openDialogToUpdate() {
    this.lineaNegocioDialog = true;
  }

  deshabilitarLinea(linea: LineaNegocioJVDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar esta linea de negocio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lineaNegocioService.inhabilitar(linea.lineaNegocioId).subscribe(
          data => {
              this.lineasNegocioList[this.findIndexById(linea.lineaNegocioId)].lineaNegocioStatus = "I"
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Linea de negocio inhabilitada', life: 3000 });
      }
    });
  }

  habilitarLinea(linea: LineaNegocioJVDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de habilitar esta linea de negocio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lineaNegocioService.habilitar(linea.lineaNegocioId).subscribe(
          data => {
              this.lineasNegocioList[this.findIndexById(linea.lineaNegocioId)].lineaNegocioStatus = "A"
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Linea de negocio habilitada', life: 3000 });
      }
    });
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.lineasNegocioList.length; i++) {
      if (this.lineasNegocioList[i].lineaNegocioId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.getAll();
    this.lineaNegocioDialog = false;
  }

  validOrInvalidBtn(): boolean {
    if(this.lineaNegocio.lineaNegocioNombre == "" || this.lineaNegocio.lineaNegocioNombre == null) {
      return true;
    } else {
      return false;
    }
  }

  onCreateOrUpdateLinea(lineaNegocio: LineaNegocioJVDTO) {
    if (this.actualizarLinea) {
      this.updateLineaNegocio(lineaNegocio);
    } else {
      this.createLineaNegocio(lineaNegocio);
    }
  }

  openNew() {
    this.titleDialog = "NUEVA LINEA DE NEGOCIO";
    this.resetLineaNegocio();
    this.estadoConvert = "Habilitado";
    this.actualizarLinea = false;
    this.lineaNegocioDialog = true;
  }

  resetLineaNegocio() {
    this.lineaNegocio = {
      lineaNegocioId : 0,
      lineaNegocioNombre: "",
      familiaTipo: "",
      lineaNegocioStatus: "",
    };
  }

  createLineaNegocio(lineaNegocio: LineaNegocioJVDTO) {
    this.lineaNegocioDialog = false;
    lineaNegocio.lineaNegocioStatus = "A";
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear una nueva linea de negocio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lineaNegocioService.create(lineaNegocio).subscribe(
          data => {
              this.getAll();
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Linea de Negocio creada correctamente', life: 3000 });
      },
      reject: () => {
        this.resetLineaNegocio();
        this.getAll();
      }
    });
  }

  updateLineaNegocio(lineaNegocio: LineaNegocioJVDTO) {
    this.lineaNegocioDialog = false;
    lineaNegocio.lineaNegocioStatus = this.estadoDefectoActualizar;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar la linea de negocio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lineaNegocioService.update(lineaNegocio).subscribe(
          data => {
              this.getAll();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Linea de Negocio no ha sido actualizada', life: 3000 });
            console.log(error);
            return "Error";
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Linea de Negocio actualizada correctamente', life: 3000 });
      },
      reject: () => {
        this.resetLineaNegocio();
        this.getAll();
      }
    });
  }

}
