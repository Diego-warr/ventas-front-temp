import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Router } from "@angular/router";
import { DataUserToken } from "../../auth/data-user-token.service";
import { LoginService } from "../../services/login.service";
import { UsuarioServiceService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  changePasswordDialog = false;
  titleDialog!: string;

  contrasenaActual!: string;
  nuevaContrasena!: string;
  repetirNuevaContrasena!: string;

  constructor(private router: Router,
    private dataUserToken: DataUserToken,
    private usuarioService: UsuarioServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loginService: LoginService) {
  }

  isOpen = true;
  items: MenuItem[] = [];
  items2: MenuItem[]=[];
  showFiller = false;
  usuario: string = "";

  tituloHost: string | undefined;

  ngOnInit() {
    this.usuario = this.dataUserToken.getUsuario();
    this.items = [
      {
        label: 'Ordenes',
        icon: 'pi pi-pw pi-desktop',
        // command: ((e) => {
        //   this.clickItemMenu(e, 'principal')
        // })
        items: [
          {
            label: 'Orden de Pedido',
            icon: 'pi pi-envelope',
            command: ((e) => {
              this.clickItemMenu(e, 'principal')
            })
          },
          {
            label: 'Correo Notificacion',
            icon: 'pi pi-inbox',
            command: ((e) => {
              this.clickItemMenu(e, 'correo-notificacion')
            })
          },
        ]
      },
      {
        label: 'Vendedores',
        icon: 'pi pi-pw pi-briefcase',
        items: [
          {
            label: 'Lista de Vendedores',
            icon: 'pi pi-pw pi-sort-alpha-up',
            command: ((e) => {
              this.clickItemMenu(e, 'vendedores')
            })
          },
          {
            label: 'Mapa',
            icon: 'pi pi-pw pi-map-marker',
            command: ((e) => {
              this.clickItemMenu(e, 'vendedores-mapa')
            })
          }
        ]
      },
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Lista de Clientes',
            icon: 'pi pi-id-card',
            command: ((e) => {
              this.clickItemMenu(e, 'clientes')
            })
          },
          {
            label: 'Correo Notificación',
            icon: 'pi pi-inbox',
            command: ((e) => {
              this.clickItemMenu(e, 'cliente-notificacion')
            })
          },
        ]
      },
      {
        label: 'Artículos',
        icon: 'pi pi-tablet',
        command: ((e) => {
          this.clickItemMenu(e, 'articulos')
        })
      },
      {
        label: 'Precios',
        icon: 'pi pi-wallet',
        //items: this.setPreciosModule()
        items: [
          {
            label: 'Plantilla de lista de precios',
            icon: 'pi pi-money-bill',
            command: ((e) => {
              this.clickItemMenu(e, 'precio/plantilla-lista-precio')
            })
          },
          {
            label: 'Listado de plantillas de precio',
            icon: 'pi pi-money-bill',
            command: ((e) => {
              this.clickItemMenu(e, 'precio/listado-plantilla-lista-precio')
            })
          },
        ]
      },
      {
        label: 'Ventas',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'Ventas del día',
            icon: 'pi pi-file-pdf',
            command: ((e) => {
              this.clickItemMenu(e, 'ventas/ventas-del-dia')
            })
          },
        ]
      },
      {
        label: 'Negocio',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Lineas de negocio',
            icon: 'pi pi-bars',
            command: ((e) => {
              this.clickItemMenu(e, 'negocio/lineas-negocio')
            })
          },
          {
            label: 'Canales de Venta',
            icon: 'pi pi-th-large',
            command: ((e) => {
              this.clickItemMenu(e, 'negocio/canales-venta')
            })
          },
        ]
      }
    ];
    this.setTituloNavbar();
    this.titleDialog = "MODIFICAR CONTRASEÑA"
  }

  setPreciosModule(): any {
    if (environment.production == false) {
      return this.items2 = [
        {
          label: 'Zonas',
          icon: 'pi pi-map-marker',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/zona')
          })
        },
        {
          label: 'Grupo de precios',
          icon: 'pi pi-pi pi-cog',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/grupo-precio')
          })
        },
        {
          label: 'Grupo de artículos',
          icon: 'pi pi-palette',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/grupo-articulo')
          })
        },
        {
          label: 'Plantilla de precios',
          icon: 'pi pi-th-large',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/plantilla-precio')
          })
        },
        {
          label: 'Precio base',
          icon: 'pi pi-dollar',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/precio-base')
          })
        },
        {
          label: 'Lista de precios',
          icon: 'pi pi-money-bill',
          command: ((e) => {
            this.clickItemMenu(e, 'precio/lista-precio')
          })
        }
      ]
    } else {
      return this.items2.length =0;
    }
  }

  public clickItemMenu(e: Event, path: String) {
    this.router.navigate([path]);
  }

  setTituloNavbar() {
    this.tituloHost = environment.ZONA;
  }

  changePassword() {
    this.contrasenaActual = "";
    this.nuevaContrasena = "";
    this.repetirNuevaContrasena = "";
    this.changePasswordDialog = true;
  }

  hideDialog() {
    this.changePasswordDialog = false;
  }

  validOrInvalidBtn(): boolean {
    if (((this.contrasenaActual !=null && this.nuevaContrasena !=null) && this.contrasenaActual == this.nuevaContrasena) ||
        (this.contrasenaActual == null || this.nuevaContrasena == null || this.repetirNuevaContrasena == null) || (this.nuevaContrasena != this.repetirNuevaContrasena)) {
      return true;
    } else {
      return false;
    }
  }

  onSaveChangePassword() {
    this.changePasswordDialog = false;
    this.confirmationService.confirm({
      message: '¿Desea modificar la cotraseña?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.changePassword(this.usuario, this.contrasenaActual, this.nuevaContrasena).subscribe(
          data => {
            if (data.status == "OK") {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'La contraseña fue modificada correctamente', life: 2000 });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La contraseña no fue modificada correctamente', life: 2000 });
            }
          },
          error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al modificar la contraseña', life: 2000 });
          }
        );
      }
    });
  }  

  logout() {
    const token = this.dataUserToken.getToken();
    this.loginService.logout(token).subscribe(data => {
      if (data.data !== null) {
        this.dataUserToken.deleteToken();
        this.router.navigate(['/login']);
      }
    },
      error => {
        console.log(error);
      });
  }
}
