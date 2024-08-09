import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataUserToken } from 'src/app/auth/data-user-token.service';
import { ZonaJVDTO } from 'src/app/dto/ZonaJVDTO';
import { ZonaService } from 'src/app/services/zona.service';

@Component({
  selector: 'app-tabla-zona',
  templateUrl: './tabla-zona.component.html',
  styleUrls: ['./tabla-zona.component.scss']
})
export class TablaZonaComponent implements OnInit {

  usuario: string = "";

  zonaList: ZonaJVDTO[] = [];
  loading = false;
  filterName!: string;

  zona: ZonaJVDTO = { zonaId: 0, nombre: "", secuencia: 0, estado: 1, usuarioCreacion: "", fechaCreacion: new Date(), usuarioModificacion: "", fechaModificacion: new Date() };

  zonasDialog = false;
  titleDialog!: string;

  actualizarZona = false;

  zonaEdit: ZonaJVDTO = { zonaId: 0, nombre: "", secuencia: 0, estado: 1, usuarioCreacion: "", fechaCreacion: new Date(), usuarioModificacion: "", fechaModificacion: new Date() };
  nombreZona: string = "";
  secuenciaZona!: number | null;

  @ViewChild('dtzonas') dtzonas: Table | undefined;

  constructor(private dataUserToken: DataUserToken,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private zonaService: ZonaService) { }

  ngOnInit(): void {
    this.usuario = this.dataUserToken.getUsuario();
    this.getAll();
  }

  getAll() {
    this.zonaService.getAll().subscribe(
      data => {
        this.zonaList = data.data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  create() {
    this.zonasDialog = false;
    this.zona.nombre = this.nombreZona;
    this.zona.secuencia = this.secuenciaZona!;
    this.zona.estado = 1;
    this.zona.usuarioCreacion = this.usuario;
    this.zona.fechaCreacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear una nueva zona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zonaService.create(this.zona).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.resetZona();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La zona fue creada correctamente', life: 3000 });
            } else {
              this.resetZona();
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La zona no fue creada porque ya existe', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La zona no fue creada', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
        this.resetZona();
      }
    });
  }

  update() {
    this.zonasDialog = false;
    this.zona.zonaId = this.zonaEdit.zonaId;
    this.zona.nombre = this.nombreZona;
    this.zona.secuencia = this.secuenciaZona!;
    this.zona.estado = 1;
    this.zona.usuarioCreacion = this.zonaEdit.usuarioCreacion;
    this.zona.fechaCreacion = this.zonaEdit.fechaCreacion;
    this.zona.usuarioModificacion = this.usuario;
    this.zona.fechaModificacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar la zona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zonaService.update(this.zona).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.resetZona();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La zona fue actualizada correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La zona no fue actualizada porque ya existe', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La zona no fue creada', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
        this.resetZona();
      }
    });
  }

  createOrUpdateZona() {
    if (this.actualizarZona) {
      this.update();
    } else {
      this.create();
    }
  }

  setEditZona(zonaEdit: ZonaJVDTO) {
    this.titleDialog = "Editar zona";
    this.resetZona();
    this.zonaEdit = zonaEdit;
    this.nombreZona = zonaEdit.nombre;
    this.secuenciaZona = zonaEdit.secuencia;
    this.actualizarZona = true;
    this.zonasDialog = true;
  }

  resetZona() {
    this.zona = {
      zonaId: 0,
      nombre: "",
      estado: 1,
      secuencia: 0,
      usuarioCreacion: "",
      fechaCreacion: new Date(),
      usuarioModificacion: "",
      fechaModificacion: new Date()
    }

    this.nombreZona = "";
    this.secuenciaZona = null;
  }

  filtrarZonas(event: Event, stringVal: String) {
    this.dtzonas!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.resetZona();
    this.titleDialog = "Agregar nueva zona";
    this.zonasDialog = true;
    this.actualizarZona = false;
  }

  hideDialog() {
    this.zonasDialog = false;
    this.resetZona();
  }

  habilitarZona(zona: ZonaJVDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar a esta zona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zonaService.habilitarZona(zona.zonaId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Zona habilitada', life: 3000 });
              this.zonaList[this.findIndexById(zona.zonaId)].estado = 1;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deshabilitarZona(zona: ZonaJVDTO) {
    this.confirmationService.confirm({
      message: '¿Desea inhabilitar a esta zona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.zonaService.inhabilitarZona(zona.zonaId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Zona inhabilitada', life: 3000 });
              this.zonaList[this.findIndexById(zona.zonaId)].estado = 0;
            }
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
    for (let i = 0; i < this.zonaList.length; i++) {
      if (this.zonaList[i].zonaId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  validarNombreZona(nombreZona: string) {
    if (nombreZona == null || nombreZona == "") {
      return true
    } else {
      return false;
    }
  }

  validarSecuenciaZona(secuenciaZona: number) {
    if (secuenciaZona == 0 || secuenciaZona == null) {
      return true
    } else {
      return false;
    }
  }

  validOrInvalidBtn(nombreZona: string, secuenciaZona: number): boolean {
    if (this.validarNombreZona(nombreZona) || this.validarSecuenciaZona(secuenciaZona)) {
      return true;
    }
    return false;
  }

}
