import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ArticuloResponseDTO } from 'src/app/dto/ArticuloResponseDTO';
import { DetallePlantillaListaPreciosDTO } from 'src/app/dto/DetallePlantillaListaPreciosDTO';
import { CanalVentaJVDTO } from 'src/app/dto/CanalVentaJVDTO';
import { LineaNegocioDTO } from 'src/app/dto/LineaNegocioDTO';
import { PlantillaListaPreciosBodyDTO } from 'src/app/dto/PlantillaListaPreciosBodyDTO';
import { PlantillaListaPreciosDTO } from 'src/app/dto/PlantillaListaPreciosDTO';
import { CanalVentaService } from 'src/app/services/canal-venta.service';
import { LineaNegocioService } from 'src/app/services/lineaNegocio.service';
import { PlantillaListaPreciosService } from 'src/app/services/plantilla-lista-precios.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Calendar } from 'primeng/calendar';
import { ActivatedRoute } from '@angular/router';
import {Table} from "primeng/table";

@Component({
  selector: 'app-tabla-plantilla-lista-precio',
  templateUrl: './tabla-plantilla-lista-precio.component.html',
  styleUrls: ['./tabla-plantilla-lista-precio.component.scss']
})
export class TablaPlantillaListaPrecioComponent implements OnInit {

  dateInicial!: Date | null;
  dateFinal!: Date | null;
  lineaNegocio!: number | null;
  canalVenta!: number | null;

  precioMinimo = 0;
  precioMaximo = 0;

  listaPlantillaId = 0;

  articulos: ArticuloResponseDTO[]=[];
  canalVentaList: CanalVentaJVDTO[]=[];
  lineasNegocioList: LineaNegocioDTO[]=[];

  productsFiltered: DetallePlantillaListaPreciosDTO[]=[];

  selectedProducts: DetallePlantillaListaPreciosDTO[]=[];

  articulosEditIn: DetallePlantillaListaPreciosDTO[]=[];

  plantillaListaPrecio!: PlantillaListaPreciosBodyDTO;

  plantillaPreciosList: PlantillaListaPreciosDTO[]=[];

  plantilla!: PlantillaListaPreciosDTO | undefined;

  actualizar = false;

  articulosEdit: ArticuloResponseDTO[]=[];

  detallePlantillaListaPrecioList: DetallePlantillaListaPreciosDTO[]=[];

  precioBase : number = 0.0
  rangoSuperior : number=0.0
  rangoInferior : number = 0.0



  checked!: boolean;

  @ViewChild('dateIni') calendarIni: Calendar | undefined;
  @ViewChild('dateFin') calendarFin: Calendar | undefined;

  constructor(private lineaNegocioService: LineaNegocioService,
              protected activateRoute: ActivatedRoute,
              private canalVentaService: CanalVentaService,
              private productService: ProductosService,
              private plantillaListaPrecioService: PlantillaListaPreciosService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.listaPlantillaId = Number(params.get("idPlantilla"));
    });
    console.log("id", this.listaPlantillaId)

    this.inizializeObject();
    this.getAllProducts();
    this.getAllCanalesVenta();
    this.getAllLineaNegocio();

    if (this.listaPlantillaId == 0) {
      this.actualizar = false;
    } else {
      this.actualizar = true;
      this.getAllPlantillaListaPrecios();
    }
  }

  inizializeObject() {
    this.plantillaListaPrecio = {plantillaListaPreciosId:0, descripcion:"", fechaInicio:new Date, fechaFin: new Date, estado:1, lineaNegocioJVId:0, canalVentaJVId:0,precioBase:0, rangoSuperior:0,rangoInferior:0,detallesListaPrecios: []};
    this.plantilla = {plantillaListaPreciosId:0, descripcion:"", codigoArticulo:"", fechaInicio:new Date, fechaFin: new Date, estado:1, canalVentaJVId:null,precioBase:0.0,rangoInferior:0.0,rangoSuperior:0.0, lineaNegocioJVId:null, detallesListaPrecios: []};
  }

  getAllLineaNegocio() {
    this.lineaNegocioService.getAll().subscribe(
      data => {
        this.lineasNegocioList = data!;
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
        this.canalVentaList = data;
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  getAllProducts() {
    this.productService.allArticulos().subscribe(
      data => {
        if (data.status == "OK") {
          this.articulos = data.data!;
        }
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  onChangeLineaNegocio(event) {
    let articulosByLineaId = this.articulos.filter(p => p.lineaNegocioId?.lineaNegocioId! === event.value);
    this.setArticulosInModel(articulosByLineaId);
    this.selectedProducts=[];
  }

  setArticulosInModel(articulosByLineaId: ArticuloResponseDTO[]) {
    let articulosFiltered = articulosByLineaId.map(a =>
      <DetallePlantillaListaPreciosDTO> {
        detallePlantillaListaPreciosId: 0,
        articuloId: a.articuloId,
        nombreArticulo: a.descripcionArticulo,
        codigoArticulo: a.codigoArticulo,
        precioMinimo: 0,
        precioMaximo: 0,
        plantillaListaPreciosId : 0,
    });
    this.productsFiltered = articulosFiltered;
  }

  onChangeCanalVenta(event) {
    //console.log("EVENT CANAL VENTA", event)
  }

  setPlantillaToSave() {

    let lineaCanal = this.setLineaNegocioCanalVenta();
    this.plantillaListaPrecio!.descripcion = lineaCanal!;
    this.plantillaListaPrecio.fechaInicio = this.dateInicial!;
    this.plantillaListaPrecio.fechaFin = this.dateFinal!;
    this.plantillaListaPrecio.lineaNegocioJVId = this.lineaNegocio!;
    this.plantillaListaPrecio.canalVentaJVId = this.canalVenta!;
    this.plantillaListaPrecio.estado = 1;
    this.plantillaListaPrecio.detallesListaPrecios = this.productsFiltered;
    this.setProductsInArrayDetalleListaPreciosToEdit();
    console.log("PLANTILLA PRECIO TO SAVE", this.plantillaListaPrecio)
  }

  setLineaNegocioCanalVenta() {
    let linea;
    linea = this.lineasNegocioList.filter(ln => ln.lineaNegocioId === this.lineaNegocio).map(ln => linea = ln.lineaNegocioNombre);
    let canal;
    canal = this.canalVentaList.filter(cv => cv.canalVentaId === this.canalVenta).map(cv => canal = cv.canalVentaDescripcion)
    return linea+ ' - ' +canal;
  }

  resetDataPlantilla() {
    this.lineaNegocio = null;
    this.canalVenta = null;
    this.dateInicial = null;
    this.dateFinal = null;
    this.selectedProducts=[];
  }

  getAllPlantillaListaPrecios() {
    this.plantillaListaPrecioService.getAll().subscribe(
      data => {
        if (data.status =='OK') {
          console.log("plantilla_from_service", data)
          this.plantillaPreciosList = data.data!;
        }
        if (this.actualizar) {
          this.plantillaById();
        }
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  plantillaById() {
    this.plantilla = this.plantillaPreciosList.find(plp => plp.plantillaListaPreciosId === this.listaPlantillaId);
    let fechaInicio = this.formatDates(this.plantilla?.fechaInicio);
    let fechaFin = this.formatDates(this.plantilla!.fechaFin!);
    this.dateInicial = fechaInicio;
    this.dateFinal = fechaFin;
    this.lineaNegocio = this.plantilla!.lineaNegocioJVId!.lineaNegocioId!;
    this.canalVenta= this.plantilla!.canalVentaJVId!.canalVentaId!;
    this.precioBase= this.plantilla?.precioBase!!
    this.rangoSuperior=this.plantilla?.rangoSuperior!!
    this.rangoInferior = this.plantilla?.rangoInferior!!
    this.getAllDetallesArticulosToEdit();
  }

  getAllDetallesArticulosToEdit() {
    this.productService.allArticulos().subscribe(
      data => {
        if (data.status == "OK") {
          this.articulosEdit = data.data!;
          this.selectedProducts=[];
          console.log("plantilla_",this.plantilla)
          this.plantilla!.detallesListaPrecios.forEach(dp => {
            this.selectedProducts.push(dp);
          });
          this.articulosEditIn = this.selectedProducts;
          let productFilteredEdit = this.articulosEdit.filter(p => p.lineaNegocioId?.lineaNegocioId! == this.plantilla!.lineaNegocioJVId?.lineaNegocioId!);
          let detallesProduc = productFilteredEdit.map(pf =>
            <DetallePlantillaListaPreciosDTO> {
              detallePlantillaListaPreciosId: 0,
              articuloId: pf.articuloId,
              codigoArticulo: pf.codigoArticulo,
              nombreArticulo: pf.descripcionArticulo,
              precioMinimo: 0.0,
              precioMaximo: 0,
              plantillaListaPreciosId:0,
            }
          );
          console.log("detalles_",this.articulosEditIn)
          this.productsFiltered = detallesProduc;
          this.productsFiltered.map(pf => {
            this.selectedProducts.find(sp => {
                if (pf.articuloId === sp.articuloId) {
                  pf.precioMinimo = sp.precioMinimo;
                  pf.precioMaximo = sp.precioMaximo;
                  pf.precioBase=sp.precioBase
                  pf.detallePlantillaListaPreciosId=sp.detallePlantillaListaPreciosId
                }
            })
          })
        }
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  savePlantilla() {
    if (this.actualizar) {
      this.setPlantillaToEdit();
      this.confirmationService.confirm({
        message: '¿Está seguro(a) de actualizar la plantilla de precios?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.plantillaListaPrecioService.update(this.plantillaListaPrecio).subscribe(
            data => {
              if (data.status == "OK") {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plantilla de lista de precios ha sido actualizada correctamente', life: 3000 });
              }
              this.resetDataPlantilla();
            },
            error => {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ha ocurrido un error al actualizar la plantilla de lista de precios', life: 3000 });
              console.log(error);
              this.resetDataPlantilla();
            }
          );
          this.resetDataPlantilla();
        },
        reject: () => {
          this.resetDataPlantilla();
        }
      });
    } else {
      this.setPlantillaToSave();
      this.confirmationService.confirm({
        message: '¿Está seguro(a) de crear la plantilla de precios?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.plantillaListaPrecioService.create(this.plantillaListaPrecio).subscribe(
            data => {
              if (data.status == "OK") {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Plantilla de lista de precios creada correctamente', life: 3000 });
              }
              this.resetDataPlantilla();
            },
            error => {
              this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Ha ocurrido un error al crear la plantilla de lista de precios', life: 3000 });
              console.log(error);
              this.resetDataPlantilla();
            }
          );
          this.resetDataPlantilla();
        },
        reject: () => {
          this.resetDataPlantilla();
        }
      });
    }
  }

  disabledBtnGuardar()  : boolean{
    if (this.dateInicial == null || this.dateFinal == null || this.lineaNegocio == null || this.canalVenta == null ) {
      return true;
    } else {
      return false;
    }
  }

  setPlantillaToEdit() {
    this.setProductsInArrayDetalleListaPreciosToEdit();
    this.plantillaListaPrecio.plantillaListaPreciosId = this.listaPlantillaId;
    this.plantillaListaPrecio.descripcion = this.plantilla!.descripcion;
    this.plantillaListaPrecio.fechaInicio = this.dateInicial!;
    this.plantillaListaPrecio.fechaFin = this.dateFinal!;
    this.plantillaListaPrecio.canalVentaJVId = this.canalVenta!;
    this.plantillaListaPrecio.lineaNegocioJVId = this.lineaNegocio!;
    this.plantillaListaPrecio.estado = 1;
    this.plantillaListaPrecio.detallesListaPrecios = this.detallePlantillaListaPrecioList;
    this.plantillaListaPrecio.precioBase=this.precioBase
    this.plantillaListaPrecio.rangoInferior= this.rangoInferior
    this.plantillaListaPrecio.rangoSuperior = this.rangoSuperior
    console.log("PLANTILLA PRECIO TO EDIT", this.plantillaListaPrecio)
  }

  setProductsInArrayDetalleListaPreciosToEdit() {
    let plantillaToGetIdPlantilla: any;
    let plantillaListaPreciosId: number
    plantillaToGetIdPlantilla = this.productsFiltered.find(sp => sp.plantillaListaPreciosId != 0);
    plantillaListaPreciosId = plantillaToGetIdPlantilla?.plantillaListaPreciosId;
    console.log("datos_filtrado", this.productsFiltered)
    let detalles: any = this.productsFiltered.map(det =>
        <DetallePlantillaListaPreciosDTO> {
          nombreArticulo: det.nombreArticulo,
          articuloId: det.articuloId,
          precioMinimo: Number(det.precioMinimo),
          precioMaximo: Number(det.precioMaximo),
          codigoArticulo: det.codigoArticulo,
          precioBase : det.precioBase,
          plantillaListaPreciosId: plantillaListaPreciosId,
          detallePlantillaListaPreciosId:det.detallePlantillaListaPreciosId,
        }
    );
    this.detallePlantillaListaPrecioList=[];
    this.detallePlantillaListaPrecioList = detalles;
  }

  formatDates(date: any): any {
    var dateParts = date.split("-");
    let fecha = new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
    return fecha;
  }

  calcularRangos(){
    this.plantillaListaPrecio.precioBase=this.precioBase
    this.plantillaListaPrecio.rangoInferior= this.rangoInferior
    this.plantillaListaPrecio.rangoSuperior = this.rangoSuperior

    for(let i =0; i<this.productsFiltered.length; i++){
      this.productsFiltered[i].precioMaximo=this.precioBase.valueOf() + this.rangoSuperior.valueOf()
      this.productsFiltered[i].precioMinimo=this.precioBase - this.rangoInferior
      this.productsFiltered[i].precioBase= this.precioBase
    }
  }

  clear(table: Table) {
    table.clear();
  }

}
