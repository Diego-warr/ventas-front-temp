import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataUserToken } from 'src/app/auth/data-user-token.service';
import { ArticuloResponseDTO } from 'src/app/dto/ArticuloResponseDTO';
import { GrupoArticuloJVBodyDTO } from 'src/app/dto/GrupoArticuloJVBodyDTO';
import { GrupoArticuloJVDTO } from 'src/app/dto/GrupoArticuloJVDTO';
import { GrupoPrecioJVDTO } from 'src/app/dto/GrupoPrecioJVDTO';
import { GrupoArticuloService } from 'src/app/services/grupo-articulo.service';
import { GrupoPrecioService } from 'src/app/services/grupo-precio.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-tabla-grupo-articulo',
  templateUrl: './tabla-grupo-articulo.component.html',
  styleUrls: ['./tabla-grupo-articulo.component.scss']
})
export class TablaGrupoArticuloComponent implements OnInit {

  usuario: string = "";

  grupoArticuloList: GrupoArticuloJVDTO[] = [];

  grupoArticulo!: GrupoArticuloJVBodyDTO;

  grupoArticuloDialog = false;

  productsList: ArticuloResponseDTO[] = [];

  titleDialog!: string;

  grupoPrecioSelected: number = 0;
  articuloSelected: number = 0;
  secuenciaIngresada: number = 0;
  factorXcalidadIngresada: number = 0;

  grupoPrecioList: GrupoPrecioJVDTO[] = [];

  grupoPrecioDescripcionInTable: string = "";

  actualizarGrupoArticulo = false;

  grupoArticuloEdit!: GrupoArticuloJVDTO;

  filterName: string = "";

  @ViewChild('dtgrupoart') dtgrupoart: Table | undefined;

  constructor(private dataUserToken: DataUserToken,
    private grupoArticuloServie: GrupoArticuloService,
    private confirmationService: ConfirmationService,
    private productService: ProductosService,
    private grupoPrecioService: GrupoPrecioService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getArticulosActivos();
    this.getAll();
    this.usuario = this.dataUserToken.getUsuario();
    this.grupoArticulo = {
      grupoArticuloId: 0,
      grupoPrecioId: 0,
      articuloId: 0,
      secuencia: 0,
      factorxcalidad: 0,
      estado: 1,
      usuarioCreacion: "",
      fechaCreacion: new Date,
      usuarioModificacion: "",
      fechaModificacion: new Date
    }
  }

  getAll() {
    this.grupoArticuloServie.getAll().subscribe(
      data => {
        this.grupoArticuloList = data.data!;
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

  getArticulosActivos() {
    this.productService.getArticulosActivos().subscribe(
      data => {
        this.productsList = data.data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  openNew() {
    this.titleDialog = "Nuevo Grupo Artículo";
    this.resetGrupoArticulo();
    this.getAllGrupoPrecios();
    this.getArticulosActivos();
    this.actualizarGrupoArticulo = false;
    this.grupoArticuloDialog = true;
  }

  onChangeSelectGrupoPrecio(e) {
  }

  onChangeSelectArticulo(e) {
  }

  hideDialog() {
    this.grupoArticuloDialog = false;
  }

  validOrInvalidBtn() {
  }

  resetGrupoArticulo() {
    this.grupoArticulo = {
      grupoArticuloId: 0,
      grupoPrecioId: 0,
      articuloId: 0,
      secuencia: 0,
      factorxcalidad: 0,
      estado: 1,
      usuarioCreacion: "",
      fechaCreacion: new Date,
      usuarioModificacion: "",
      fechaModificacion: new Date
    }

    this.grupoPrecioSelected = 0;
    this.articuloSelected = 0;
    this.secuenciaIngresada = 0;
    this.factorXcalidadIngresada = 0;
  }

  setearDescripcionGrupoPrecio(descripcion: string) {
    var string = descripcion;
    var mayus = string.substring(0, 1).toUpperCase();
    var resto = string.substring(1, string.length).toLowerCase();
    let grupoPrecioDescripcion = mayus.concat(resto.toString());
    return this.grupoPrecioDescripcionInTable = grupoPrecioDescripcion;
  }

  setEditGrupoArticulo(grupoArticuloEdit: GrupoArticuloJVDTO) {
    this.titleDialog = "Editar grupo articulo";
    this.actualizarGrupoArticulo = true;
    this.resetGrupoArticulo();
    this.grupoArticuloEdit = grupoArticuloEdit;
    this.grupoPrecioSelected = grupoArticuloEdit.grupoPrecioId.grupoPrecioId;
    this.articuloSelected = grupoArticuloEdit.articuloId.articuloId;
    this.secuenciaIngresada = grupoArticuloEdit.secuencia;
    this.factorXcalidadIngresada = grupoArticuloEdit.factorxcalidad;
    this.grupoArticuloDialog = true;
  }

  create() {
    this.grupoArticuloDialog = false;
    this.grupoArticulo.grupoPrecioId = this.grupoPrecioSelected;
    this.grupoArticulo.articuloId = this.articuloSelected;
    this.grupoArticulo.secuencia = this.secuenciaIngresada;
    this.grupoArticulo.factorxcalidad = this.factorXcalidadIngresada;
    this.grupoArticulo.usuarioCreacion = this.usuario;
    this.grupoArticulo.fechaCreacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear un grupo articulo nuevo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoArticuloServie.create(this.grupoArticulo).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El grupo artículo fue creado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo artículo no fue creado correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo artículo no fue creado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  update() {
    this.grupoArticuloDialog = false;
    this.grupoArticulo.grupoArticuloId = this.grupoArticuloEdit.grupoArticuloId;
    this.grupoArticulo.grupoPrecioId = this.grupoPrecioSelected;
    this.grupoArticulo.articuloId = this.articuloSelected;
    this.grupoArticulo.secuencia = this.secuenciaIngresada;
    this.grupoArticulo.factorxcalidad = this.factorXcalidadIngresada;
    this.grupoArticulo.estado = 1;
    this.grupoArticulo.usuarioCreacion = this.grupoArticuloEdit.usuarioCreacion;
    this.grupoArticulo.fechaCreacion = this.grupoArticuloEdit.fechaCreacion;
    this.grupoArticulo.usuarioModificacion = this.usuario;
    this.grupoArticulo.fechaModificacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar este grupo articulo ?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoArticuloServie.update(this.grupoArticulo).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El grupo artículo fue actualizado correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo artículo no fue actualizado correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo artículo no fue actualizado', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  createOrUpdateGrupoArticulo() {
    if (this.actualizarGrupoArticulo) {
      this.update();
    } else {
      this.create();
    }
  }

  habilitarGrupoArticulo(grupoArticulo: GrupoArticuloJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar a este grupo articulo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoArticuloServie.habilitar(grupoArticulo.grupoArticuloId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Grupo articulo habilitado', life: 3000 });
              this.grupoArticuloList[this.findIndexById(grupoArticulo.grupoArticuloId)].estado = 1;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deshabilitarGrupoArticulo(grupoArticulo: GrupoArticuloJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea inhabilitar a este grupo articulo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoArticuloServie.inhabilitar(grupoArticulo.grupoArticuloId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Grupo articulo inhabilitado', life: 3000 });
              this.grupoArticuloList[this.findIndexById(grupoArticulo.grupoArticuloId)].estado = 0;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  filtrarGrupoArticulo(event: Event, stringVal: String) {
    this.dtgrupoart!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.grupoArticuloList.length; i++) {
      if (this.grupoArticuloList[i].grupoArticuloId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
