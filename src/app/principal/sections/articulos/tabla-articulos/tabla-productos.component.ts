import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ArticuloBodyDTO } from 'src/app/dto/ArticuloBodyDTO';
import { ArticuloPrecioJVDTO } from 'src/app/dto/ArticuloPrecioJVDTO';
import { ArticuloResponseDTO } from 'src/app/dto/ArticuloResponseDTO';
import { LineaNegocioResponseDTO } from 'src/app/dto/LineaNegocioResponseDTO';
import { LineaNegocioService } from 'src/app/services/lineaNegocio.service';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TablaProductosComponent implements OnInit {

  products: ArticuloResponseDTO[] = [];
  lineasNegocio!: LineaNegocioResponseDTO[];
  lineaNegocioFromProduct!: number | undefined;

  totalElements: number = 0;
  totalPages: number = 0;
  page = 0;
  size = 10;
  disabledDescripcion = true;
  disabledButton = false;

  loadingProductos = true;
  productDialog: boolean = false;
  actualizarProducto = false;

  dateInicial = new Date();
  dateFinal = new Date();
  today = new Date().setHours(0, 0, 0, 0);

  filterName!: string;

  spinnerOn = false;

  @ViewChild('dt1') dt1: Table | undefined;

  constructor(private productService: ProductosService,
    private lineaNegocioService: LineaNegocioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllLineaNegocio();
  }

  product: ArticuloBodyDTO = {
    codigoArticulo: '',
    descripcionArticulo: '',
    precio: 0,
    precioMinimo: 0,
    codigoBarras: '',
    articuloCuentaIngreso: '',
    articulocuentaSalida: '',
    status: '',
    //lineaNegocioId: ,
    fechaInicial: new Date,
    fechaFinal: new Date,
    articuloId: 0
  }

  articuloPrecio: ArticuloPrecioJVDTO = {
    precioStandar: 0,
    precioMinimo: 0,
    fechaInicial: new Date,
    fechaFinal: new Date,
    status: '',
  }

  getArticulosActivos() {
    this.productService.getArticulosActivos().subscribe(
      data => {
        this.products = data.data!;
        this.loadingProductos = false;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  getAllProducts() {
    this.productService.allArticulos().subscribe(
      data => {
        this.products = data.data!;
        this.loadingProductos = false;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
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

  updateArticuloLineaNegocio(lineaNegocio: number, articuloId: number) {
    this.productDialog = false;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar unicamente la linea de negocio de este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.updateArticuloLineaNegocioId(lineaNegocio, articuloId).subscribe(
          data => {
            if (data.status == "OK") {
              this.getAllProducts();
              this.resetProducto();
              this.resetArticuloPrecio();
              this.actualizarProducto = false;
              this.hideDialog();
              this.resetFechas();
            }
          },
          error => {
            console.log(error);
            return "Error";
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Linea de negocio del producto actualizada', life: 3000 });
      },
      reject: () => {
        this.getAllProducts();
        this.resetProducto();
      }
    });
  }

  onChangeLineaNegocio(e) {
  }

  verificarVencimientoFecha(fechaFinal: Date): String {
    let hoy = new Date(this.today);
    let mismoDiaEnMillisegundos = 0 * 0 * 0 * 0 * 0;
    let unDiaEnMillisegundos = 1000 * 60 * 60 * 24 * 1;
    let dosDiasEnMillisegundos = 1000 * 60 * 60 * 24 * 2;
    let tresDiasEnMillisegundos = 1000 * 60 * 60 * 24 * 3;
    let fechaFinalRegistro = new Date(fechaFinal);
    let ultimoDia = fechaFinalRegistro.getTime();
    let mismoDia = new Date(ultimoDia - mismoDiaEnMillisegundos);
    let unDiaFaltante = new Date(ultimoDia - unDiaEnMillisegundos);
    let dosDiaFaltantes = new Date(ultimoDia - dosDiasEnMillisegundos);
    let tresDiaFaltantes = new Date(ultimoDia - tresDiasEnMillisegundos);
    if (hoy.getTime() == unDiaFaltante.getTime() || hoy.getTime() == mismoDia.getTime()) {
      return "IGUALES";
    } else if (hoy.getTime() == dosDiaFaltantes.getTime()) {
      return "DOSDIAS";
    } else if (hoy.getTime() == tresDiaFaltantes.getTime()) {
      return "TRESDIAS";
    } else {
      return "";
    }
  }

  setEditProducto(productoEdit: ArticuloBodyDTO) {
    this.openDialogToUpdate();
    this.product = productoEdit;
    this.lineaNegocioFromProduct = this.product.lineaNegocioId?.lineaNegocioId;
    this.actualizarProducto = true;
    this.formatDate2(productoEdit.fechaInicial!!, productoEdit.fechaFinal!!)
  }

  habilitarProducto(product) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de habilitar este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.habilitarProducto(product.articuloId).subscribe(
          data => {
            if (data.status == "OK") {
              this.products[this.findIndexById(product.articuloId)].status = "A"
            } else {
            }
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto habilitado', life: 3000 });
      }
    });
  }

  deshabilitarProducto(product: ArticuloBodyDTO) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de inhabilitar este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.inhabilitarProducto(product.articuloId).subscribe(
          data => {
            if (data.status == "OK") {
              this.products[this.findIndexById(product.articuloId)].status = "I"
            }
          },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto inhabilitado', life: 3000 });
      }
    });
  }

  filtrarProductos(event: Event, stringVal: String) {
    this.dt1!.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  hideDialog() {
    this.getAllProducts();
    this.productDialog = false;
    this.resetProducto();
    this.resetFechas();
  }

  onUpdateProducto(row: any) {
    if (this.lineaNegocioFromProduct != null && row.precio == 0 && row.precioMinimo == 0) {
      this.updateArticuloLineaNegocio(this.lineaNegocioFromProduct!, row.articuloId)
    } else if (this.actualizarProducto) {
      this.updateProducto(row);
    } else {
    }
  }

  resetFechas() {
    this.dateInicial = new Date();
    this.dateFinal = new Date();
  }

  openDialogToUpdate() {
    this.resetProducto();
    this.resetFechas()
    this.productDialog = true;
  }

  resetProducto() {
    this.product = {
      articuloId: 0,
      codigoArticulo: '',
      nombreArticulo: '',
      descripcionArticulo: '',
      precio: 0,
      precioMinimo: 0,
      codigoBarras: '',
      articuloCuentaIngreso: '',
      articulocuentaSalida: '',
      status: '',
      fechaInicial: new Date,
      fechaFinal: new Date
    }
  }

  resetArticuloPrecio() {
    this.articuloPrecio = {
      precioStandar: 0,
      precioMinimo: 0,
      fechaInicial: new Date,
      fechaFinal: new Date,
      status: '',
    }
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].articuloId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  updateProducto(product: any) {
    this.productDialog = false;
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de actualizar los precios de este producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.articuloPrecio.precioStandar = this.product.precio;
        this.articuloPrecio.precioMinimo = this.product.precioMinimo;
        this.articuloPrecio.fechaInicial = this.dateInicial;
        this.articuloPrecio.fechaFinal = this.dateFinal;
        this.articuloPrecio.status = this.product.status;
        this.productService.updateProducto(this.articuloPrecio, product.articuloId, this.lineaNegocioFromProduct!).subscribe(data => {
          if (data.status == "OK") {
            this.getAllProducts();
            this.resetProducto();
            this.resetArticuloPrecio();
            this.actualizarProducto = false;
            this.hideDialog();
            this.resetFechas();
          }
        },
          error => {
            console.log(error);
          }
        );
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Precios del producto actualizados', life: 3000 });
      },
      reject: () => {
        this.getAllProducts();
        this.resetProducto();
      }
    });
  }

  reloadListaProducto() {
    this.spinnerOn = true;
    this.loadingProductos = true;
    this.productService.allArticulos().subscribe(
      data => {
        this.products = data.data!;
        this.loadingProductos = false;
        this.spinnerOn = false;
      },
      error => {
        console.log(error);
        return "Error";
      }
    );
  }

  formatDate2(f1: Date, f2: Date) {
    if (f1 && f2) {
      this.dateInicial = new Date(f1);
      this.dateFinal = new Date(f2);
    } else {
      this.resetFechas();
    }
  }

  validarFechaInicial(fechaInicial: Date) {
    if (fechaInicial?.getTime() < this.today) {
      return true;
    } else {
      return false
    }
  }

  validarFechaFinal(fechaFinal: Date) {
    if (fechaFinal?.getTime() < this.today) {
      return true;
    } else {
      return false
    }
  }

  validarRangoFechas(dateInicial: Date, dateFinal: Date) {
    if (dateInicial?.getTime() > dateFinal?.getTime() ||
      dateFinal?.getTime() < dateInicial?.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  validarFechas(dateInicial: Date, dateFinal: Date) {
    if (dateInicial?.getTime() == null || dateFinal?.getTime() == null) {
      return true;
    } else {
      return false;
    }
  }

  validarPrecios(precio: number, precioMinimo: number) {
    if (precio == null || precioMinimo == null || precio == 0 || precioMinimo == 0) {
      return true;
    } else {
      return false;
    }
  }

  validarLineaNegocio(lineaNegocioId: number) {
    if (lineaNegocioId == null) {
      return true
    }
    return false;
  }

  validOrInvalidBtn(): boolean {
    if (this.validarLineaNegocio(this.lineaNegocioFromProduct!) == false) {
      return false;
    }else if (this.validarFechaInicial(this.dateInicial) == true || this.validarFechaFinal(this.dateFinal) == true ||
      this.validarRangoFechas(this.dateInicial, this.dateFinal) == true ||
      this.validarFechas(this.dateInicial, this.dateFinal) == true ||
      this.validarPrecios(this.product.precio!, this.product.precioMinimo!) == true ||
      this.validarLineaNegocio(this.lineaNegocioFromProduct!) == true) {
      return true;
    } else {
      return false;
    }
  }

  clearFiltersProductos(dt1: Table) {
    dt1.clear();
    this.dt1!.filterGlobal(this.filterName, 'contains')
  }

}
