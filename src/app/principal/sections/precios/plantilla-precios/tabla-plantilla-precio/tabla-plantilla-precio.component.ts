import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataUserToken } from 'src/app/auth/data-user-token.service';
import { GrupoPrecioJVDTO } from 'src/app/dto/GrupoPrecioJVDTO';
import { PlantillaPrecioJVBodyDTO } from 'src/app/dto/PlantillaPrecioJVBodyDTO';
import { PlantillaPrecioJVResponseDTO } from 'src/app/dto/PlantillaPrecioJVResponseDTO';
import { GrupoPrecioService } from 'src/app/services/grupo-precio.service';
import { PlantillaPreciosService } from 'src/app/services/plantilla-precios.service';

@Component({
  selector: 'tabla-plantilla-precio',
  templateUrl: './tabla-plantilla-precio.component.html',
  styleUrls: ['./tabla-plantilla-precio.component.scss']
})
export class TablaPlantillaPrecioComponent implements OnInit {

  usuario: string = "";

  filterName: string = "";

  plantillaPrecioList: PlantillaPrecioJVResponseDTO[]=[];

  grupoPreciosList: GrupoPrecioJVDTO[] = [];

  plantillaPrecio!: PlantillaPrecioJVBodyDTO;

  plantillaPrecioEdit!: PlantillaPrecioJVResponseDTO;

  plantillaDialog = false;
  titleDialog: string = "";

  actualizarPlantilla = false;

  selectedGrupoPrecio: number = 0;
  valMinimoIngresado: number = 0;
  valMaximoIngresado: number = 0;
  factXcantidadaIngresado!: number | null;

  @ViewChild('dtplantilla') dtplantilla: Table | undefined;

  constructor(private plantillaService: PlantillaPreciosService,
              private dataUserToken: DataUserToken,
              private messageService: MessageService,
              private grupoPreciosService: GrupoPrecioService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.usuario = this.dataUserToken.getUsuario();
    this.getAll();
    this.plantillaPrecio = {plantillaPrecioId:0,
                            grupoPrecioId:0,
                            valorMinimo:0,
                            valorMaximo:0,
                            factorXcantidad:0,
                            estado: 1,
                            usuarioCreacion:"",
                            fechaCreacion:new Date,
                            usuarioModificacion:"",
                            fechaModificacion:new Date};
  }

  resetPlantillaPrecio() {
    this.plantillaPrecio = {
      plantillaPrecioId:0,
      grupoPrecioId:0,
      valorMinimo:0,
      valorMaximo:0,
      factorXcantidad:0,
      estado: 1,
      usuarioCreacion:"",
      fechaCreacion:new Date,
      usuarioModificacion:"",
      fechaModificacion:new Date
    };

    this.selectedGrupoPrecio = 0;
    this.valMinimoIngresado = 0;
    this.valMaximoIngresado = 0;
    this.factXcantidadaIngresado = null;
  }

  getAll() {
    this.plantillaService.getAll().subscribe(
      data => {
        if(data.status == "OK") {
          this.plantillaPrecioList = data.data!;
        }
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El grupo precio no fue creado', life: 3000 });
      }
    )
  }

  getAllGrupoPrecios() {
    this.grupoPreciosService.getAll().subscribe(
      data => {
        this.grupoPreciosList = data.data!;
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  filtrarPlantillaPrecio(event: Event, stringVal: String) {
    this.dtplantilla!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  setEditPlantilla(plantillaEdit: PlantillaPrecioJVResponseDTO) {
    this.getAllGrupoPrecios();
    this.titleDialog = "Editar plantilla de precio";
    this.actualizarPlantilla = true;
    this.resetPlantillaPrecio();
    this.plantillaPrecioEdit = plantillaEdit;
    this.selectedGrupoPrecio = plantillaEdit.grupoPrecioId.grupoPrecioId;
    this.valMinimoIngresado = plantillaEdit.valorMinimo;
    this.valMaximoIngresado = plantillaEdit.valorMaximo;
    this.factXcantidadaIngresado = plantillaEdit.factorXcantidad;
    this.plantillaDialog = true;
  }

  createOrUpdatePlantilla() {
    if (this.actualizarPlantilla) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.plantillaDialog = false;
    this.plantillaPrecio.grupoPrecioId = this.selectedGrupoPrecio
    this.plantillaPrecio.valorMinimo = this.valMinimoIngresado;
    this.plantillaPrecio.valorMaximo = this.valMaximoIngresado;
    this.plantillaPrecio.factorXcantidad = this.factXcantidadaIngresado!;
    this.plantillaPrecio.usuarioCreacion = this.usuario;
    this.plantillaPrecio.fechaCreacion = new Date;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de crear una nueva plantilla de precios?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plantillaService.create(this.plantillaPrecio).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La plantilla fue creada correctamente', life: 3000 });
              } else {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La plantilla no fue creada correctamente', life: 3000 });
              }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La plantilla no fue creada debido a un error', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  update() {
    this.plantillaDialog = false;
    this.plantillaPrecio.plantillaPrecioId = this.plantillaPrecioEdit.plantillaPrecioId;
    this.plantillaPrecio.grupoPrecioId = this.selectedGrupoPrecio;
    this.plantillaPrecio.valorMinimo = this.valMinimoIngresado;
    this.plantillaPrecio.valorMaximo = this.valMaximoIngresado;
    this.plantillaPrecio.factorXcantidad = this.factXcantidadaIngresado!;
    this.plantillaPrecio.estado = 1;
    this.plantillaPrecio.usuarioCreacion = this.plantillaPrecioEdit.usuarioCreacion;
    this.plantillaPrecio.fechaCreacion = this.plantillaPrecioEdit.fechaCreacion;
    this.plantillaPrecio.usuarioModificacion = this.usuario;
    this.plantillaPrecio.fechaModificacion = new Date();
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar esta plantilla de precio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plantillaService.update(this.plantillaPrecio).subscribe(
          data => {
            console.log(data);
            if (data.status == "OK") {
              this.getAll();
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La plantilla de precio fue actualizada correctamente', life: 3000 });
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La plantilla de precio no fue actualizada correctamente', life: 3000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'La plantilla de precio fue actualizada', life: 3000 });
          }
        );
      },
      reject: () => {
        this.getAll();
      }
    });
  }

  habilitar(plantillaPrecio: PlantillaPrecioJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea habilitar esta plantilla de precio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plantillaService.habilitar(plantillaPrecio.plantillaPrecioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Plantilla de precio habilitada', life: 3000 });
              this.plantillaPrecioList[this.findIndexById(plantillaPrecio.plantillaPrecioId)].estado = 1;
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  deshabilitar(plantillaPrecio: PlantillaPrecioJVBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Desea inhabilitar esta plantilla de precio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.plantillaService.inhabilitar(plantillaPrecio.plantillaPrecioId).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Plantilla de precio inhabilitada', life: 3000 });
              this.plantillaPrecioList[this.findIndexById(plantillaPrecio.plantillaPrecioId)].estado = 0;
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
    for (let i = 0; i < this.plantillaPrecioList.length; i++) {
      if (this.plantillaPrecioList[i].plantillaPrecioId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onSelectedDates() {
  }

  openNew() {
    this.getAllGrupoPrecios();
    this.resetPlantillaPrecio();
    this.titleDialog = "Nueva plantilla de precios"
    this.actualizarPlantilla = false;
    this.plantillaDialog = true;
  }

  onChangeFiltroSelect(e) {
  }


  hideDialog() {
    this.plantillaDialog = false;
  }


  validOrInvalidBtn() {
  }

  onChangeGrupoPrecio(e) {
  }

}
