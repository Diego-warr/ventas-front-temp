import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ListaVendedoresComponent} from "./principal/sections/vendedores/lista-vendedores/lista-vendedores.component";
import {ListaClientesComponent} from "./principal/sections/clientes/lista-clientes/lista-clientes.component";
import {NotFoundComponent} from "./principal/not_found_response/not-found/not-found.component";
import {VistaClienteComponent} from "./principal/sections/clientes/vista-cliente/vista-cliente.component";
import {ClientesVendedorComponent} from "./principal/sections/vendedores/clientes-vendedor/clientes-vendedor.component";
import {AsignarClientesComponent} from "./principal/sections/vendedores/asignar-clientes/asignar-clientes.component";
import {GuardService} from "./services/guard.service";
import {ContentComponent} from "./principal/content/content.component";
import { ListaProductosComponent } from './principal/sections/articulos/lista-articulos/lista-productos.component';
import { OrdenpedidoVendedorComponent } from './principal/sections/vendedores/ordenpedido-vendedor/ordenpedido-vendedor.component';
import { ListaDashboardComponent } from './principal/lista-dashboard/lista-dashboard.component';
import { ListaVentaDiariaComponent } from './principal/sections/ventas/ventas-diarias/lista-venta-diaria/lista-venta-diaria.component';
import { ListaPlantillaPrecioComponent } from './principal/sections/precios/plantilla-precios/lista-plantilla-precio/lista-plantilla-precio.component';
import { ListaLineaNegocioComponent } from './principal/sections/negocio/linea-negocio/lista-linea-negocio/lista-linea-negocio.component';
import { ListaCanalVentaComponent } from './principal/sections/negocio/canal-venta/lista-canal-venta/lista-canal-venta/lista-canal-venta.component';
import { ListaPrecioBaseComponent } from './principal/sections/precios/precio-base/lista-precio-base/lista-precio-base.component';
import { ListaGrupoArticuloComponent } from './principal/sections/precios/grupo-articulo/lista-grupo-articulo/lista-grupo-articulo.component';
import { ListaListaPreciosComponent } from './principal/sections/precios/lista-precios/lista-lista-precios/lista-lista-precios.component';
import { ListaGrupoPrecioComponent } from './principal/sections/precios/grupo-precios/lista-grupo-precio/lista-grupo-precio.component';
import { ListaZonaComponent } from './principal/sections/precios/zona/lista-zona/lista-zona.component';
import { ListaCorreoNotificacionComponent } from './principal/correo-notificacion/lista-correo-notificacion/lista-correo-notificacion.component';
import { OrdenpedidoClienteComponent } from './principal/sections/clientes/ordenpedido-cliente/ordenpedido-cliente.component';
import { ComprobantesClienteComponent } from './principal/sections/clientes/comprobantes-cliente/comprobantes-cliente.component';
import { PlantillaListaPrecioComponent } from './principal/sections/precios/lista-plantilla-precio/plantilla-lista-precio/plantilla-lista-precio.component';
import { ListaPlantillaListaPrecioComponent } from './principal/sections/precios/lista-plantilla-lista-precio/lista-plantilla-lista-precio.component';
import { MapaComponent } from './principal/sections/vendedores/mapa/mapa.component';
import { NotificacionClientesComponent } from './principal/sections/clientes/notificacion-clientes/notificacion-clientes.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'principal', component: ListaDashboardComponent, canActivate: [GuardService]
      },
      {
        path: 'correo-notificacion', component: ListaCorreoNotificacionComponent, canActivate: [GuardService]
      },
      {
        path: 'vendedores', component: ListaVendedoresComponent, canActivate: [GuardService]
      },
      {
        path: 'vendedores-mapa', component: MapaComponent, canActivate: [GuardService]
      },
      {
        path: 'clientes', component: ListaClientesComponent, canActivate: [GuardService]
      },
      {
        path: 'ordenpedido-cliente/:clienteId', component: OrdenpedidoClienteComponent, canActivate: [GuardService]
      },
      {
        path: 'comprobante-cliente/:clienteId', component: ComprobantesClienteComponent, canActivate: [GuardService]
      },
      {
        path: 'ver-cliente/:clienteId', component: VistaClienteComponent, canActivate: [GuardService]
      },
      {
        path: 'nuevo-cliente', component: VistaClienteComponent, canActivate: [GuardService]
      },
      {
        path: 'clientes-vendedor/:usuarioId', component: ClientesVendedorComponent, canActivate: [GuardService]
      },
      {
        path: 'cliente-notificacion', component: NotificacionClientesComponent, canActivate: [GuardService]
      },
      {
        path: 'ordenpedido-vendedor/:usuarioId', component: OrdenpedidoVendedorComponent, canActivate: [GuardService]
      },
      {
        path: 'asignar-clientes', component: AsignarClientesComponent, canActivate: [GuardService]
      },
      {
        path: 'articulos', component: ListaProductosComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/plantilla-precio', component: ListaPlantillaPrecioComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/lista-precio', component: ListaListaPreciosComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/plantilla-lista-precio', component: PlantillaListaPrecioComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/listado-plantilla-lista-precio', component: ListaPlantillaListaPrecioComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/ver-plantilla-lista-precio/:idPlantilla', component: PlantillaListaPrecioComponent, canActivate: [GuardService]
      },
      {
        path: 'ventas/ventas-del-dia', component: ListaVentaDiariaComponent, canActivate: [GuardService]
      },
      {
        path: 'negocio/lineas-negocio', component: ListaLineaNegocioComponent, canActivate: [GuardService]
      },
      {
        path: 'negocio/canales-venta', component: ListaCanalVentaComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/precio-base', component: ListaPrecioBaseComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/grupo-articulo', component: ListaGrupoArticuloComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/grupo-precio', component: ListaGrupoPrecioComponent, canActivate: [GuardService]
      },
      {
        path: 'precio/zona', component: ListaZonaComponent, canActivate: [GuardService]
      },
    ]
  },
  {
    path: '**', component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
