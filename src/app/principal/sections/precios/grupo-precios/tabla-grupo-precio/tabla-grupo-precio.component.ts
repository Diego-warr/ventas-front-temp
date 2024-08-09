import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { LineaNegocioResponseDTO } from 'src/app/dto/LineaNegocioResponseDTO';
import { LineaNegocioService } from 'src/app/services/lineaNegocio.service';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { GrupoPrecioService } from 'src/app/services/grupo-precio.service';
import { GrupoPrecioJVDTO } from 'src/app/dto/GrupoPrecioJVDTO';
import { ZonaService } from 'src/app/services/zona.service';
import { ZonaJVDTO } from 'src/app/dto/ZonaJVDTO';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoPrecioJVBodyDTO } from 'src/app/dto/GrupoPrecioJVBodyDTO';
import { DataUserToken } from 'src/app/auth/data-user-token.service';

@Component({
  selector: 'app-tabla-grupo-precio',
  templateUrl: './tabla-grupo-precio.component.html',
  styleUrls: ['./tabla-grupo-precio.component.scss']
})
export class TablaGrupoPrecioComponent implements OnInit {

  usuario: string = "";

  grupoPrecioList: GrupoPrecioJVDTO[] = [];

  loading = false;

  filterName: string = "";

  descripcionInTable: string = "";

  grupoPrecioDialog = false;
  titleDialog: string = "";

  lineasNegocio: LineaNegocioResponseDTO[] = [];
  lineaNegocioSelected: number = 0;

  grupoPrecio: GrupoPrecioJVBodyDTO = { grupoPrecioId: 0, canalVentaId: 0, lineaNegocioId: 0, zonaId: 0, descripcion: "", estado: 1, usuarioCreacion: "", fechaCreacion: new Date(), usuarioModificacion: "", fechaModificacion: new Date() };

  canalesVenta: CanalVentaJVDTO[] = [];
  canalVentaSelected: number = 0;

  zonaList: ZonaJVDTO[] = [];
  zonaSelected: number = 0;

  actualizarGrupoPrecio = false;

  grupoPrecioEdit!: GrupoPrecioJVDTO;

  descripcion: string = "";

  @ViewChild('dtgrupoprecio') dtgrupoprecio: Table | undefined;

  constructor(private lineaNegocioService: LineaNegocioService,
    private dataUserToken: DataUserToken,
    private canalVentaService: CanalVentaService,
    private grupoPrecioService: GrupoPrecioService,
    private zonaService: ZonaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllLineaNegocio();
    this.getAllCanalesVenta();
    this.getAll();
    this.getAllZonas();
    this.usuario = this.dataUserToken.getUsuario();
  }

  getAll() {
    this.grupoPrecioService.getAll().subscribe(
      data => {
        this.grupoPrecioList = data.data!;
      }
    )
  }

  filtrarProductos(event: Event, stringVal: String) {
    this.dtgrupoprecio!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.titleDialog = "Nuevo grupo de precios"
    this.resetGrupoPrecio();
    this.actualizarGrupoPrecio = false;
    this.grupoPrecioDialog = true;
  }

  hideDialog() {
    this.resetGrupoPrecio();
    this.grupoPrecioDialog = false;
  }

  createGrupoPrecio() {
    this.grupoPrecioDialog = false;
    this.grupoPrecio.zonaId = this.zonaSelected!;
    this.grupoPrecio.canalVentaId = this.canalVentaSelected;
    this.grupoPrecio.lineaNegocioId = this.lineaNegocioSelected;
    this.grupoPrecio.descripcion = this.descripcion;
    this.grupoPrecio.estado = 1;
    this.grupoPrecio.usuarioCreacion = this.usuario;
    this.grupoPrecio.fechaCreacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un grupo precio nuevo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoPrecioService.create(this.grupoPrecio).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El grupo precio fue creado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo precio no fue creado correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo precio no fue creado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  updateGrupoPrecio() {
    this.grupoPrecioDialog = false;
    this.grupoPrecio.grupoPrecioId = this.grupoPrecioEdit.grupoPrecioId;
    this.grupoPrecio.zonaId = this.zonaSelected!;
    this.grupoPrecio.canalVentaId = this.canalVentaSelected;
    this.grupoPrecio.lineaNegocioId = this.lineaNegocioSelected;
    this.grupoPrecio.descripcion = this.descripcion;
    this.grupoPrecio.estado = 1;
    this.grupoPrecio.usuarioCreacion = this.grupoPrecioEdit.usuarioCreacion;
    this.grupoPrecio.fechaCreacion = this.grupoPrecioEdit.fechaCreacion;
    this.grupoPrecio.usuarioModificacion = this.usuario;
    this.grupoPrecio.fechaModificacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar este grupo precio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoPrecioService.update(this.grupoPrecio).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El grupo precio fue actualizado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo precio no fue actualizado correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo precio tiene error', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  createOrUpdateGrupoPrecio() {
    if (this.actualizarGrupoPrecio) {
      this.updateGrupoPrecio();
    } else {
      this.createGrupoPrecio();
    }
  }

  validOrInvalidBtn() {
  }

  onChangeLineaNegocio(e) {
  }

  onChangeCanalVenta(e) {
  }

  onChangeZona(e) {
  }

  getAllLineaNegocio() {
    this.lineaNegocioService.getAll().subscribe(
      data => {
        this.lineasNegocio = data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllCanalesVenta() {
    this.canalVentaService.getAll().subscribe(
      data => {
        this.canalesVenta = data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllZonas() {
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

  setEditGrupoPrecio(grupoPrecioEdit: GrupoPrecioJVDTO) {
    this.titleDialog = "Editar grupo precio";
    this.actualizarGrupoPrecio = true;
    this.resetGrupoPrecio();
    this.grupoPrecioEdit = grupoPrecioEdit;
    this.lineaNegocioSelected = grupoPrecioEdit.lineaNegocio.lineaNegocioId;
    this.canalVentaSelected = grupoPrecioEdit.canalVenta.canalVentaId;
    this.zonaSelected = grupoPrecioEdit.zona.zonaId;
    this.descripcion = grupoPrecioEdit.descripcion;
    this.grupoPrecioDialog = true;
  }

  resetGrupoPrecio() {
    this.grupoPrecio = {
      grupoPrecioId: 0,
      canalVentaId: 0,
      lineaNegocioId: 0,
      zonaId: 0,
      descripcion: "",
      estado: 1,
      usuarioCreacion: "",
      fechaCreacion: new Date(),
      usuarioModificacion: "",
      fechaModificacion: new Date()
    },

      this.lineaNegocioSelected = 0;
    this.canalVentaSelected = 0;
    this.zonaSelected = 0;
    this.descripcion = "";
  }

  habilitarGrupoPrecio(grupoPrecio: GrupoPrecioJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar a este grupo precio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoPrecioService.habilitar(grupoPrecio.grupoPrecioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Grupo precio habilitado', life: 3000 });
              this.grupoPrecioList[this.findIndexById(grupoPrecio.grupoPrecioId)].estado = 1;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deshabilitarGrupoPrecio(grupoPrecio: GrupoPrecioJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea inhabilitar a esta zona?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoPrecioService.inhabilitar(grupoPrecio.grupoPrecioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Grupo precio inhabilitado', life: 3000 });
              this.grupoPrecioList[this.findIndexById(grupoPrecio.grupoPrecioId)].estado = 0;
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
    for (let i = 0; i < this.grupoPrecioList.length; i++) {
      if (this.grupoPrecioList[i].grupoPrecioId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  setearDescripcionGrupoPrecio(descripcion: string) {
    var string = descripcion;
    var mayus = string.substring(0, 1).toUpperCase();
    var resto = string.substring(1, string.length).toLowerCase();
    let grupoPrecioDescripcion = mayus.concat(resto.toString());
    return this.descripcionInTable = grupoPrecioDescripcion;
  }

}
