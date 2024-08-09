import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './principal/dashboard/dashboard.component';
import { ListaVendedoresComponent } from './principal/sections/vendedores/lista-vendedores/lista-vendedores.component';
import { ListaClientesComponent } from './principal/sections/clientes/lista-clientes/lista-clientes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './principal/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from "primeng/menu";
import { ToastModule } from "primeng/toast";
import { AuthInterceptorService } from "./interceptors/auth-interceptor.service";
import { TablaVendedoresComponent } from "./principal/sections/vendedores/tabla-vendedores/tabla-vendedores.component";
import { NotFoundComponent } from './principal/not_found_response/not-found/not-found.component';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { TableModule } from 'primeng/table';
import { RatingModule } from "primeng/rating";
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { ToolbarModule } from "primeng/toolbar";
import { DialogModule } from "primeng/dialog";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ClientesVendedorComponent } from './principal/sections/vendedores/clientes-vendedor/clientes-vendedor.component';
import { VistaClienteComponent } from './principal/sections/clientes/vista-cliente/vista-cliente.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PasswordModule } from "primeng/password";
import { SplitterModule } from 'primeng/splitter';
import { AsignarClientesComponent } from './principal/sections/vendedores/asignar-clientes/asignar-clientes.component';
import { ToggleButtonModule } from "primeng/togglebutton";
import { RippleModule } from "primeng/ripple";
import { MultiSelectModule } from "primeng/multiselect";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { TabViewModule } from "primeng/tabview";
import { DividerModule } from "primeng/divider";
import { FieldsetModule } from "primeng/fieldset";
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from "primeng/orderlist";
import { ListboxModule } from "primeng/listbox";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { ContentComponent } from './principal/content/content.component';
import { TablaProductosComponent } from './principal/sections/articulos/tabla-articulos/tabla-productos.component';
import { ListaProductosComponent } from './principal/sections/articulos/lista-articulos/lista-productos.component';
import { CustomDatePipe } from './pipelines/customdate.pipe';
import { CustomDateTimePipe } from './pipelines/customdatetime.pipe';
import { CalendarModule } from 'primeng/calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { OrdenpedidoVendedorComponent } from './principal/sections/vendedores/ordenpedido-vendedor/ordenpedido-vendedor.component';
import { ListaDashboardComponent } from './principal/lista-dashboard/lista-dashboard.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VentasDiariasComponent } from './principal/sections/ventas/ventas-diarias/tabla-ventas-diarias/ventas-diarias.component';
import { ReporteVentasComponent } from './principal/sections/ventas/reporte-ventas/reporte-ventas.component';
import { ListaVentaDiariaComponent } from './principal/sections/ventas/ventas-diarias/lista-venta-diaria/lista-venta-diaria.component';
import { ListaPlantillaPrecioComponent } from './principal/sections/precios/plantilla-precios/lista-plantilla-precio/lista-plantilla-precio.component';
import { TablaPlantillaPrecioComponent } from './principal/sections/precios/plantilla-precios/tabla-plantilla-precio/tabla-plantilla-precio.component';
import { LineaNegocioComponent } from './principal/sections/negocio/linea-negocio/tabla-linea-negocio/tabla-linea-negocio.component';
import { CanalVentaComponent } from './principal/sections/negocio/canal-venta/tabla-canal-venta/tabla-canal-venta.component';
import { ListaLineaNegocioComponent } from './principal/sections/negocio/linea-negocio/lista-linea-negocio/lista-linea-negocio.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ListaCanalVentaComponent } from './principal/sections/negocio/canal-venta/lista-canal-venta/lista-canal-venta/lista-canal-venta.component';
import { ListaPrecioBaseComponent } from './principal/sections/precios/precio-base/lista-precio-base/lista-precio-base.component';
import { TablaPrecioBaseComponent } from './principal/sections/precios/precio-base/tabla-precio-base/tabla-precio-base.component';
import { TablaGrupoArticuloComponent } from './principal/sections/precios/grupo-articulo/tabla-grupo-articulo/tabla-grupo-articulo.component';
import { ListaGrupoArticuloComponent } from './principal/sections/precios/grupo-articulo/lista-grupo-articulo/lista-grupo-articulo.component';
import { ListaListaPreciosComponent } from './principal/sections/precios/lista-precios/lista-lista-precios/lista-lista-precios.component';
import { TablaListaPreciosComponent } from './principal/sections/precios/lista-precios/tabla-lista-precios/tabla-lista-precios.component';
import { ListaGrupoPrecioComponent } from './principal/sections/precios/grupo-precios/lista-grupo-precio/lista-grupo-precio.component';
import { TablaGrupoPrecioComponent } from './principal/sections/precios/grupo-precios/tabla-grupo-precio/tabla-grupo-precio.component';
import { ListaZonaComponent } from './principal/sections/precios/zona/lista-zona/lista-zona.component';
import { TablaZonaComponent } from './principal/sections/precios/zona/tabla-zona/tabla-zona.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CorreoNotificacionComponent } from './principal/correo-notificacion/correo-notificacion.component';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { ListaCorreoNotificacionComponent } from './principal/correo-notificacion/lista-correo-notificacion/lista-correo-notificacion.component';
import { OrdenpedidoClienteComponent } from './principal/sections/clientes/ordenpedido-cliente/ordenpedido-cliente.component';
import { ComprobantesClienteComponent } from './principal/sections/clientes/comprobantes-cliente/comprobantes-cliente.component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { GalleriaModule } from 'primeng/galleria';
import { ListaPlantillaListaPrecioComponent } from './principal/sections/precios/lista-plantilla-lista-precio/lista-plantilla-lista-precio.component';
import { PlantillaListaPrecioComponent } from './principal/sections/precios/lista-plantilla-precio/plantilla-lista-precio/plantilla-lista-precio.component';
import { TablaPlantillaListaPrecioComponent } from './principal/sections/precios/lista-plantilla-precio/tabla-plantilla-lista-precio/tabla-plantilla-lista-precio.component';
import { TablaListaPlantillaPrecioComponent } from './principal/sections/precios/lista-plantilla-lista-precio/tabla-lista-plantilla-precio/tabla-lista-plantilla-precio.component';
import { CardModule } from "primeng/card";
import { MapaComponent } from './principal/sections/vendedores/mapa/mapa.component';
import { NgxCaptureModule } from 'ngx-capture';
import { NotificacionClientesComponent } from './principal/sections/clientes/notificacion-clientes/notificacion-clientes.component';

@NgModule({
  declarations: [
    CustomDatePipe,
    CustomDateTimePipe,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListaVendedoresComponent,
    ListaClientesComponent,
    NavbarComponent,
    TablaVendedoresComponent,
    NotFoundComponent,
    ClientesVendedorComponent,
    VistaClienteComponent,
    AsignarClientesComponent,
    ContentComponent,
    TablaProductosComponent,
    ListaProductosComponent,
    OrdenpedidoVendedorComponent,
    ListaDashboardComponent,
    VentasDiariasComponent,
    ReporteVentasComponent,
    ListaVentaDiariaComponent,
    ListaPlantillaPrecioComponent,
    TablaPlantillaPrecioComponent,
    LineaNegocioComponent,
    CanalVentaComponent,
    ListaLineaNegocioComponent,
    ListaCanalVentaComponent,
    ListaPrecioBaseComponent,
    TablaPrecioBaseComponent,
    TablaGrupoArticuloComponent,
    ListaGrupoArticuloComponent,
    ListaListaPreciosComponent,
    TablaListaPreciosComponent,
    ListaGrupoPrecioComponent,
    TablaGrupoPrecioComponent,
    ListaZonaComponent,
    TablaZonaComponent,
    CorreoNotificacionComponent,
    ListaCorreoNotificacionComponent,
    OrdenpedidoClienteComponent,
    ComprobantesClienteComponent,
    ListaPlantillaPrecioComponent,
    ListaPlantillaListaPrecioComponent,
    PlantillaListaPrecioComponent,
    TablaPlantillaListaPrecioComponent,
    TablaListaPlantillaPrecioComponent,
    MapaComponent,
    NotificacionClientesComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        PanelMenuModule,
        PanelModule,
        MenuModule,
        ToastModule,
        TableModule,
        RatingModule,
        PaginatorModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        RadioButtonModule,
        InputTextModule,
        InputTextareaModule,
        ConfirmDialogModule,
        TooltipModule,
        CheckboxModule,
        SidebarModule,
        CommonModule,
        DynamicDialogModule,
        ToastModule,
        TableModule,
        ButtonModule,
        ConfirmPopupModule,
        PasswordModule,
        SplitterModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        BreadcrumbModule,
        TabViewModule,
        DividerModule,
        FieldsetModule,
        DataViewModule,
        OrderListModule,
        ListboxModule,
        CalendarModule,
        FormsModule,
        NgbModule,
        DropdownModule,
        ProgressSpinnerModule,
        SelectButtonModule,
        DragDropModule,
        ProgressBarModule,
        AccordionModule,
        CascadeSelectModule,
        GalleriaModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAFkPlAiJAcK0B6kcaHXQDpkz6AP_bYMUY'
        }),
        AgmJsMarkerClustererModule,
        CardModule,
        NgxCaptureModule
    ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService,
    DatePipe,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
